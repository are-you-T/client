import React from "react";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "./Button";
// import companyLogo from "../assets/logo.svg";

import { ReactComponent as LogoSvg } from '../assets/logo.svg';

export default function Logo() {
  return (
    <LogoContainer>
        <LogoSvg className="flex-start"></LogoSvg>
        <LogoText>@T?</LogoText>
    </LogoContainer>

  );
}

const LogoContainer = tw.span`
  flex
  w-36
  h-auto
  items-center
  gap-1.5
  shrink-0
`;

const LogoText = tw.span`
    flex
    h-auto
    text-lg
    items-center
    justify-center

`