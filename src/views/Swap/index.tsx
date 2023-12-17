import { useEffect, useMemo, useState } from 'react'
import { CSSProperties } from 'react';
import { ChainId, Currency } from '@pancakeswap/sdk'
import { Heading, Text, Box, Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import { useDefaultsFromURLSearch } from 'state/limitOrders/hooks'
import { AppBody } from 'components/App'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import { useExchangeChartManager } from '../../state/user/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'

import { Display7 } from "../../components/Display7";
import { Display14 } from "../../components/Display14";
import { getPairsMatchingBaseTokenAddress, getPairInformationByChain } from "dexscreener-api"
import { onlyChainTokens, pulseChainTokens } from '@pancakeswap/tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { BURN_ADDRESS } from 'config/constants'

const CHART_SUPPORT_CHAIN_IDS = [ChainId.ONLY_CHAIN]

export const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [ChainId.ONLY_CHAIN]

const STABLE_SUPPORT_CHAIN_IDS = [ChainId.BSC_TESTNET, ChainId.ONLY_CHAIN]

const textBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(100, 100, 100, 0.3)',
  borderRadius: '10px',
  border: '4px solid lightgray',
  padding: '10px',
  marginBottom: '25px',
  width: 'min(100%, 620px)',
};

const gradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  // background: 'radial-gradient(circle, rgba(24, 48, 128, 1), rgba(12, 24, 64, 1), rgba(6, 12, 32, 1), rgba(0, 0, 0, 1), black)',
  background: 'radial-gradient(circle, rgb(12 8 57), rgb(33 15 75), rgb(27, 0, 57), rgb(6 1 12), black)',
  opacity: 1,
  zIndex: -1,
};

const backgroundLogo: CSSProperties = {
  position: 'relative',
  background: `url('/images/home/lunar-bunny/background_logo.png') right bottom no-repeat`,
  backgroundSize: 'auto',
};

export default function Swap() {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)

  const { account } = useActiveWeb3React()
  const XFNCurrency = useCurrency(onlyChainTokens.wbnb.address)
  
  const XFNBalance = useCurrencyBalance(account ?? undefined, XFNCurrency ?? undefined)
  const XFNBurnedBalance = useCurrencyBalance(BURN_ADDRESS, XFNCurrency ?? undefined)

  useDefaultsFromURLSearch()

  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  const { chainId } = useActiveWeb3React()

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)

  const isChartSupported = useMemo(
    () =>
      // avoid layout shift, by default showing
      !chainId || CHART_SUPPORT_CHAIN_IDS.includes(chainId),
    [chainId],
  )

  const isStableSupported = useMemo(() => !chainId || STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const [XFNStats, setXFNStats] = useState<any>('')
  const [XFNPrice, setXFNPrice] = useState(0)
  const [XFNPriceLCD, setXFNPriceLCD] = useState('-----')
  const [XFNBalanceLCD, setXFNBalanceLCD] = useState('-----')
  const [XFNBalanceValueLCD, setXFNBalanceValueLCD] = useState('-----')
  const [XFNBurnedBalanceLCD, setXFNBurnedBalanceLCD] = useState('-----');
  const [XFNBurnedBalanceValueLCD, setXFNBurnedBalanceValueLCD] = useState('-----');

  function fetchXFNStats() {
    getPairInformationByChain("onlychain", "0xc8df4af0c613c8820be2e84e082c6d62afbd4226").then((responseData) => {
      setXFNStats(responseData);
    }).catch((error) => console.log('Error fetching XFNStats', error))
  }

  function calculateSuffix(balance: number): { multipliedBalance: number; suffix: string } {
    let suffix = ''; // Can be "K" for thousand, "M" for million, "B" for billion, "T" for trillion

    if (balance >= 1e12) {
      balance /= 1e12;
      suffix = 'T';
    } else if (balance >= 1e9) {
      balance /= 1e9;
      suffix = 'B';
    } else if (balance >= 1e6) {
      balance /= 1e6;
      suffix = 'M';
    } else if (balance > 1000) {
      balance /= 1000;
      suffix = 'K';
    } // If the balance is less than 1000, no suffix needed.

    return { multipliedBalance: balance, suffix };
  }

  function calculateFormattedString(balance: number, length: number, suffix: string): string {
    if (suffix != '') {
      length = length - 1
    }

    let formattedString: string;
    if (balance < 1) {
      // If the number is less than one, we want to keep only five significant digits including leading zeros before decimal point.
      const precision = Math.max(length - balance.toString().split('.')[0].length, 0);
      formattedString = `${balance.toFixed(precision)}`;
    } else {
      const precision = Math.max(length - balance.toString().split('.')[0].length, 0);
      formattedString = `${balance.toFixed(precision)}`;
    }
    const decimalPointIndex = formattedString.indexOf(".");
    if (decimalPointIndex !== -1) {
      // Calculate ASCII code for corresponding letter character
      let charCode = 97 + parseInt(formattedString[decimalPointIndex-1]);
      // Replace decimal point and leading number with the calculated letter to encode a digit with a decimal point
      formattedString = formattedString.replace(formattedString[decimalPointIndex-1] + ".", String.fromCharCode(charCode));
    }

    return formattedString + suffix;
  }

  function updateXFNPrice() {
    let price = XFNStats.pair?.priceUsd;
    if (typeof price === 'undefined') {
      setXFNPrice(0.0);
      setXFNPriceLCD("-----");
    } else {
      const multipliedPrice = price * 1000000000000; // Multiply the price by 1 trillion
      const formattedString = calculateFormattedString(multipliedPrice, 5, '');
      setXFNPriceLCD(formattedString);
    }
    setXFNPrice(prev => price);
  }

  function updateXFNBalanceLCD() {
    let balance = XFNBalance?.toExact()
    if (typeof balance === 'undefined') {
      setXFNBalanceLCD("-----");
    } else {
      let { multipliedBalance, suffix } = calculateSuffix(Number(balance));
      const formattedString = calculateFormattedString(multipliedBalance, 5, suffix);
      setXFNBalanceLCD(formattedString);
    }
  }

  function updateXFNBalanceValueLCD() {
    let balance = XFNBalance?.toExact()
    if (typeof balance === 'undefined') {
      setXFNBalanceValueLCD("-----");
    } else {
      if (Number(balance) > 0) {
        let { multipliedBalance, suffix } = calculateSuffix(Number(balance) * XFNPrice);
        const formattedString = calculateFormattedString(multipliedBalance, 5, suffix);
        setXFNBalanceValueLCD(formattedString);
      } else {
        setXFNBalanceValueLCD("    0");
      }
    }
  }

  function updateXFNBurnedBalanceLCD() {
    let balance = XFNBurnedBalance?.toExact()
    if (typeof balance === 'undefined') {
      setXFNBurnedBalanceLCD("-----");
    } else {
      let { multipliedBalance, suffix } = calculateSuffix(Number(balance));
      const formattedString = calculateFormattedString(multipliedBalance, 5, suffix);
      setXFNBurnedBalanceLCD(formattedString);
    }
  }

  function updateXFNBurnedBalanceValueLCD() {
    let balance = XFNBurnedBalance?.toExact()
    if (typeof balance === 'undefined') {
      setXFNBurnedBalanceValueLCD("-----");
    } else {
      if (Number(balance) > 0) {
        let { multipliedBalance, suffix } = calculateSuffix(Number(balance) * XFNPrice);
        const formattedString = calculateFormattedString(multipliedBalance, 5, suffix);
        setXFNBurnedBalanceValueLCD(formattedString);
      } else {
        setXFNBurnedBalanceValueLCD("    0");
      }
    }
  }

  useEffect(() => {
    fetchXFNStats();
    const interval = setInterval(fetchXFNStats, 30000);
    return () => clearInterval(interval) ;
  }, []);

  useEffect(() => {
    if (typeof XFNStats !== 'undefined') updateXFNPrice();
    const interval = setInterval(updateXFNPrice, 30000);
    return () => clearInterval(interval);
  }, [XFNStats]);

  useEffect(() => {
    if (typeof XFNBalance !== 'undefined') updateXFNBalanceLCD();
    const interval = setInterval(updateXFNBalanceLCD, 2000);
    return () => clearInterval(interval);
  }, [XFNBalance]);

  useEffect(() => {
    if (typeof XFNBalance !== 'undefined') updateXFNBalanceValueLCD();
    const interval = setInterval(updateXFNBalanceValueLCD, 2000);
    return () => clearInterval(interval);
  }, [XFNBalance]);

  useEffect(() => {
    if (typeof XFNBurnedBalance !== 'undefined') updateXFNBurnedBalanceLCD();
    const interval = setInterval(updateXFNBurnedBalanceLCD, 2000);
    return () => clearInterval(interval);
  }, [XFNBurnedBalance]);

  useEffect(() => {
    if (typeof XFNBurnedBalance !== 'undefined') updateXFNBurnedBalanceValueLCD();
    const interval = setInterval(updateXFNBurnedBalanceValueLCD, 2000);
    return () => clearInterval(interval);
  }, [XFNBurnedBalance]);

  return (
    // <div style={backgroundLogo}>
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded} isSwap={false} style={{minHeight: "calc(100vh - 140px)"}}>
      <div style={gradientOverlayStyle}></div>
      <Flex width="100%" justifyContent="center" position="relative">
        <Flex flexDirection="column">
          <StyledSwapContainer $isChartExpanded={isChartExpanded}>
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
              <AppBody>
                <SwapForm
                  isAccessTokenSupported={isAccessTokenSupported}
                  setIsChartDisplayed={setIsChartDisplayed}
                  isChartDisplayed={isChartDisplayed}
                />
              </AppBody>
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
          {isChartExpanded && (
            <Box display={['none', null, null, 'block']} width="100%" height="100%">
              <Footer variant="side" helpUrl={EXCHANGE_DOCS_URLS} />
            </Box>
          )}
        </Flex>
      </Flex>
      {/* <div style={{ width: "350px" }}>
        <div style={textBox}>
          <Heading scale="md" color="#ffffff" mb="8px" textAlign="center">
            {t('ONLYLAYER Token Stats')}
          </Heading>
          <div style={{ width: "315px" }}>
            <div style={textBox}>
              <Heading scale="md" color="#ffffff" mb="-56px" textAlign="center">
                {t('XFN Price, $/Trillion:')}
              </Heading>
              <div
                style={{
                    color: 'cyan',
                    fontSize: '64px',
                    filter: `drop-shadow(0px 0px ${64 * 0.5}px cyan)`,
                    position: 'relative',
                    top: '64px',
                    left: '-130px',
                }}>
                $
              </div>
              <Display7 value={XFNPriceLCD} count={5} color="cyan" height={64} skew={false}/>
            </div>
            <div style={textBox}>
              <Heading scale="md" color="#ffffff" mb="8px" textAlign="center">
                {t('XFN in the Wallet:')}
              </Heading>
              <Display14 value={XFNBalanceLCD} count={5} color="orange" height={64} skew={false}/>
            </div>
            <div style={textBox}>
              <Heading scale="md" color="#ffffff" mb="-56px" textAlign="center">
                {t('XFN $ value in the Wallet:')}
              </Heading>
              <div
                style={{
                    color: 'orange',
                    fontSize: '64px',
                    filter: `drop-shadow(0px 0px ${64 * 0.5}px cyan)`,
                    position: 'relative',
                    top: '64px',
                    left: '-130px',
                }}>
                $
              </div>
              <Display14 value={XFNBalanceValueLCD} count={5} color="orange" height={64} skew={false}/>
            </div>
            <div style={textBox}>
              <Heading scale="md" color="#ffffff" mb="8px" textAlign="center">
                {t('XFN burned:')}
              </Heading>
              <Display14 value={XFNBurnedBalanceLCD} count={5} color="red" height={64} skew={false}/>
            </div>
            <div style={textBox}>
              <Heading scale="md" color="#ffffff" mb="-56px" textAlign="center">
                {t('XFN $ value burned:')}
              </Heading>
              <div
                style={{
                    color: 'red',
                    fontSize: '64px',
                    filter: `drop-shadow(0px 0px ${64 * 0.5}px cyan)`,
                    position: 'relative',
                    top: '64px',
                    left: '-130px',
                }}>
                $
              </div>
              <Display14 value={XFNBurnedBalanceValueLCD} count={5} color="red" height={64} skew={false}/>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div style={textBox}>
        <iframe id="dextools-widget" title="DEXTools Trading Chart" height="400" width="100%"
                src="https://www.dextools.io/widget-chart/en/pulse/pe-light/0xc8df4af0c613c8820be2e84e082c6d62afbd4226?theme=dark&chartType=1&chartResolution=1D&drawingToolbars=false"></iframe>
      </div> */}
    </Page>
    // </div>
  )
}
