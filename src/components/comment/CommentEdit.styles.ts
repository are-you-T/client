import tw from "twin.macro";

export const CommentPassWordModalWrap = tw.div`
  fixed
  top-[50%]
  bg-white
  rounded-[10px] 
  p-[20px]
  text-black 
  w-[90%]
  h-[125px] 
  flex
  flex-col
  justify-between
  text-center
  z-[70]
`;
export const CommentPassWordModalDetail = tw.div`
  flex
  justify-between
`;
//댓글 수정 모달
export const CommentEditWrap = tw.div`
  text-black
  fixed
  z-[90]
  w-[90%]
  h-[125px]
  top-[50%]
`;

export const CommentEditBox = tw.div`
  w-full
 bg-white
 rounded-[10px]
 relative
 z-50
 
`;
export const CommentEditTop = tw.div`
 flex
 justify-between
 p-[10px]
`;
export const CommentEditTopInput = tw.input`
 w-[70%]
`;
export const CommentEditBottom = tw.div`
 flex
 justify-between
 items-center
 p-[10px]
`;
export const CommentEditBottomDetail = tw.div`
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
  top-[60%]
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
