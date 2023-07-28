import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
// import tw from "tailwind-styled-components";
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
    margin-bottom: 20px;
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
    background: #ffdf3f;
    border-radius: 100px;
    font-size: 20px;
    margin-top: 20px;
  }
  & a {
    color: #000;
    font-weight: bold;
  }
`;

const Secton = styled.section`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #000;
  }
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 390px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  position: absolute;
  background: transparent;
  right: 0;
`;
const Title = styled.h2`
  font-size: 20px;
  color: #000;
  font-weight: bold;
`;

const CloseIcon = styled(IoCloseSharp)`
  color: #000;
  font-size: 40px;
`;

const BtnCon = styled.div`
  width:280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 0.8;
  justify-content: center;
  gap: 20px;
`;
const ToggleContainer = styled.div`
  border-radius: 50px;
  overflow: hidden;
  width:280px;
  height: 90px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleBtn = styled.button<{ selected: boolean; color: string }>`
  font-size: 40px;
  font-weight: bold;
  position: relative;
  width: 130px;
  height: 75px;
  background-color: ${(props) => (props.selected ? "#B2ACF9" : "#000")};
  color: ${(props) => (props.selected ? props.color : "#FFFFFF")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:first-child {
    border-radius: 50px
  }
  &:last-child {
    border-radius: 50px
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
  const [moodalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(["I", "N", "F", "P"]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleOption = (index: number, option: string) => {
    setSelectedOption((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = option;
      return newOptions;
    });
  };

  return (
    <Secton>
      <h3 className="text-2xl font-bold mb-2">MBTI 통계</h3>

      <StyledApexChart>
        <ApexChart />
      </StyledApexChart>

      <Button onClick={openModal}>
        <Link to="">MBTI별 통계</Link>
      </Button>

      <Button>
        <Link to="/board">담벼락 바로가기</Link>
      </Button>

      {moodalOpen && (
        <ModalContainer>
          <ModalContent>
            <Title>MBTI 선택</Title>
            <CloseButton onClick={closeModal}>
              <CloseIcon />
            </CloseButton>
            <BtnCon>
              <ToggleContainer>
                <ToggleBtn
                  selected={selectedOption[0] === "I"}
                  color="#000"
                  onClick={() => toggleOption(0, "I")}
                >
                  I
                </ToggleBtn>
                <ToggleBtn
                  selected={selectedOption[0] === "E"}
                  color="#000"
                  onClick={() => toggleOption(0, "E")}
                >
                  E
                </ToggleBtn>
              </ToggleContainer>
              <ToggleContainer>
                <ToggleBtn
                  selected={selectedOption[1] === "N"}
                  color="#000"
                  onClick={() => toggleOption(1, "N")}
                >
                  N
                </ToggleBtn>
                <ToggleBtn
                  selected={selectedOption[1] === "S"}
                  color="#000"
                  onClick={() => toggleOption(1, "S")}
                >
                  S
                </ToggleBtn>
              </ToggleContainer>
              <ToggleContainer>
                <ToggleBtn
                  selected={selectedOption[2] === "F"}
                  color="#000"
                  onClick={() => toggleOption(2, "F")}
                >
                  F
                </ToggleBtn>
                <ToggleBtn
                  selected={selectedOption[2] === "T"}
                  color="#000"
                  onClick={() => toggleOption(2, "T")}
                >
                  T
                </ToggleBtn>
              </ToggleContainer>
              <ToggleContainer>
                <ToggleBtn
                  selected={selectedOption[3] === "P"}
                  color="#000"
                  onClick={() => toggleOption(3, "P")}
                >
                  P
                </ToggleBtn>
                <ToggleBtn
                  selected={selectedOption[3] === "J"}
                  color="#000"
                  onClick={() => toggleOption(3, "J")}
                >
                  J
                </ToggleBtn>
              </ToggleContainer>
            </BtnCon>
          </ModalContent>
        </ModalContainer>
      )}
    </Secton>
  );
}
