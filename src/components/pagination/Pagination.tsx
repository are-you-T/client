import { useState } from "react";
import { Container, PageItem } from "./Pagination.style";

interface PaginationProps {
  pageBtnCount?: number;
  maxPage: number;
  onChangePage: (pageNum: number) => void;
}

const Pagination = ({
  pageBtnCount = 5,
  maxPage,
  onChangePage
}: PaginationProps) => {
  const paginationSize = Math.min(maxPage, pageBtnCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState<number[]>(() =>
    Array.from({ length: paginationSize }, (_, i) => i + 1)
  );

  const handleClickBtn = (nextPage: number) => {
    const isValidPage = 1 <= nextPage && nextPage <= maxPage;

    if (nextPage === currentPage || !isValidPage) return;

    setCurrentPage(nextPage);
    getNextVisiblePages(nextPage);
    onChangePage(nextPage);
  };

  const getNextVisiblePages = (nextPageNum: number) => {
    if (maxPage <= paginationSize) return;

    const nextVisiblePages: number[] = [];
    let count = paginationSize;
    let target = nextPageNum - 2;

    while (count > 0) {
      if (target < 1) {
        target = 1;
        continue;
      }

      if (target > maxPage) {
        nextVisiblePages.unshift(maxPage - nextVisiblePages.length);
        count--;
        continue;
      }

      nextVisiblePages.push(target);
      target++;
      count--;
    }

    setVisiblePages(nextVisiblePages);
  };

  return (
    <Container>
      <PageItem position="left" onClick={() => handleClickBtn(currentPage - 1)}>
        <button>{"<"}</button>
      </PageItem>
      {visiblePages.map((pageNum) => (
        <PageItem
          key={pageNum}
          isCurrentPage={pageNum === currentPage}
          onClick={() => handleClickBtn(pageNum)}
        >
          <button>{pageNum}</button>
        </PageItem>
      ))}
      <PageItem
        position="right"
        onClick={() => handleClickBtn(currentPage + 1)}
      >
        <button>{">"}</button>
      </PageItem>
    </Container>
  );
};

export default Pagination;
