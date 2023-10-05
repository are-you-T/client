import tw from "twin.macro";

export const CommentPostWrap = tw.div`
  w-full
  text-black
`;

export const CommentPostBox = tw.div`
  w-full
 bg-white
 rounded-[10px]
 
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
 w-[75%]
 flex
 justify-between
`;
