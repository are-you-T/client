import tw from "tailwind-styled-components";
import { ReactComponent as LogoSvg } from "@/assets/img/logo.svg";
import { ReactComponent as GitHubSvg } from "@/assets/img/github.svg";
import { ReactComponent as ShareSvg } from "@/assets/img/share.svg";

export default function Foot() {
  const handleShareClick = async () => {
    await share(window.location.origin);
  };
  const share = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다!");
    } catch (e) {
      alert("초대코드 복사에 실패했습니다ㅜㅜ");
    }
  };

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

const Footer = tw.footer`
  bg-regal-purple
  w-[390px]
  m-auto
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
cursor-pointer
`;
// mrgin right

const FooterText = tw.div`
  text-vxs
`;
