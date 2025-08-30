import { useCallback } from "react";
import {
  Location as RouterLocation,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// RouterProps 인터페이스 정의: 반환되는 함수 및 속성들 정의
interface RouterProps {
  navigateTo: (path: string, state?: unknown) => void;
  goBack: () => void;
  params: { [key: string]: string | undefined };
  location: RouterLocation; // react-router-dom의 Location 타입 사용
  search: URLSearchParams;
}

// useRouter 훅 정의: 페이지 이동, 경로 및 쿼리 파라미터 관리를 위한 훅
const useRouter = (): RouterProps => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const location = useLocation(); // react-router-dom의 Location 객체 반환
  const params = useParams(); // URL 경로 파라미터

  // navigateTo: 특정 경로로 이동하면서, 선택적으로 state를 전달
  const navigateTo = useCallback(
    (path: string, state?: unknown) => {
      navigate(path, { state }); // navigate 함수에 경로 및 상태 전달
    },
    [navigate]
  );

  // goBack: 이전 페이지로 이동 (히스토리 스택에서 뒤로 가기)
  const goBack = useCallback(() => {
    navigate(-1); // navigate(-1)을 통해 뒤로 이동
  }, [navigate]);

  // URLSearchParams: 현재 URL의 쿼리 파라미터를 관리
  const search = new URLSearchParams(location.search);

  return {
    navigateTo, // 경로 이동 함수
    goBack, // 뒤로 가기 함수
    params, // URL 경로 파라미터
    location, // 현재 위치 정보 (react-router-dom의 Location 타입)
    search, // 쿼리 파라미터 관리 객체
  };
};

export default useRouter;
