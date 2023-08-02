import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

export default function HeartBtn() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        fill="#FC5013"
      >
        <path
          stroke="#FC5013"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M4.5 1C2.567 1 1 2.491 1 4.33c0 1.486.613 5.01 6.642 8.573a.71.71 0 0 0 .716 0C14.388 9.34 15 5.816 15 4.331 15 2.49 13.433 1 11.5 1S8 3.019 8 3.019 6.433 1 4.5 1Z"
        />
      </svg>
    </>
  );
}
