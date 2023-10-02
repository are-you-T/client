import tw from "twin.macro";

export const Background = tw.div`
`;

export const Container = tw.div`
bg-[#0272F1]
w-[390px]
m-auto
pt-16
`;

export const ContentWrapper = tw.div`
bg-[#B2ACF9]
p-5
`;

export const Character = tw.div`
w-[390px]
h-[342px]
bg-main
bg-no-repeat
m-auto
border-[#B2ACF9]
border-b-4
`;

export const Title = tw.h3`
font-bold
text-6xl
text-center
mb-[60px]
text-[#000]
`;

export const Button = tw.button`
block
p-4
w-[321px]
font-bold
text-lg
m-auto
rounded-[50px]
mb-[15px]
bg-[#000]
text-[#fff]
`;

export const FirstButton = tw(Button)`
bg-[#FFDF3F]
text-[#000]
`;
