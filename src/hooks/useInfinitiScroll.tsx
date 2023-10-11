import { useState, useEffect, useRef } from "react";

function useInfiniteScroll(loadData: () => void, deps: any[]) {
  const [targetRef, setTargetRef] = useState<React.RefObject<HTMLElement>>(
    useRef(null)
  );

  // IntersectionObserver 생성, 스크롤 이벤트를 감지하는 콜백 함수를 등록
  const intersectionObserver = new IntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      // console.log("통과");

      // 대상 요소가 뷰포트에 들어오면 IntersectionObserver를 중지(대상 엘리먼트의 관찰을 중지), 인자로 받아온 함수(loadData)를 실행.
      intersectionObserver.unobserve(targetRef.current!);
      loadData();
    }
  });

  useEffect(() => {
    if (targetRef.current) {
      // console.log("통과2");

      // 대상 요소가 존재하면(targetRef.current가 null 이 아니면), IntersectionObserver를 대상 요소에 연결하고 관찰 시작
      intersectionObserver.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        // 컴포넌트가 언마운트되거나 대상 요소가 변경되면, IntersectionObserver를 해제 ==> 메모리 누수 방지
        intersectionObserver.disconnect();
      }
    };
  }, [targetRef, ...deps]);

  // setTargetRef 함수를 반환하여, 부모 컴포넌트에서 targetRef를 설정할 수 있게
  return { setTargetRef };
}

export default useInfiniteScroll;
