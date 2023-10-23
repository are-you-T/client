import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApexCharts from "react-apexcharts";

import { StatsAll, ResData } from "@/@types";
import MbtiTypesModal from "@/components/common/MbtiTypesModal/MbtiTypesModal";
import axiosRequest from "@/api";
import Character from "@/components/common/Character";
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator";
import { treeOptions } from "@/constants/charts";
import {
  Section,
  StyledApexChart,
  Title,
  ButtonWrap,
  Button
} from "./Stats.styles";

interface ChartData {
  data: { x: string; y: number }[];
}

interface ApexChartFormProps {
  series?: ChartData["data"];
  options: ApexCharts.ApexOptions;
  height: number;
}

function ApexChartForm(props: ApexChartFormProps) {
  const { options, series, height } = props;

  const hasData = series && series.length > 0;

  return (
    <>
      {hasData ? (
        <div id="chart">
          <ApexCharts
            options={options}
            series={[{ data: series }]}
            type="treemap"
            height={height}
          />
        </div>
      ) : (
        <>
          <Character bgcolor={"#00B26E"} gcolor={"#FFA8DF"} />
          <Title>No data</Title>
        </>
      )}
    </>
  );
}

export default function Stats() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats", "mbti"],
    queryFn: () =>
      axiosRequest.requestAxios<ResData<StatsAll[]>>("get", "/stats"),
    select: ({ data }) => {
      return data
        .map((item) => ({ x: item.name, y: item.count }))
        .filter((item) => item.y !== 0)
        .sort((a, b) => b.y - a.y);
    },
    staleTime: 10 * 60 * 1000,
    retry: 3
  });

  const handleClickModal = useCallback(
    ({ currentTarget, target }: React.MouseEvent<HTMLDivElement>) => {
      if (currentTarget === target) {
        setIsOpenModal(false);
      }
    },
    [setIsOpenModal]
  );

  if (isError) {
    alert("데이터를 가져오던 중 에러가 발생했습니다.");
    navigate("/");
  }

  return (
    <Section>
      <h3 className="text-2xl font-bold mb-2 text-white">MBTI 통계</h3>
      <StyledApexChart>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ApexChartForm options={treeOptions} series={data} height={650} />
        )}
      </StyledApexChart>
      <ButtonWrap className={data?.length ? "bg-[#000]" : "bg-[#00B26E]"}>
        <Button onClick={() => setIsOpenModal(true)}>MBTI별 통계</Button>
        <Link
          to="/board"
          className="btn w-80 h-16 bg-yellow-400 text-lg font-bold rounded-full border-0 rounded-full mt-5 text-black"
        >
          담벼락 바로가기
        </Link>
      </ButtonWrap>
      {isOpenModal && (
        <MbtiTypesModal
          isButton
          defaultMbti={["I", "N", "T", "J"]}
          onCloseModal={handleClickModal}
          onSelectMbti={(selectedMbti) =>
            navigate(`/stats/${selectedMbti.join("")}`)
          }
        />
      )}
    </Section>
  );
}
