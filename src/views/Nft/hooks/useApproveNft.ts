import { useCallback } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { useMasterchef, useNftContract, useZapContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

export const useApproveNft = (daiContract: Contract) => {
  const nftContract = useNftContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(daiContract, 'approve', [nftContract.address, MaxUint256])
  }, [callWithGasPrice, daiContract, nftContract.address])

  return { onApprove: handleApprove }
}

