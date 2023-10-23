import { LogoContainer } from "./Logo.styles";
import { ReactComponent as MainLogoSvg } from "@/assets/img/mainlogo.svg";

export default function Logo() {
  return (
    <LogoContainer>
        <MainLogoSvg className="flex-start"></MainLogoSvg>
    </LogoContainer>
  );
}
