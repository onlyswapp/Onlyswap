import { ChainId, Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, CAKE_TESTNET } from './common'

export const onlyChainTokens = {
  wbnb: WBNB[ChainId.ONLY_CHAIN],
  // syrup: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0x0D1207eFE3a058A8D777a4a4964a606a19285d3D',
  //   18,
  //   'SYRUP',
  //   'SyrupBar Token',
  //   'https://onlyswap.org/',
  // ),
  // xfn: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0x24BC7AeDCC69813B5876934314D708D4254652ab',
  //   9,
  //   'XFN',
  //   'Xfusion',
  //   'https://www.bakeryswap.org/',
  // ),
  dai: new Token(ChainId.ONLY_CHAIN, '0x5e7bF2742b39CE11578b9af2691f82928417585B', 18, 'DAI', 'Dai Stablecoin from Ethereum'),
  // hex: new Token(ChainId.ONLY_CHAIN, '0xCECDd8728d5Da2C26A6b2Dcc4C55eA29d079F0B7', 8, 'HEX', 'HEX'),
  // usdc: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07',
  //   6,
  //   'USDC',
  //   'USD Coin from Ethereum',
  // ),
  // plsx: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab',
  //   18,
  //   'PLSX',
  //   'PulseX',
  // ),
  // ted: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0xd6c31bA0754C4383A41c0e9DF042C62b5e918f6d',
  //   18,
  //   'TED',
  //   'Teddy bear',
  // ),
  // spark: new Token(
  //   ChainId.ONLY_CHAIN,
  //   '0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
  //   18,
  //   'SPARK',
  //   'SPARKSWAP',
  // ),
}
