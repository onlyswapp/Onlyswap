import { formatUnits, parseUnits } from '@ethersproject/units'
import styled from 'styled-components'
import { Card, Flex, Text, Skeleton, Heading } from '@pancakeswap/uikit'
import { SerializedNftConfig } from '@pancakeswap/farms'
import { MyNftCardActions } from './CardActionsContainer'
import { useSelector } from 'react-redux'
import { State } from 'state/types'

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const NftCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

interface MyNftCardProps {
    nft: SerializedNftConfig
    account?: string
    tierType: number
}

// eslint-disable-next-line consistent-return
const MyNftCard: React.FC<MyNftCardProps> = ({ nft, account, tierType }) => {
    const { data } = useSelector((state: State) => state.nft)
    if (Number(data.userData.stakedBalanceByTier[tierType]) !== 0) {
        return (
            <StyledCard isActive={false}>
                <NftCardInnerContainer>
                    <img src={nft.nftImage} alt='nft' />
                    <Heading scale="lg" my="16px">
                        {nft.name}
                    </Heading>
                    <Flex justifyContent="space-between">
                        <Text>Balance:</Text>
                        <Text>{String(data.userData.stakedBalanceByTier[tierType])} {nft.symbol}</Text>
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
                        <Text>Total Claimed:</Text>
                        <Text>{Number(data.userData.totalClaimedAmountByTier[tierType].toString()).toFixed(3)} DAI </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text>Claimable:</Text>
                        <Text>{Number(formatUnits(data.userData.pendingRewardsByTier[tierType].toString())).toFixed(3)} DAI </Text>
                    </Flex>
                    <MyNftCardActions
                        nft={nft}
                        account={account}
                    />

                </NftCardInnerContainer>
            </StyledCard>
        )
    }

}

export default MyNftCard
