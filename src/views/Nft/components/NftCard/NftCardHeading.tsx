/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { FarmAuctionTag, CoreTag } from 'components/Tags'
import { TokenPairImage } from 'components/TokenImage'

export interface ExpandableSectionProps {
  imageUrl?: string
  
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const NftCardHeading: React.FC<ExpandableSectionProps> = ({ imageUrl }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <img width="100%" src={imageUrl} alt='' />
      
    </Wrapper>
  )
}

export default NftCardHeading
