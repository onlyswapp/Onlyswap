import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  HomeIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    // {
    //   label: t('Home'),
    //   icon: HomeIcon,
    //   fillIcon: HomeIcon,
    //   href: '/',
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Swap'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Liquidity'),
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      href: '/liquidity',
      // image: '/images/decorations/pe2.png',
      showItemsOnMobile: false,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('X\u2011Yield'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/x-yield',
    //   showItemsOnMobile: false,
    //   items: [      
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('NFTs'),
    //   icon: NftIcon,
    //   fillIcon: NftFillIcon,
    //   href: '/nfts',
    //   showItemsOnMobile: false,
    //   items: [
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('XFortune'),
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   href: '/xfortune',
    //   showItemsOnMobile: false,
    //   items: [
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('XAmplify'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/xamplify',
    //   showItemsOnMobile: false,
    //   items: [      
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Presale'),
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   href: '/presale',
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Audits'),
    //   icon: TrophyIcon,
    //   fillIcon: TrophyFillIcon,
    //   href: '/audits',
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Whitepaper'),
    //   icon: MoreIcon,
    //   href: 'https://onlyswap.org/whitepaper.pdf',
    //   image: '/images/decorations/pe2.png',
    //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
