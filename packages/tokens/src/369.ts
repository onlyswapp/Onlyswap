import { ChainId, Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, CAKE_TESTNET } from './common'

export const pulseChainTokens = {
  wbnb: WBNB[ChainId.PULSE_CHAIN],
  syrup: new Token(
    ChainId.PULSE_CHAIN,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://onlyswap.org/',
  ),
  xfn: new Token(
    ChainId.PULSE_CHAIN,
    '0x24BC7AeDCC69813B5876934314D708D4254652ab',
    9,
    'XFN',
    'Xfusion',
    'https://www.bakeryswap.org/',
  ),
  dai: new Token(ChainId.PULSE_CHAIN, '0xefD766cCb38EaF1dfd701853BFCe31359239F305', 18, 'DAI', 'Dai Stablecoin from Ethereum'),
  hex: new Token(ChainId.PULSE_CHAIN, '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', 8, 'HEX', 'HEX'),
  usdc: new Token(
    ChainId.PULSE_CHAIN,
    '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07',
    6,
    'USDC',
    'USD Coin from Ethereum',
  ),
  plsx: new Token(
    ChainId.PULSE_CHAIN,
    '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab',
    18,
    'PLSX',
    'PulseX',
  ),
  ted: new Token(
    ChainId.PULSE_CHAIN,
    '0xd6c31bA0754C4383A41c0e9DF042C62b5e918f6d',
    18,
    'TED',
    'Teddy bear',
  ),
  spark: new Token(
    ChainId.PULSE_CHAIN,
    '0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
    18,
    'SPARK',
    'SPARKSWAP',
  ),
}
