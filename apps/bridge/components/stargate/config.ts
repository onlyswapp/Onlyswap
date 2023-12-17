import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains'

const VERSION = '0.0.25-mainnet.19'
const SHA384 = 'qQJSEss4ErEoxG1BxX9kq5sOqbBAn475yj7Bz8ZqNxQKDR2tvk693RdhfA0blQEF'
export const PARTNER_ID = 0x0002
export const FEE_COLLECTOR = '0x422dde79ba453bDb1c9C96b10026157a69a619fD'
export const FEE_TENTH_BPS = '0'

export const STARGATE_JS = {
  src: `https://unpkg.com/@layerzerolabs/stargate-ui@${VERSION}/element.js`,
  integrity: `sha384-${SHA384}`,
}

export const CHAINS_STARGATE = [mainnet, arbitrum, optimism, polygon]
