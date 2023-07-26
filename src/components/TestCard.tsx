import React from "react";
//@ts-ignore
export default function TestCard({ contents }) {
  return (
    <div className="w-80 py-9 px-4 mb-5 cursor-pointer text-center rounded-2xl bg-white">
      <p>{contents}</p>
    </div>
  );
}
