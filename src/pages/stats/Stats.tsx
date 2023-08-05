import React, { useState, useCallback, useEffect, useRef } from "react";
import ApexCharts from "react-apexcharts";
import tw from "tailwind-styled-components";
import { Link, useNavigate } from "react-router-dom";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";
import { stats, resData } from "@/interfaces";
import axiosRequest from "@/api";
import Character from "@/components/common/Character";
// import { error } from "console";

// 차트 데이터를 위한 인터페이스
interface ChartData {
  data: { x: string; y: number }[];
}

// 컴포넌트 상태를 위한 인터페이스
interface ApexChartState {
  series: ChartData[];
  options: ApexCharts.ApexOptions;
}

//map 함수 데이터 가공
// 클래스 컴포넌트 생성
class ApexChart extends React.Component<{}, ApexChartState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            {
              x: "ISFJ",
              y: 200,
            },
            {
              x: "ISTJ",
              y: 149,
            },
            {
              x: "INFP",
              y: 184,
            },
            {
              x: "INFJ",
              y: 55,
            },
            {
              x: "ENFP",
              y: 84,
            },
            {
              x: "ISFP",
              y: 31,
            },
            {
              x: "ENFJ",
              y: 70,
            },
            {
              x: "ESFJ",
              y: 30,
            },
            {
              x: "ESTJ",
              y: 44,
            },
            {
              x: "ISTP",
              y: 68,
            },
            {
              x: "INTJ",
              y: 28,
            },
            {
              x: "ESFP",
              y: 19,
            },
            {
              x: "INTP",
              y: 29,
            },
            {
              x: "ENTJ",
              y: 29,
            },
            {
              x: "ENTP",
              y: 29,
            },
            {
              x: "ESTP",
              y: 29,
            },
          ],
        },
      ],
      options: {
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
      },
    };
  }
  //chart svg속성 변경
  componentDidMount(): void {
    let data = document.querySelectorAll(".apexcharts-treemap-rect");
    data?.forEach((x) => {
      x.setAttribute("rx", "70");
      x.setAttribute("ry", "70");
      x.setAttribute("stroke", "#000");
      x.setAttribute("stroke-width", "8");
    });
  }
  render() {
    console.log("render");
    return (
      <div id="chart">
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type="treemap"
          height={650}
        />
      </div>
    );
  }
}

export default function Stats() {
  const [showModal, setShowModal] = useState("");
  const [mbtiType, setMbtiType] = useState(["I", "N", "T", "J"]);
  const [data, setData] = useState<stats | null>(null);

  const handleThisMbti = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  //모달
  const modalRef = useRef(null);
  const handleOutsideClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (modalRef.current && modalRef.current === evt.target) {
        setShowModal("");
      }
    },
    [setShowModal]
  );

  //확인버튼
  const navigate = useNavigate();
  const mbti = mbtiType.join("");

  //api
  useEffect(() => {
    async function fetchData() {
      try {
        const response: resData<stats> = await axiosRequest.requestAxios<
          resData<stats>
        >("get", "/stats");
        setData(response.data); //데이터를 상태에 저장 주석처리하면 null값
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);
  console.log("DATA", data);

  if (data === null) return <Character bgcolor={"#808080"} gcolor={"#666"} />;

  return (
    <Secton>
      <h3 className="text-2xl font-bold mb-2 text-white">MBTI 통계</h3>
      <StyledApexChart>
        <ApexChart />
      </StyledApexChart>
      <Button onClick={() => setShowModal("MbtiTypesModal")}>
        MBTI별 통계
      </Button>

      <Button>
        <Link to="/board">담벼락 바로가기</Link>
      </Button>

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
    </Secton>
  );
}

//Style
const Secton = tw.section`
  flex
  flex-col
  items-center
  bg-black
  pt-10
  pb-10
`;

const StyledApexChart = tw.div`
    w-96
    p-4
    bg-black
    rounded-2xl
    stroke-10
`;

const Button = tw.button`
  w-80
  h-16
  bg-yellow-400
  rounded-full
  text-lg
  mt-5
  font-bold
  text-black
`;

const ModalWrap = tw.div`
fixed
top-0
left-0
w-full
h-full
bg-black
bg-black/[.3]
backdrop-blur-sm
z-50
flex
items-center
justify-center
`;
