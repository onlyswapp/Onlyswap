import styled, { keyframes } from 'styled-components';
import { Text, Box, Flex, useMatchBreakpoints, Button, Slider, Heading, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { FlexGap } from 'components/Layout/Flex'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import NumericalInput from 'components/CurrencyInputPanel/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import { useCurrency } from 'hooks/Tokens'
import { bscTokens } from 'config/constants/tokens'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CSSProperties } from 'react';
import { useCurrencyBalance } from 'state/wallet/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { usePresaleState, usePresaleUserData } from 'state/presale/hooks'
import { getBalanceAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { fetchPresaleUserDataAsync } from 'state/presale'
import { useAppDispatch } from 'state'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20 } from 'hooks/useContract'
import { pulseChainTokens } from '@pancakeswap/tokens'
import { AutoColumn } from '../../components/Layout/Column'
import { Wrapper } from './components/styleds'
import { AppBody } from '../../components/App'
import Page from '../Page'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import Countdown from './components/Countdown'
import useBuy, { getTokenPrice, useClaim } from './hooks/usePresaleContract'
import { getPresaleAddress } from 'utils/addressHelpers'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`;

const ConicBorder = styled.div`
  position: relative;
  z-index: 0;
  margin: 20px;
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
    background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 20%);
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
`;

const gradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, rgba(24, 48, 128, 1), rgba(12, 24, 64, 1), rgba(6, 12, 32, 1), rgba(0, 0, 0, 1), black)',
  opacity: 1,
  zIndex: -1,
};

const backgroundLogo: CSSProperties = {
  position: 'relative',
  background: `url('/images/home/lunar-bunny/background_logo.png') right bottom no-repeat`,
  backgroundSize: 'auto',
};

const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
  width: 100%;
`
const Container = styled.div<{ error?: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
`

const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  flex-wrap: wrap;
`

export default function XAmplify() {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()

  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { fetchWithCatchTxError } = useCatchTxError()
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingClaimTx, setPendingClaimTx] = useState(false)

  const { data, userData } = usePresaleState()
  const presaleEndTime = 1699452000
  const softCap = 150000
  const[pulsePrice, setPulsePrice] = useState(0)

  useEffect(() => {
    const getPrice = async () => {
      const _pulsePrice = await getTokenPrice()
      setPulsePrice(_pulsePrice)
    }
    getPrice()
  }, [])
  const totalSold = getBalanceAmount(new BigNumber(data.totalEthDonated), 9)

  const totalSoldUsd = totalSold.times(pulsePrice).div(10 ** 9)

  let isClaimable = false
  if (Number(data.endedOn) > 0) {
    isClaimable = true
  }

  const userAvailableAmount = getBalanceAmount(new BigNumber(userData.availableOf), 9).toString()
  const userClaimedAmount = getBalanceAmount(new BigNumber(userData.claimedOf), 9)
  usePresaleUserData()

  const { onBuy } = useBuy()
  const { onClaim } = useClaim()
  const inputCurrency = useCurrency('0x24BC7AeDCC69813B5876934314D708D4254652ab')
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const outputCurrency = pulseChainTokens.xfn

  const currentTime = Math.floor(Date.now() / 1000)
  const minBuyAmount = 500000
  const maxBuyAmount = 250000000

  const percent = totalSold.div(150000000000000).times(100).times(0.000043)

  const [inputAmount, setInputAmount] = useState<any>('')
  const [outputAmount, setOutputAmount] = useState<any>('')

  const handleInput = useCallback((val: any) => {
    setInputAmount(val)
    if (Number(val) === 0) {
      setOutputAmount(0)
    } else {
      setOutputAmount(Math.floor(Number(new BigNumber(val))) / 1000000)
    }
  }, [])

  useEffect(() => {
    if (Number(outputAmount) === 0) {
      setInputAmount(0)
    } else {
      setInputAmount(Math.floor(Number(new BigNumber(outputAmount))) / 1000000000000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputCurrency])
  const handleSelectMax = useCallback(() => {
    handleInput(selectedCurrencyBalance.toExact())
  }, [handleInput, selectedCurrencyBalance])

  const handleBuy = async (amount: string) => {
    const receipt: any = await fetchWithCatchTxError(() => {
      return onBuy(amount)
    })
    if (receipt?.status) {
      toastSuccess(`${t('Bought')}!`)
      dispatch(fetchPresaleUserDataAsync({ account }))
    }
  }

  const handleClaim = async () => {
    const receipt: any = await fetchWithCatchTxError(() => {
      return onClaim()
    })
    if (receipt?.status) {
      toastSuccess(`${t('Claimed')}!`)
      dispatch(fetchPresaleUserDataAsync({ account }))
    }
  }

  const [btnText, disabled] = useMemo(() => {
    if (pendingTx) {
      return ['Purchasing', true]
    }
    return ['Purchase', false]
  }, [inputAmount, maxBuyAmount, pendingTx])

  const [btnTextClaim, disabledClaim] = useMemo(() => {
    if (pendingClaimTx) {
      return ['Claiming', true]
    }
    if (!isClaimable) {
      return ['Claim', true]
    }
    return ['Claim', false]
  }, [userAvailableAmount, isClaimable, pendingClaimTx])

  return (
    <>
      <div style={gradientOverlayStyle}></div>
      <div style={backgroundLogo}>
      <Page style={{ position: 'relative', minWidth:"400px" }} helpUrl={`${EXCHANGE_DOCS_URLS}/overview/ido`} >
        <Flex
          width="100%"
          justifyContent="center"
          position="relative"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent="center"
            alignItems={['center', 'center', 'center', 'start']}
          >
            <ConicBorder>
                <AppBody>
                  <Wrapper id="presale-page" style={{ minHeight: '372px', minWidth:"400px" }}>
                    <AutoColumn gap="sm">
                      <Flex alignItems="center" justifyContent="center" my="16px">
                          <CurrencyLogo currency={inputCurrency} size="32px" />
                          <Heading scale='lg' ml="10px">{inputCurrency?.name}</Heading>                        
                      </Flex>
                      <FlexGap gap="4px" flexDirection={['column', 'column', 'row']}>
                        <InputPanel>
                          <Flex justifyContent="space-between">
                          <Text>
                          {`${inputCurrency?.symbol} `}
                          {inputCurrency
                            ? t('Balance: %balance%', {
                                balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading'),
                              })
                            : ' -'}
                        </Text>
                            {account && (
                              <Button variant="text" scale="xs" onClick={handleSelectMax}>
                                MAX
                              </Button>
                            )}
                          </Flex>
                          <Container as="label">
                            <LabelRow>
                              <CurrencyLogo currency={inputCurrency} />
                              <NumericalInput
                                className="token-amount-input"
                                value={inputAmount}
                                onUserInput={handleInput}
                              />
                            </LabelRow>
                            <InputRow style={{ padding: '0.25rem 0.75rem 0.75rem 0.75rem' }} />
                          </Container>
                        </InputPanel>
                      </FlexGap>
                      {Number(userAvailableAmount) > 0 ? (
                        <>
                          <Flex justifyContent="space-between">
                            <Text>Estimate amount</Text>
                            <Text>{Number(userAvailableAmount) - Number(userClaimedAmount)} XFN</Text>
                          </Flex>
                        </>
                      ) : (
                        <></>
                      )}
                    </AutoColumn>
                    <Flex justifyContent="space-between">
                      <Text>Daily ROI:</Text>
                      <Text>2% </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>TVL:</Text>
                      <Text>{`${maxBuyAmount.toFixed(0)} ${inputCurrency?.symbol}`} </Text>
                    </Flex>
                    <Box width="100%" my="12px" mt="6px">
                      {!account ? (
                        <ConnectWalletButton width="100%" scale="md" />
                      ) : (
                        <>                         
                          <Button
                            scale="md"
                            width="100%"
                            mb="4px"
                            disabled={disabled}
                            onClick={async () => {
                              setPendingTx(true)
                              await handleBuy(inputAmount)
                              setOutputAmount('')
                              setPendingTx(false)
                            }}
                          >
                            Deposit
                          </Button>                        
                        </>
                      )}
                        <Flex justifyContent="space-between" my="10px">
                            <Flex flexDirection='column'>
                               <Text color='textDisabled'>Total Staked</Text>
                               <Text fontSize="20px">0.000 XFNs </Text>
                            </Flex>
                            <Flex flexDirection='column' >
                               <Text textAlign="right" color='textDisabled'>Available</Text>
                               <Text fontSize="20px">0.00000 LP</Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent="space-between" mt="20px">
                          <Text color='textDisabled'>Daily ROI</Text>
                          <Text>{`${minBuyAmount.toFixed(0)} ${inputCurrency?.symbol}`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text color='textDisabled'>Available Claims</Text>
                          <Text>{`${maxBuyAmount.toFixed(0)} ${inputCurrency?.symbol}`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text color='textDisabled'>Total Deposited</Text>
                          <Text>{`${userClaimedAmount.toFixed(0)} XFN`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text color='textDisabled'>Total Compounded</Text>
                          <Text>{`${userClaimedAmount.toFixed(0)} XFN`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text color='textDisabled'>Total Claimed</Text>
                          <Text>{`${userClaimedAmount.toFixed(0)} XFN`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text color='textDisabled'>Cutoff in</Text>
                          <Text>{`${userClaimedAmount.toFixed(0)} XFN`} </Text>
                        </Flex>
                        <Flex justifyContent="space-between"  mb="30px">
                          <Text color='textDisabled'>Last Action</Text>
                          <Text>{`${userClaimedAmount.toFixed(0)} XFN`} </Text>
                        </Flex>
                        <Flex style={{gap:"4px"}}>
                            <Button
                              scale="md"
                              width="100%"
                              mb="4px"
                              disabled={disabled}
                              onClick={async () => {
                                setPendingTx(true)
                                await handleBuy(inputAmount)
                                setOutputAmount('')
                                setPendingTx(false)
                              }}
                            >
                              Compound
                            </Button>
                            <Button
                              scale="md"
                              width="100%"
                              disabled={disabledClaim}
                              onClick={async () => {
                                setPendingClaimTx(true)
                                await handleClaim()
                                setPendingClaimTx(false)
                              }}
                            >
                              {btnTextClaim}
                            </Button>
                        </Flex>
                    </Box>
                    
                  </Wrapper>
                </AppBody>
            </ConicBorder>
          </Flex>
        </Flex>
      </Page>
      </div>
    </>
  )
}
