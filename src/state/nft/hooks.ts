import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useEffect, useMemo } from 'react'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { fetchAllNftPublicData, fetchAllNftUserData } from '.'

export const useGetNftDatas = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  dispatch(fetchAllNftPublicData())
  
  useFastRefreshEffect(() => {
    dispatch(fetchAllNftUserData(account))
  }, [account, dispatch])
}
