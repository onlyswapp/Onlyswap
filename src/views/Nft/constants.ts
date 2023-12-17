import { pulseChainTokens } from '@pancakeswap/tokens'
import { SerializedNftConfig } from '@pancakeswap/farms'

const nfts: SerializedNftConfig[] = [  
  {
    tokenId: 0,
    name: 'OnlyLayer NFT',
    symbol: 'OnlyLayer',
    nftPrice: 150,
    nftImage: '/images/nfts/3.png',
    dailyApr: 30,
    ROI: 333,
    maxApr: 20000
  },
  {
    tokenId: 1,
    name: 'OnlyLayerist NFT',
    symbol: 'OnlyLayerist',
    nftPrice: 750,
    nftImage: '/images/nfts/1.png',
    dailyApr: 100,
    ROI: 100,
    maxApr: 20000
  },
  {
    tokenId: 2,
    name: 'OnlyLayerator NFT',
    symbol: 'OnlyLayerator',
    nftPrice: 1000,
    nftImage: '/images/nfts/2.png',
    dailyApr: 250,
    ROI: 40,
    maxApr: 20000
  },
]

export default nfts
