import tw from 'twin.macro';
import { Link } from "react-router-dom";

export const Container = tw.section`
w-[390px] 
mx-auto 
my-0 
`;

export const Header = tw.header`
w-full
flex
justify-between
items-center
p-4
pb-6
`;

export const Title = tw.h3`
font-bold
text-5xl
text-white
`;

export const ShareButton = tw.button`
bg-black
text-white
text-xl
font-bold
cursor-pointer
rounded-3xl
py-2
px-4
`;

export const Main = tw.section`
w-full
`;

export const MainTop = tw.div`
w-full
`;

export const CharacterImg = tw.div`
w-[390px]
h-[342px]
bg-test
`;

export const ContentWrapper = tw.div`
bg-[#0272f1]
py-5
px-10
pb-20
text-center
relative
bottom-5
text-white
`;

export const ContentTitle = tw.h5`
text-2xl
font-bold
mb-6
`;

export const Content = tw.div`
text-xl
mb-6
`;

export const HashTags = tw.ul`
list-none
grid
grid-cols-2
place-items-center
`;

export const MainBottom = tw.section`
w-full
relative
bottom-5
bg-[#ffdf3f]
pt-10
px-5
`;

export const Buttons = tw.div`
flex
flex-col
pb-10
`;

export const HyperText = tw(Link)`
block
text-center
bg-black
rounded-3xl
text-white
font-bold
my-2
mx-10
py-2
text-xl
cursor-pointer
`;