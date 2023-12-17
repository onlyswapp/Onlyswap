import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useMasterchef, useNftSaleContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useClaim = () => {
  const nftContract = useNftSaleContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleClaim = useCallback(
    async (tierType: number) => {
    return callWithGasPrice(nftContract, 'claim', [tierType])
  }, [callWithGasPrice, nftContract])

  return { onClaim: handleClaim }
}

export default useClaim
