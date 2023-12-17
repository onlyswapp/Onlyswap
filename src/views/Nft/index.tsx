import { FC } from 'react'
import Nfts, { NftsContext } from './Nfts'

export const NftsPageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Nfts>{children}</Nfts>
}

export { NftsContext }
