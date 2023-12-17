import { useContext } from 'react'
import { NftsPageLayout, NftsContext } from 'views/Nft'
import NftCard from 'views/Nft/components/NftCard/NftCard'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import MyNftCard from 'views/Nft/components/NftCard/MyNftCard'
import { State } from 'state/types'
import ReferralLink from 'views/Nft/components/ReferralLink'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

import { isAddress } from 'utils'
import rot13 from 'utils/encode'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`
const NftsPage = () => {
  const { account } = useWeb3React()
  const { chosenNftsMemoized } = useContext(NftsContext)
  const { data } = useSelector((state: State) => state.nft)
  const { t } = useTranslation()
  const router = useRouter()
  const { ref } = router.query
  const cookies = new Cookies();

  if (ref) {
    if (isAddress(rot13(ref))) {
      cookies.set("ref", ref);
    }
  }
  return (
    <Flex flexDirection="column" width="100%">
      {account && data?.userData?.balanceOfWallet > 0 ? 
      <>
       <Heading as="h1" scale="xl" color="primary" mb="24px">
              {t('My NFTs')}
        </Heading>
        <FlexLayout>
          {chosenNftsMemoized.map((nft, index) => (
            <MyNftCard
              tierType={index}
              nft={nft}
              account={account}
            />
          ))}
        </FlexLayout>
        </>
        :
        <></>
      }
      <Heading as="h1" scale="xl" color="primary" mb="24px"  mt="24px">
              {t('Mint your very own OnlyLayer NFT\'s now')}
      </Heading>
      
        <FlexLayout>
          {chosenNftsMemoized.map((nft, index) => (
            <NftCard
              tierType={index}
              nft={nft}
              account={account}
            />
          ))}
        </FlexLayout>
        <ReferralLink />
    </Flex>
  )
}

NftsPage.Layout = NftsPageLayout

export default NftsPage
