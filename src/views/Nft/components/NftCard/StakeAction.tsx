import { useWeb3React } from '@pancakeswap/wagmi'
import styled from 'styled-components'
import { Button, Flex, IconButton, AddIcon, MinusIcon, Box, AutoRenewIcon } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useRouter } from 'next/router'
import { SerializedNftConfig } from '@pancakeswap/farms'
import { useCallback, useState } from 'react'
import { fetchAllNftPublicData, fetchAllNftUserData } from 'state/nft'
import useMint from 'views/Nft/hooks/useMint'

interface NftCardActionsProps  {
  nft?: SerializedNftConfig
  account: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<NftCardActionsProps> = ({
 nft,
 account
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [countNft, setCountNft] = useState(1)
  const [_pendingTx, setPendingTx] = useState(false)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { onMint } = useMint()
  const handleMinusClick = () => {
    if(countNft >= 2) {
      setCountNft(countNft-1)
    }
  }

  const handleMint = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onMint(nft.tokenId, countNft)
    })
    if (receipt?.status) {
      toastSuccess(`${countNft  }NFTs Minted Successfully`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      dispatch(fetchAllNftPublicData())
      dispatch(fetchAllNftUserData(account))
    }
  }, [fetchWithCatchTxError, onMint, nft.tokenId, countNft, dispatch, account, toastSuccess])


  const renderStakingButtons = () => {
    return (
      <IconButtonWrapper>
        <IconButton variant="tertiary" mr="12px" onClick={handleMinusClick}>
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <Box p="10px" m="6px">
          {countNft}
        </Box>
        <IconButton
          ml="12px"
          onClick={() => setCountNft(countNft+1)}
          variant="tertiary"
        >
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" flexDirection='column' style={{gap:"12px"}} alignItems="center">      
      {renderStakingButtons()}

      {pendingTx ? (
          <Button width="100%" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
            {t('Minting')}
          </Button>
        ) : (
          <Button
            width="100%"
            onClick={async () => {
              await handleMint()
            }}
          >
            {t('Mint')}
          </Button>
        )}
      
    </Flex>
  )
}

export default StakeAction
