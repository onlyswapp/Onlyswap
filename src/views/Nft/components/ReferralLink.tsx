import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Link, Text, Heading, CardHeader } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import copy from 'copy-to-clipboard';
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import rot13 from 'utils/encode';
import ConnectWalletButton from 'components/ConnectWalletButton';


const StyledLink = styled(Link)`
    cursor: pointer;
    align-self: center;
    margin: 0px auto;
    margin-top: 15px;
`

const StyledFooter = styled(CardFooter)`
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  min-height: 120px;
  background: ${({ theme }) => theme.card.background};
`

const StyledButton = styled(Button)`
    color: #fff;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    height: 32px;
    padding: 0px 16px;
    opacity: 1;

    &:hover {
        background-color: transparent !important;
        opacity: 0.8;
    }

    &:focus {
        box-shadow: none;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    color: #fff;
`

const CustomHeader = styled(CardHeader)`
    background: ${({ theme }) => theme.colors.primary};
`
const CustomCardBody = styled(CardBody)`
    background: #e5e5e5;
    min-height: 130px;
    `

const ReferralLink = () => {
    const { account } = useActiveWeb3React()
    const [text, setText] = useState("Copy");

    const { toastSuccess } = useToast()

    const onClick = () => {
        copy(`https://onlyswap.org/nfts?ref=${rot13(account)}`);

        setText("Copied");
        toastSuccess('', 'Copied')
        setTimeout(() => {
            setText("Copy");
        }, 1000);
    }

    return (
        <Card>
            <CustomHeader>
                <Container>
                    <Heading color="#fff" size="sm">Your Referral Link</Heading>
                    <StyledButton onClick={onClick}>{text}</StyledButton>
                </Container>
            </CustomHeader>
            <StyledFooter>
            <div style={{alignItems: "center"}}>
              <Heading scale="df" color="#fff" mb="12px" style={{ lineHeight: '25px'}}>
                Referral Bonus
              </Heading>
            </div>
            <Text color="white" mb="12px">
              Earn 4% in bonus referrals every time you refer a user that mints an NFT! With DAI sent direct to your wallet
            </Text>
            <Text>
              Note: once your max % is reached, all referrals will cease until you mint a new NFT
            </Text>
            <div style={{alignItems: "center"}}>
              <Heading scale="df" color="#fff" mt="24px" mb="12px" style={{ lineHeight: '25px'}}>
                ~Coming Soon~
              </Heading>
            </div>
            <Text mb="24px" color="white">
              Earn 3% of the initial deposit into Xamplify (NFT Holders Only)
            </Text>
            <div style={{alignItems: "center"}}>
                {!account ? <ConnectWalletButton /> :
                    <StyledLink>{`https://onlyswap.org/nfts?ref=${rot13(account)}`}</StyledLink>
                }
            </div>
            </StyledFooter>
        </Card>
    )
}

export default ReferralLink
