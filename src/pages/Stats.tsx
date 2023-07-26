import React from "react";
import ApexCharts from "react-apexcharts";
// import { IoIosStats } from 'react-icons/io';
import styled from "styled-components";
import { Link } from "react-router-dom";

// 차트 데이터를 위한 인터페이스
interface ChartData {
  data: { x: string; y: number }[];
}

// 컴포넌트 상태를 위한 인터페이스
interface ApexChartState {
  series: ChartData[];
  options: ApexCharts.ApexOptions;
}
const StyledApexChart = styled.div`
  #chart {
    width: 390px;
    padding: 10px;
    background: #000000;
    margin-bottom: 20px
  }
  .apexcharts-treemap-rect {
    border-radius: 10px;
    stroke: #000000;
    stroke-width: 10;
  }
`;

const Button = styled.button`
  & {
    width: 320px;
    height: 65px;
    background: #FFDF3F;
    border-radius: 100px;
    font-size:20px;
    margin-top:20px
  }
  & a{
    color: #000;
    font-weight: bold;
  }
  
`;
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
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
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
  return (
    <section className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">MBTI 통계</h3>

      <StyledApexChart>
        <ApexChart />
      </StyledApexChart>

      <Button>
        <Link to="/">MBRI별 통계</Link>
      </Button>

      <Button>
        <Link to="/board">담벼락 바로가기</Link>
      </Button>
    </section>
  );
}