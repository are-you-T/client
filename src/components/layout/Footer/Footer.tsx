import { ReactComponent as LogoSvg } from "@/assets/img/logo.svg";
import { ReactComponent as GitHubSvg } from "@/assets/img/github.svg";
import { ReactComponent as ShareSvg } from "@/assets/img/share.svg";
import {
  Footer,
  FooterLink,
  FooterLinkIcon,
  FooterText,
  FooterTextArea,
  FooterWrap
} from "./Footer.styles";
import { handleShareClick } from "@/components/common/ShareLink";

export default function Foot() {
  // const handleShareClick = async () => {
  //     await share(window.location.origin);
  // };
  // const share = async (text: string) => {
  //     try {
  //         await navigator.clipboard.writeText(text);
  //         alert("링크가 복사되었습니다!");
  //     } catch (e) {
  //         alert("초대코드 복사에 실패했습니다ㅜㅜ");
  //     }
  // };
  //Web Share API 적용코드
  // const handleShareClick = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: document.title,
  //         text: "링크를 공유합니다.",
  //         url: window.location.href
  //       });
  //       console.log("링크를 공유했습니다!");
  //     } catch (error) {
  //       console.error("링크 공유에 실패했습니다.", error);
  //     }
  //   } else {
  //     // Web Share API를 지원하지 않는 경우
  //     // 대체 동작을 수행합니다.
  //     await share(window.location.origin);
  //   }
  // };

  // const share = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     alert("링크가 복사되었습니다!");
  //   } catch (e) {
  //     alert("초대코드 복사에 실패했습니다ㅜㅜ");
  //   }
  // };
  handleShareClick();

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
          <FooterLink
            href="https://github.com/are-you-T"
            target="_blank"
            rel="are-you-T noreferrer"
          >
            <GitHubSvg />
          </FooterLink>
          <FooterLink onClick={handleShareClick}>
            <ShareSvg />
          </FooterLink>
        </FooterLinkIcon>
      </FooterWrap>
    </Footer>
  );
}
