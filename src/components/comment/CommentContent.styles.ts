import tw from "twin.macro";

export const CommentModalBg = tw.div`
w-full 
fixed 
top-0
left-0
rounded-t-3xl
z-[70]

 h-full 
 backdrop-blur-sm 
 bg-black/[.3]
`;

export const CommentContentWrap = tw.div`
  w-full
`;

export const CommentContenBox = tw.div`
 flex
 justify-between
 items-center
 mb-[20px]
`;

export const CommentContentOption = tw.div`
flex
items-center
gap-[20px]
`;

export const CommentContentText = tw.div`
w-[50%]
flex
flex-col
gap-[10px]
`;

export const CommentContenDetail = tw.div`
 flex
 justify-between
`;
export const RepliesCharacter = tw.div`
ml-[40px]
`;
