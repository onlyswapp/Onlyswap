import memoize from 'lodash/memoize'
import { ContextApi } from '@pancakeswap/localization'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'OnlySwap',
  description:
    "Only Swap allows you to make a quick swap of the tokens on Only Layer Network.",
  image: '/images/hero.png',
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange') },
      '/presale': { basePath: true, title: t('Presale') },
      // '/limit-orders': { basePath: true, title: t('Limit Orders') },
      // '/add': { basePath: true, title: t('Add Liquidity') },
      // '/remove': { basePath: true, title: t('Remove Liquidity') },
      // '/liquidity': { title: t('Liquidity') },
      // '/find': { title: t('Import Pool') },
      // '/competition': { title: t('Trading Battle') },
      // '/prediction': { title: t('Prediction') },
      // '/prediction/leaderboard': { title: t('Leaderboard') },
      // '/farms': { title: t('Farms') },
      // '/farms/auction': { title: t('Farm Auctions') },
      // '/pools': { title: t('Pools') },
      // '/lottery': { title: t('Lottery') },
      // '/ifo': { title: t('Initial Farm Offering') },
      // '/teams': { basePath: true, title: t('Leaderboard') },
      // '/voting': { basePath: true, title: t('Voting') },
      // '/voting/proposal': { title: t('Proposals') },
      // '/voting/proposal/create': { title: t('Make a Proposal') },
      // '/info': { title: t('Overview'), description: 'View statistics for Hendotechswap exchanges.' },
      // '/info/pools': { title: t('Pools'), description: 'View statistics for Hendotechswap exchanges.' },
      // '/info/tokens': { title: t('Tokens'), description: 'View statistics for Hendotechswap exchanges.' },
      // '/nfts/collections': { basePath: true, title: t('Collections') },
      // '/nfts/activity': { title: t('Activity') },
      // '/profile': { basePath: true, title: t('Profile') },
      // '/pancake-squad': { basePath: true, title: t('Pancake Squad') },
      // '/pottery': { basePath: true, title: t('Pottery') },
    },
    defaultTitleSuffix: t('OnlySwap'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title} | ${t(pathList.defaultTitleSuffix)}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
