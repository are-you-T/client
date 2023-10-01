import tw from "twin.macro";

export const Testcard = tw.button`
w-80
h-[120px]
py-9
px-4
mb-5
cursor-pointer
text-left
rounded-2xl
bg-white
text-black

[@media(hover:hover){&:hover}]:bg-violet-400
[@media(hover:hover){&:hover}]:border-transparent
[@media(hover:hover){&:hover}]:-translate-y-1
[@media(hover:hover){&:hover}]:text-white	

active:translate-y+1
active:bg-purple-400
active:text-white

ease-in
duration-200

select-none
relative
animate-testComponent
`;

export const TestcardText = tw.p`
ml-2
`;
