import { useState, useEffect, useCallback, SetStateAction } from "react";
import * as S from "./Pagination.styles";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  // 서버에서 받아온 총 페이지 합계  => 임시
  const totalPages: number = 4;

  // 표시할 페이지의 개수
  const showPageCount = 5;

  // 페이지 시작과 끝

  // 이전 페이지로 이동
  const goPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const goNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 버튼을 클릭, 페이지 변경
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="join">
      <button className="join-item btn" onClick={goPrevPage}>
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <S.NumButton
          key={index}
          isActive={currentPage === index + 1}
          onClick={() => goToPage(index + 1)}
        >
          {index + 1}
        </S.NumButton>
      ))}
      <button className="join-item btn ">
        {" "}
        <span className="material-symbols-outlined" onClick={goNextPage}>
          chevron_right
        </span>
      </button>
    </div>
  );
}

export default Pagination;
