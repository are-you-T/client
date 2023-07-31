import React from "react";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
// import Button from "./Button";
import { ReactComponent as LogoSvg } from "@/assets/img/logo.svg";
import { ReactComponent as GitHubSvg } from "@/assets/img/github.svg";
import { ReactComponent as ShareSvg } from "@/assets/img/share.svg";

export default function Foot() {
  return (
    <Footer>
      <FooterWrap>
        <LogoSvg className="text-sm" />
        <FooterTextArea>
          <FooterText>AYT Company</FooterText>
          <FooterText>All content is provided for fun purposes only</FooterText>
          <FooterText>Copyright © 2023 - All right reserved</FooterText>
        </FooterTextArea>

        <FooterLinkIcon>
          <FooterLink>
            <GitHubSvg />
          </FooterLink>
          <FooterLink>
            <ShareSvg />
          </FooterLink>
        </FooterLinkIcon>
      </FooterWrap>
    </Footer>
  );
}

const Footer = tw.footer`
  bg-regal-purple
  w-full
  h-22
  p-4
`;

const FooterWrap = tw.div`
    flex 
    items-center
    justify-between 
    gap-2.5
`;

const FooterTextArea = tw.div`
flex
w-40
h-12
flex-col
justify-center
flex-shrink-0
grow-[0.5]
`;
// flex-grow 0.8

const FooterLinkIcon = tw.div`
flex
w-8
flex-row
grow-[0.5]
gap-[0.7]
`;

// gap 0.7rem
const FooterLink = tw.a`
w-auto
mr-3
`;
// mrgin right

const FooterText = tw.div`
  text-vxs
`;
