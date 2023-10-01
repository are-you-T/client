import tw from "twin.macro";

export const Testcard = tw.button`
w-80
min-h-[120px]
py-9
px-4
mb-5
cursor-pointer
text-left
rounded-2xl
bg-white
text-black
hover:bg-violet-400
hover:border-transparent
hover:translate-y-1
hover:text-white
active:translate-y-1
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
