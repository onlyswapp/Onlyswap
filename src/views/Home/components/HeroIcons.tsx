import Image from 'next/image';
import Link from 'next/link';
import swapIcon from '../../../../public/images/home/trade/swap.jpg';
import presaleIcon from '../../../../public/images/home/trade/presale.jpg';
import nftsIcon from '../../../../public/images/home/trade/nfts.jpg';
import xamplifyIcon from '../../../../public/images/home/trade/xamplify.jpg';
import xyieldIcon from '../../../../public/images/home/trade/x-yield.jpg';
import xfortuneIcon from '../../../../public/images/home/trade/xfortune.jpg';

const iconWidth = 160;
const iconHeight = 160;

const iconStyle: React.CSSProperties = {
  borderRadius: '25px',
  boxShadow: '0 0 8px rgba(0, 0, 0, 1)',
};

const textBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(100, 100, 100, 0.3)',
  borderRadius: '25px',
  border: '1px solid lightgray',
  padding: '5px',
  margin: '5px',
  paddingBottom: '10px',
};

const heroIconsContainer: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap', // Allow items to wrap into multiple rows
  justifyContent: 'center',
};

const HeroIcons = () => {
  return (
    <div style={heroIconsContainer}>
      <div style={textBox}>
        <Link href="/swap">
          <a>
            <Image
              src={swapIcon}
              alt="OnlyLayer Swap"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>OnlyLayer Swap</p>
          </a>
        </Link>
      </div>
      <div style={textBox}>
        <Link href="/presale">
          <a>
            <Image
              src={presaleIcon}
              alt="OnlyLayer Token Presale"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>ONLY Token Presale</p>
          </a>
        </Link>
      </div>
      <div style={textBox}>
        <Link href="/nfts">
          <a>
            <Image
              src={nftsIcon}
              alt="ONLY NFTs"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>ONLY NFTs</p>
          </a>
        </Link>
      </div>
      <div style={textBox}>
        <Link href="/xamplify">
          <a>
            <Image
              src={xamplifyIcon}
              alt="XAmplify"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>XAmplify</p>
          </a>
        </Link>
      </div>
      <div style={textBox}>
        <Link href="/x-yield">
          <a>
            <Image
              src={xyieldIcon}
              alt="X-Yield (LP Staking)"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>X-Yield (LP Staking)</p>
          </a>
        </Link>
      </div>
      <div style={textBox}>
        <Link href="/xfortune">
          <a>
            <Image
              src={xfortuneIcon}
              alt="XFortune"
              width={iconWidth}
              height={iconHeight}
              style={iconStyle}
            />
            <p>XFortune</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HeroIcons;
