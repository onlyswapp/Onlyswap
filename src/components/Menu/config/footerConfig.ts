import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.onlyswap.org/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.onlyswap.org/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/pancakeswap',
      },
      {
        label: t('Community'),
        href: 'https://docs.onlyswap.org/contact-us/telegram',
      },
      {
        label: t('Litepaper'),
        href: 'https://v2litepaper.onlyswap.org/',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://pancakeswap.creator-spring.com/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.onlyswap.org/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.onlyswap.org/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.onlyswap.org/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.onlyswap.org',
      },
      {
        label: t('Bug Bounty'),
        href: 'https://docs.onlyswap.org/code/bug-bounty',
      },
      {
        label: t('Audits'),
        href: 'https://docs.onlyswap.org/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      },
      {
        label: t('Careers'),
        href: 'https://docs.onlyswap.org/hiring/become-a-chef',
      },
    ],
  },
]
