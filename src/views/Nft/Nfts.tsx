/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback, useState, useMemo, useRef, createContext } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Image, Heading, Toggle, Text, Flex, Link, Box } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { NextLinkFromReactRouter } from 'components/NextLink'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import ToggleView from 'components/ToggleView/ToggleView'
import FarmTabButtons from './components/FarmTabButtons'
import { FarmWithStakedValue } from './components/types'
import { Label } from 'recharts'
import nfts from './constants'

const FlexLayoutNFT = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`
const NUMBER_OF_FARMS_VISIBLE = 12
const Nfts: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname, query: urlQuery } = useRouter()
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()


  return (
    <NftsContext.Provider value={{ chosenNftsMemoized: nfts }}>
      <PageHeader>
        <Flex flexDirection={['column', 'column', 'row', 'row']} justifyContent='space-between'>
          <Box>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('OnlyLayer NFTs')}
            </Heading>
            <Heading scale="lg" color="text">
              {t('Mint NFT\'s to start earning daily.')}
            </Heading>
            <Text>
                ~Coming Soon~ Earn 3% of the initial deposit into Xamplify (NFT Holders Only) For now refer others to mint with your link below, to earn 4% in referral rewards!
            </Text>
          </Box>
        </Flex>
      </PageHeader>
      <Page>
        <FlexLayoutNFT>{children}</FlexLayoutNFT>
      </Page>
    </NftsContext.Provider>
  )
}

export const NftsContext = createContext({ chosenNftsMemoized: [] })

export default Nfts
