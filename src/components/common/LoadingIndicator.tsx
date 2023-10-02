import tw from "tailwind-styled-components";

export default function LoadingIndicator() {
  return (
    <PageLoading>
      <LoadingIcon />
    </PageLoading>
  );
}

const PageLoading = tw.section`
w-[390px] 
h-[790.96px]
text
bg-black
mx-auto 
my-0
flex 
flex-col 
items-center
justify-center
`;

const LoadingIcon = tw.span`
  loading
  loading-dots
  loading-lg
  text-violet-500
  `;
