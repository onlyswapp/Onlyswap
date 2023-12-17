import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  // {
  //   label: "About",
  //   items: [
  //     {
  //       label: "Contact",
  //       href: "https://docs.onlyswap.org/contact-us",
  //     },
  //     {
  //       label: "Blog",
  //       href: "https://medium.com/pancakeswap",
  //     },
  //     {
  //       label: "Community",
  //       href: "https://docs.onlyswap.org/contact-us/telegram",
  //     },
  //     {
  //       label: "CAKE",
  //       href: "https://docs.onlyswap.org/tokenomics/cake",
  //     },
  //     {
  //       label: "—",
  //     },
  //     {
  //       label: "Online Store",
  //       href: "https://pancakeswap.creator-spring.com/",
  //       isHighlighted: true,
  //     },
  //   ],
  // },
  // {
  //   label: "Help",
  //   items: [
  //     {
  //       label: "Customer",
  //       href: "Support https://docs.onlyswap.org/contact-us/customer-support",
  //     },
  //     {
  //       label: "Troubleshooting",
  //       href: "https://docs.onlyswap.org/help/troubleshooting",
  //     },
  //     {
  //       label: "Guides",
  //       href: "https://docs.onlyswap.org/get-started",
  //     },
  //   ],
  // },
  // {
  //   label: "Developers",
  //   items: [
  //     {
  //       label: "Github",
  //       href: "https://github.com/pancakeswap",
  //     },
  //     {
  //       label: "Documentation",
  //       href: "https://docs.onlyswap.org",
  //     },
  //     {
  //       label: "Bug Bounty",
  //       href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
  //     },
  //     {
  //       label: "Audits",
  //       href: "https://docs.onlyswap.org/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
  //     },
  //     {
  //       label: "Careers",
  //       href: "https://docs.onlyswap.org/hiring/become-a-chef",
  //     },
  //   ],
  // },
];

export const socials = [
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/onlylalyer",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/WDQ5Sys2",
  },
  // {
  //   label: "Youtube",
  //   icon: RedditIcon,
  //   href: "https://youtube.com/OnlyLayerSwap",
  // },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/onlylayer",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
