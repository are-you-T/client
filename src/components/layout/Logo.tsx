import tw from "tailwind-styled-components";

import { ReactComponent as MainLogoSvg } from "@/assets/img/mainlogo.svg";

export default function Logo() {
  return (
    <LogoContainer>
        <MainLogoSvg className="flex-start"></MainLogoSvg>
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
