import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useWallet } from 'hooks/useWallet'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import styled from 'styled-components'
import Trans from './Trans'

const StyledInput = styled(Button)`
  padding: 24px;
  border-radius: 24px;
  border: 1px solid #d028fa;
  background: linear-gradient(#e66465, #9198e5);
  background-image: linear-gradient(rgba(208,40,250,0),rgba(208,40,250,.6) 100%,#fff);
  // box-shadow: 0 0 10px 2px #fff;

`

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }

  return (
    <StyledInput onClick={handleClick} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </StyledInput>
  )
}

export default ConnectWalletButton
