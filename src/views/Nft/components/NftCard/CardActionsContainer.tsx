import { AutoRenewIcon, Button, Flex, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'state'
import styled from 'styled-components'
import StakeAction from './StakeAction'
import { SerializedNftConfig } from '@pancakeswap/farms'
import BigNumber from 'bignumber.js'
import { getNftSaleAddress } from 'utils/addressHelpers'
import { pulseChainTokens } from '@pancakeswap/tokens'
import { fetchAllNftPublicData, fetchAllNftUserData } from 'state/nft'
import { useApproveNft } from 'views/Nft/hooks/useApproveNft'
import useClaim from 'views/Nft/hooks/useClaim'

const Action = styled.div`
  padding-top: 16px;
`

interface NftCardActionsProps {
  nft: SerializedNftConfig
  account?: string
  allowance?: BigNumber
}

const NftCardActions: React.FC<NftCardActionsProps> = ({ nft, account, allowance }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const daiContract = useERC20(pulseChainTokens.dai.address)
  const { onApprove } = useApproveNft(daiContract)

  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove()
    })
    if (receipt?.status) {
      dispatch(fetchAllNftUserData(account))
      toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    }
  }, [fetchWithCatchTxError, dispatch, account, onApprove, toastSuccess, t])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction nft={nft} account={account} />
    ) : (
      pendingTx ? (
        <Button width="100%" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
          {t('Approving')}
        </Button>
      ) : (
        <Button
          width="100%"
          onClick={async () => {
            await handleApprove()
          }}
        >
          {t('Enable Contract')}
        </Button>
      )

    )
  }

  return (
    <Action>
      {!account ? <ConnectWalletButton width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  )
}




export const MyNftCardActions: React.FC<NftCardActionsProps> = ({ nft, account, allowance }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onClaim } = useClaim()
  const handleClaim = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onClaim(nft.tokenId)
    })
    if (receipt?.status) {
      toastSuccess(`Claimed Successfully`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      dispatch(fetchAllNftPublicData())
      dispatch(fetchAllNftUserData(account))
    }
  }, [fetchWithCatchTxError, onClaim, nft.tokenId, dispatch, account, toastSuccess])
  
  return (
    <Action>
      {!account ? <ConnectWalletButton width="100%" /> : 
      
        pendingTx ? (
          <Button width="100%" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
            {t('Claiming')}
          </Button>
        ) : (
          <Button
            width="100%"
            onClick={async () => {
              await handleClaim()
            }}
          >
            {t('Claim')}
          </Button>
        )
      }
    </Action>
  )
}
export default NftCardActions
