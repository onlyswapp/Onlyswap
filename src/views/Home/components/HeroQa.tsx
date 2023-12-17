import { Button, Flex, Grid, Heading } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import mattImage from '../../../../public/images/home/trade/matt.png'
import andreyChart from '../../../../public/images/home/trade/andrey.png'
import lissanroImage from '../../../../public/images/home/trade/lissanro.png'
import kryptokraftImage from '../../../../public/images/home/trade/krypto_kraft.png'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`


const InnerWrapper = styled.div`
  // position: absolute;
  width: 100%;
  padding: 20px 0 10px 0;

`
const BunnyWrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(1, 1fr); /* Two equal-width columns */
  } 
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Two equal-width columns */
    grid-gap: 30px; /* Adjust the gap between images as needed */
    // animation: ${flyingAnim} 3.5s ease-in-out infinite;
    will-change: transform;
    > span {
      overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
    }
  }
`

const HeadingSection = styled(Heading)`
  // font-size: 64px;
  border-top: 3px solid #000;
  // padding-bottom: 20px;
  // flex: flex;
`

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <style jsx global>
        {`
          .slide-svg-dark {
            display: none;
          }
          .slide-svg-light {
            display: block;
          }
          [data-theme='dark'] .slide-svg-dark {
            display: block;
          }
          [data-theme='dark'] .slide-svg-light {
            display: none;
          }
        `}
      </style>
      <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}></Flex>
      <Heading scale="xxl" color="#000" mb="48px">
        {t("Q&A")}
      </Heading>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '50px' : '30px', null, 0]}
        id="homepage-hero"
      >
        <BunnyWrapper>
          <HeadingSection scale="df" color="#000" mb="24px" style={{ paddingBottom: '0px' }}>
            <InnerWrapper >
              {t("Q. What’s available on your platform right now?")}
            </InnerWrapper>
            <InnerWrapper >
              {t("A. With OnlyLayer Finance right now we have our OnlyLayer token, an on chain swap function, X-Yield, NFTs and Xfortune")}
            </InnerWrapper>
          </HeadingSection>
          <HeadingSection scale="df" color="#000" mb="24px" >
            <InnerWrapper >
              {t("Q. As our OnlyLayer token presale has successfully rolled out how do I claim my XFN tokens?")}
            </InnerWrapper>
            <InnerWrapper >
              {t("A. If you participated in the presale, you will just need to head on over to the presale page and claim your tokens")}
            </InnerWrapper>
          </HeadingSection>
          <HeadingSection scale="df" color="#000" mb="24px" >
            <InnerWrapper >
              {t("Q. Is there any risk involved in Defi and OnlyLayer Finance?")}
            </InnerWrapper>
            <InnerWrapper >
              {t("A. There is always risk involved in any project and crypto in general, only invest with risk capital and do your own research, to work out what's best for you.")}
            </InnerWrapper>
          </HeadingSection>
          <HeadingSection scale="df" color="#000" mb="24px" >
            <InnerWrapper >
              {t("Q. What is the slippage average on transaction that include the XFN token?")}
            </InnerWrapper>
            <InnerWrapper >
              {t("A. The slippage tolerance for the XFN token as a single swap or liquidity pair is 12%")}
            </InnerWrapper>
          </HeadingSection>
          <HeadingSection scale="df" color="#000" mb="24px" >
            <InnerWrapper >
              {t("Q. If I have any technical issues or require assistance what do I do?")}
            </InnerWrapper>
            <InnerWrapper >
              {t("A. For technical support please contact support (@NomadzMATT) within our official telegram or send an email to our support email address - support@onlyswap.org")}
            </InnerWrapper>
          </HeadingSection>
        </BunnyWrapper>
      </Flex>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '50px' : '20px', null, '60px']}
        id="homepage-hero"
      >
        <BunnyWrapper>
          <Flex
            // height={['192px', null, null, '100%']}
            // width={['192px', null, null, '100%']}
            flex={[null, null, null, '1']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '0px' }}
          >
            <Image src={mattImage} priority placeholder="blur" alt={t('Lunar bunny')} />
            <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
              <Heading scale="df" color="#000" mb="10px" mt="0px">
                <b>{t('Matt EpicDefi Nomadz')}</b>
              </Heading>
              <Heading scale="sm" color="#000" mb="24px" >
                {t("Founder - OnlyLayer Finance")}
              </Heading>
            </Flex>
          </Flex>
          <Flex
            // height={['192px', null, null, '100%']}
            // width={['192px', null, null, '100%']}
            flex={[null, null, null, '1']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '0px' }}
          >
            <Image src={andreyChart} priority placeholder="blur" alt={t('Lunar bunny')} />
            <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
              <Heading scale="df" color="#000" mb="10px" mt="0px">
                <b>{t('Andrey V')}</b>
              </Heading>
              <Heading scale="sm" color="#000" mb="24px" >
                {t("Project Developer")}
              </Heading>
            </Flex>
          </Flex>
          <Flex
            // height={['192px', null, null, '100%']}
            // width={['192px', null, null, '100%']}
            flex={[null, null, null, '1']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '0px' }}
          >
            <Image src={lissanroImage} priority placeholder="blur" alt={t('Lissanro')} />
            <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
              <Heading scale="df" color="#000" mb="10px" mt="0px">
                <b>{t('Lissanro Rayen')}</b>
              </Heading>
              <Heading scale="sm" color="#000" mb="24px" >
                {t("Web Designer")}
              </Heading>
            </Flex>
          </Flex>
          <Flex
            // height={['192px', null, null, '100%']}
            // width={['192px', null, null, '100%']}
            flex={[null, null, null, '1']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '0px' }}
          >
            <Image src={kryptokraftImage} priority placeholder="blur" alt={t('Krypto Kraft')} />
            <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
              <Heading scale="df" color="#000" mb="10px" mt="0px">
                <b>{t('Krypto Kraft')}</b>
              </Heading>
              <Heading scale="sm" color="#000" mb="24px" >
                {t("Graphics Designer")}
              </Heading>
            </Flex>
          </Flex>
        </BunnyWrapper>
      </Flex>
    </>
  )
}

export default Hero
