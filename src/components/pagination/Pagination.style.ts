import tw, { styled } from "twin.macro";

const Container = tw.ul`
    flex
    justify-center
`;

const PageItem = styled.li<{
  isCurrentPage?: boolean;
  position?: "left" | "right";
}>`
  ${tw`
    btn
    rounded-none
  `}

  ${({ position }) =>
    position === "left"
      ? tw`rounded-l-lg`
      : position === "right"
      ? tw`rounded-r-lg`
      : ""}

  ${({ isCurrentPage }) => isCurrentPage && tw`bg-[#008FFB] text-white`}
`;

export { Container, PageItem };
