import { formatUnits, parseUnits } from '@ethersproject/units'
import { ChainId } from '@pancakeswap/sdk'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { pulseChainTokens } from '@pancakeswap/tokens'
import nftSaleAbi from 'config/abi/nftSale.json'
import { getNftSaleAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { resetUserState } from '../global/actions'
import { NFTTokenInfo, SerializedNftUserData, SerializedNftsState } from '../types'
import nfts from 'views/Nft/constants'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { getBep20Contract } from 'utils/contractHelpers'


const initialState: SerializedNftsState = {
  isInitialized: false,
  isLoading: true,
  data: {
    "soldOutByTier": [new BigNumber(0), new BigNumber(0), new BigNumber(0)],
    userData: null
  }
}

export const fetchAllNftUserData =  createAsyncThunk<SerializedNftUserData, string>(
  'nft/fetchAllNftUserData',
  async (account) => {
    const nftContractAddress = getNftSaleAddress();
    const daiContract = getBep20Contract(pulseChainTokens.dai.address);
    const allowance = await daiContract.allowance(account, nftContractAddress);
    const calls = [
      {
        address: nftContractAddress,
        name:"walletOfOwner",
        params: [account]
      },
      {
        address: nftContractAddress,
        name:"pending",
        params: [0, account]
      },
      {
        address: nftContractAddress,
        name:"pending",
        params: [1, account]
      },
      {
        address: nftContractAddress,
        name:"pending",
        params: [2, account]
      },
      {
        address: nftContractAddress,
        name: "balanceOf",
        params: [account]
      }
    ]   

    const results = await multicallv2({
      abi: nftSaleAbi,
      calls
    })

    const stakedBalanceByTier = [0,0,0];
    const isExpiredByTier = [0, 0, 0];
    const totalClaimedAmountByTier = [0,0,0];
    if(results[0][0].length > 0) {
      // eslint-disable-next-line array-callback-return
      results[0][0].map((token: NFTTokenInfo) => {
        stakedBalanceByTier[token.tierType] += 1;
        if(token.isExpired){
          isExpiredByTier[token.tierType] += 1;
        }
        totalClaimedAmountByTier[token.tierType] += Number(formatUnits(token.claimedAmount.toString()))
      })
    }

    return {
      allowance: allowance.toString(), 
      stakedBalanceByTier, 
      isExpiredByTier,
      totalClaimedAmountByTier,
      pendingRewardsByTier: [results[1].toString(),  results[2].toString(), results[3].toString()], 
      balanceOfWallet: Number(results[4])
    }
  },
)

export const fetchAllNftPublicData =  createAsyncThunk<BigNumber[]>(
  'nft/fetchAllNftData',
  async () => {

    const nftContractAddress = getNftSaleAddress()
    const calls = nfts.map((nft, index) => {
      return {
        address: nftContractAddress,
        name: 'totalSoldoutByTier',
        params: [index],
      }
    })
    const results = await multicallv2({
      abi: nftSaleAbi,
      calls
    })

    const parsedTokenBalances = results.map((tokenBalance) => {
      return new BigNumber(tokenBalance).toJSON()
    })
    return parsedTokenBalances

  },
)



export const nftSlice = createSlice({
  name: 'Nfts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {   
    // Init NFT data
    builder.addCase(fetchAllNftPublicData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllNftPublicData.fulfilled, (state, action) => {
      state.isLoading = false
      state.isInitialized = true
      const data = action.payload
      state.data.soldOutByTier = data
      
    })
    builder.addCase(fetchAllNftUserData.fulfilled, (state, action) => {
      const data = action.payload
      state.data.userData = data;
    })

  },
})

export default nftSlice.reducer
