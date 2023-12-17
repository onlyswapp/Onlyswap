import { useState, useCallback, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components';
import { Card, Flex, Text, Skeleton, Heading } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { SerializedNftConfig } from '@pancakeswap/farms'
import NftCardHeading from './NftCardHeading'
import NftCardActionsContainer from './CardActionsContainer'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import ConnectWalletButton from 'components/ConnectWalletButton'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const ConicBorder = styled.div`
  position: relative;
  z-index: 0;
  margin: 10px;
  border-radius: 30px;
  overflow: hidden;
  padding: 4px !important;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(transparent, rgba(255, 165, 0, 1), transparent 20%);
    animation: ${rotate} 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 5px;
  }

  &:hover {
  > div img {
    filter: brightness(1.3); // slightly brighter image on hover
  }
`;

const StyledCard = styled(Card)`
  &:hover {
    background-color: #708090; // dark gray color
  }
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 0px 0px;
  }
`

const NftCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface NftCardProps {
  nft: SerializedNftConfig
  account?: string
  tierType: number
}

const NftCard: React.FC<NftCardProps> = ({ nft, account, tierType }) => {
  const { t } = useTranslation()
  const { isInitialized, data } = useSelector((state: State) => state.nft)

  return (
    <ConicBorder>
    <StyledCard isActive={false}>
      <NftCardInnerContainer>
        <img src={nft.nftImage} alt='nft' style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }} />
        <Heading scale="lg" my="16px">
          {nft.name}
        </Heading>
        <Flex justifyContent="space-between">
          <Text>NFT price:</Text>
          <Text>{nft.nftPrice} DAI</Text>
        </Flex>
        <Flex justifyContent="space-between">
            <Text>ROI:</Text>
            <Text>{nft.ROI} Days</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Daily Apr:</Text>
          <Text>{nft.dailyApr / 100}% </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Max payout:</Text>
          <Text>{nft.maxApr / 100}% </Text>
        </Flex>
        <Flex justifyContent='space-between' mb="8px">
          <Text >
            Minted:
          </Text>
          <Text>
            {isInitialized ? data.soldOutByTier[tierType].toString() : "0"}
            {t(' NFTs')}
          </Text>
        </Flex>
          <NftCardActionsContainer
            nft={nft}
            account={account}
            allowance={new BigNumber(data?.userData?.allowance ?? 0)}
          />        
      </NftCardInnerContainer>
    </StyledCard>
    </ConicBorder>
  )
}

export default NftCard
