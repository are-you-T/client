import tw from "twin.macro";

export const Container = tw.div`
flex
flex-col
items-center
px-4
text-black
bg-white
rounded-xl
`;
export const Title = tw.h5`
text-3xl
font-bold
py-6
`;
export const GoodType = tw.div`
mt-2
mb-6
bg-pink-100
rounded-lg
p-4
`;
export const BadType = tw.div`
mb-8
bg-blue-100
rounded-lg
p-4
`;
export const TypeTitle = tw.p`
text-lg
text-center
font-bold
mb-2
`;
export const Mbti = tw.p`
text-base
text-center
font-bold
mb-2
`;
export const Contents = tw.div`
w-full
`;
