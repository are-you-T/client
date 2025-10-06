import {
  getMbtiStats,
  getMbtiTypeStat,
  statDataQueryKey,
  statQueryKey,
} from "@/actions/stat.actions";
import { MbtiType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useStatController = () => {
  // MBTI 16개 유형 통계 조회
  const getStats = () => {
    return useQuery({
      queryKey: [statQueryKey],
      queryFn: () => getMbtiStats(),
    });
  };

  // ✅ MBTI 단건 유형 통계 조회
  const getMbtiStat = (mbtiType: MbtiType) => {
    return useQuery({
      queryKey: [statDataQueryKey, mbtiType],
      queryFn: () => getMbtiTypeStat(mbtiType),
      enabled: !!mbtiType, // mbtiType이 있을 때만 실행
    });
  };

  return {
    getStats,
    getMbtiStat,
  };
};

export default useStatController;
