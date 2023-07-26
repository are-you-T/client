import React from "react";
import TestCard from "../components/TestCard";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";
import ProgressNum from "../components/ProgressNum";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <section className="flex flex-col items-center w-[390px] h-[844px] mx-auto my-0 bg-black">
      <Question />
      <TestCard contents="남은 얘기는 만나서 해야징" />
      <TestCard contents="통화가 끝났으니 이제 쉬어야지.." />
    </section>
  );
}
