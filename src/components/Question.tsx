import React from "react";
//@ts-ignore
export default function Question({ idx, subject }) {
  return (
    <div>
      <h2>{idx}</h2>
      <h3>{subject}</h3>;
    </div>
  );
}
