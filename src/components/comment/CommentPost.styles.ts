import tw from "twin.macro";

export const CommentPostWrap = tw.div`
  w-full
  text-black
  absolute
  bottom-0
  left-0
`;

export const CommentPostBox = tw.div`
  w-full
 bg-white
 rounded-[10px]
 relative
 z-50
 
`;
export const CommentPostTop = tw.div`
 flex
 justify-between
 p-[10px]
`;
export const CommentPostTopInput = tw.input`
 w-[70%]
`;
export const CommentPostBottom = tw.div`
 flex
 justify-between
 items-center
 p-[10px]
`;
export const CommentPostBottomDetail = tw.div`
 w-[80%]
 flex
 justify-between
`;

export const CommentCharacterWrap = tw.div`
  flex
  justify-between
  gap-[15px]
  absolute
  bottom-0
  left-[50%]
  translate-x-[-50%]
  translate-y-[-230%]
  z-30
`;
export const CommentCharacterModalBg = tw.div`
  w-full
  h-full
  absolute
  top-0
  left-0
`;
