import { useState, useCallback, useRef, useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApexCharts from "react-apexcharts";

import { StatsAll, ResData } from "@/@types";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";
import axiosRequest from "@/api";
import Character from "@/components/common/Character";
import LoadingIndicator from "@/components/common/LoadingIndicator";
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

// 컴포넌트 상태를 위한 인터페이스
interface ApexChartFormProps {
  series: ChartData["data"];
  options: ApexCharts.ApexOptions;
  height: number;
}

const options: ApexCharts.ApexOptions = {
  legend: {
    show: false,
  },
  chart: {
    height: 650,
    type: "treemap",
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#0272F1",
    "#B2ACF9",
    "#FFDF3F",
    "#EFC7D6",
    "#9FEEA2",
    "#FC5013",
    "#78D9EE",
    "#FF9D42",
    "#D0F102",
    "#F9BAAC",
    "#3FFFBA",
    "#C7E1EF",
    "#ECEE9F",
    "#13FCEE",
    "#AC78EE",
    "#FF42B3",
  ],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
      useFillColorAsStroke: false,
    },
  },
};

// 클래스 컴포넌트 생성
class ApexChartForm extends Component<ApexChartFormProps> {
  //chart svg속성 변경
  componentDidMount(): void {
    let data = document.querySelectorAll(".apexcharts-treemap-rect");
    data?.forEach((x) => {
      x.setAttribute("stroke", "#000");
    });
  }
  render() {
    const { options, series, height } = this.props;
    if (!series.length)
      return (
        <>
          <Character bgcolor={"#00B26E"} gcolor={"#FFA8DF"} />
          <Title>No data</Title>
        </>
      );
    const seriesData = [{ data: series }];

    return (
      <div id="chart">
        <ApexCharts
          options={options}
          series={seriesData}
          type="treemap"
          height={height}
        />
      </div>
    );
  }
}

export default function Stats() {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState("");
  const [mbtiType, setMbtiType] = useState(["I", "N", "T", "J"]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChartData["data"]>([{ x: "", y: 0 }]);

  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  //모달
  const handleOutsideClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (modalRef.current && modalRef.current === evt.target) {
        setShowModal("");
      }
    },
    [setShowModal]
  );

  //확인버튼
  const mbti = mbtiType.join("");

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResData<StatsAll[]> = await axiosRequest.requestAxios<
          ResData<StatsAll[]>
        >("get", "/stats");

        const scaledData: ChartData["data"] = response.data
          .map((item: StatsAll) => ({ x: item.name, y: item.count }))
          .filter((item) => item.y !== 0)
          .sort((a, b) => b.y - a.y);
        // setData([]); //데이터가 빈 값일때 테스트용
        setData(scaledData);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        alert("데이터를 받아오던 중 에러가 발생했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <h3 className="text-2xl font-bold mb-2 text-white">MBTI 통계</h3>
      <StyledApexChart>
        {isLoading && <LoadingIndicator />}
        {!isLoading && (
          <ApexChartForm options={options} series={data} height={650} />
        )}
      </StyledApexChart>
      <ButtonWrap className={data.length ? "bg-[#000]" : "bg-[#00B26E]"}>
        <Button onClick={() => setShowModal("MbtiTypesModal")}>
          MBTI별 통계
        </Button>

        <Button>
          <Link to="/board">담벼락 바로가기</Link>
        </Button>
      </ButtonWrap>
      {showModal !== "" && (
        <ModalWrap onClick={handleOutsideClick} ref={modalRef}>
          {showModal === "MbtiTypesModal" && (
            <MbtiTypesModal
              selectMbti={mbtiType}
              onThisMbti={handleThisMbti}
              isButton={true}
              onThisConfirm={() => navigate(`/stats/${mbti}`)}
            />
          )}
        </ModalWrap>
      )}
    </Section>
  );
}