import tw from "twin.macro";
export const Footer = tw.footer`
  bg-regal-purple
  w-[390px]
  m-auto
  p-4
`;

export const FooterWrap = tw.div`
    flex 
    items-center
    justify-between 
    gap-2.5
`;

export const FooterTextArea = tw.div`
flex
w-40
h-12
flex-col
justify-center
flex-shrink-0
grow-[0.5]
`;
// flex-grow 0.8

export const FooterLinkIcon = tw.div`
flex
w-8
flex-row
grow-[0.5]
gap-[0.7]
`;

// gap 0.7rem
export const FooterLink = tw.a`
w-auto
mr-3
cursor-pointer
`;
// mrgin right

export const FooterText = tw.div`
  text-xs
  text-black

`;
