import {
  getMbtiStats,
  getMbtiTypeStat,
  statDataQueryKey,
  statQueryKey,
  incrementMbtiCount,
} from "@/actions/stat.actions";
import { MbtiType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useStatController = () => {
  const queryClient = useQueryClient();
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

  // ✅ MBTI count 증가 뮤테이션
  const incrementStatCount = () =>
    useMutation({
      mutationFn: (mbtiType: MbtiType) => incrementMbtiCount(mbtiType),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [statQueryKey] });
      },
    });

  return {
    getStats,
    getMbtiStat,
    incrementStatCount,
  };
};

export default useStatController;
