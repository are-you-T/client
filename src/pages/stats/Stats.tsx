import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApexCharts from "react-apexcharts";

import { StatsAll, ResData } from "@/@types";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";
import axiosRequest from "@/api";
import Character from "@/components/common/Character";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { treeOptions } from "@/constants/charts";
import {  
  Section,
  StyledApexChart,
  Title,
  ButtonWrap,
  Button,
  ModalWrap
} from './Stats.styles';

interface ChartData {
  data: { x: string; y: number }[];
}

interface ApexChartFormProps {
  series: ChartData["data"];
  options: ApexCharts.ApexOptions;
  height: number;
}

function ApexChartForm(props: ApexChartFormProps) {
  const { options, series, height } = props;

  useEffect(() => {
    const data = document.querySelectorAll(".apexcharts-treemap-rect");
    data?.forEach((x) => {
      x.setAttribute("stroke", "#000");
    });
  }, [props]);

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
        )
      }
    </>
  );
}

export default function Stats() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mbtiType, setMbtiType] = useState(["I", "N", "T", "J"]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ChartData["data"]>([{ x: "", y: 0 }]);

  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  const handleClickModal = useCallback(
    ({ currentTarget, target }: React.MouseEvent<HTMLDivElement>) => {
      if (currentTarget === target) {
        setIsOpenModal(false);
      }
    },
    [setIsOpenModal]
  );

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        
        const response = await axiosRequest.requestAxios<ResData<StatsAll[]>>("get", "/stats");

        const scaledData = response.data
          .map((item) => ({ x: item.name, y: item.count }))
          .filter((item) => item.y !== 0)
          .sort((a, b) => b.y - a.y);

        setData(scaledData);
      } catch (error) {
        alert("데이터를 받아오던 중 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const mbti = mbtiType.join("");

  return (
    <Section>
      <h3 className="text-2xl font-bold mb-2 text-white">MBTI 통계</h3>
      <StyledApexChart>
        {isLoading ? <LoadingIndicator /> : <ApexChartForm options={treeOptions} series={data} height={650} />}
      </StyledApexChart>
      <ButtonWrap className={data.length ? "bg-[#000]" : "bg-[#00B26E]"}>
        <Button onClick={() => setIsOpenModal(true)}>
          MBTI별 통계
        </Button>
        <Link 
          to="/board" 
          className="flex justify-center items-center w-80 h-16 bg-yellow-400 rounded-full text-lg mt-5 font-bold text-black"
        >
          담벼락 바로가기
        </Link>
      </ButtonWrap>
      {isOpenModal && (
        <ModalWrap onClick={handleClickModal}>
            <MbtiTypesModal
              isButton
              selectMbti={mbtiType}
              onThisMbti={handleThisMbti}
              onThisConfirm={() => navigate(`/stats/${mbti}`)}
            />
        </ModalWrap>
      )}
    </Section>
  );
}