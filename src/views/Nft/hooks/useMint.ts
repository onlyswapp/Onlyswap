import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef, useNftContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { isAddress } from 'utils'
import rot13 from 'utils/encode'
import Cookies from 'universal-cookie'

const useMint = () => {
  const nftContract = useNftContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const cookies = new Cookies();
  let referral;
  if(cookies.get('ref')){
    if(isAddress(rot13(cookies.get('ref')))){
      referral = rot13(cookies.get('ref'));
    }
  } else {
    referral = "0x0000000000000000000000000000000000000000";
  }
  const handleMint = useCallback(
    async (tierType: number, countNft: number) => {
      return callWithGasPrice(nftContract, 'mint', [tierType, countNft, referral])
    }, [callWithGasPrice, nftContract, referral])
    
  return { onMint: handleMint }
}

export default useMint
