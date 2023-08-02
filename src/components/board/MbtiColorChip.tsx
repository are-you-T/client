import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const MbtiColor = tw.div`
 flex flex-row gap-2
`;

export default function MbtiColorChip() {
  return (
    <MbtiColor>
      {/* 컬러 props로 받기 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="36"
        fill="none"
      >
        <ellipse
          cx="18.088"
          cy="17.833"
          fill="#00B26E"
          rx="18.088"
          ry="17.833"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="36"
        fill="none"
      >
        <ellipse
          cx="18.088"
          cy="17.833"
          fill="#FFA8DF"
          rx="18.088"
          ry="17.833"
        />
      </svg>
    </MbtiColor>
  );
}
