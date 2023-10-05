import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";

import axiosReq from "@/api";
import { ResData } from "@/@types";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import Character from "@/components/common/Character";
import MbtiTypesModal from "@/components/common/MbtiTypesModal";
import ChangeMbtiBtn from "@/components/board/Button/ChangeMbtiBtn/ChangeMbtiBtn";
import Pagination from "@/components/pagination/Pagination";
import StatsMbtiButtons from "@/components/stats/StatsMbtiButtons/StatsMbtiButtons";
import { barOptions } from "@/constants/charts";
import { Container, Footer, ChartList, ModalWrapper } from "./StatsMbti.styles";

interface QuestionItem {
  idx: number;
  subject: string;
  answer: {
    [key: string]: string;
  };
  selection: {
    [key: string]: number;
  };
}

interface MbtiStatsByType {
  mbtiType: string;
  parent: string;
  totalResponse: number;
  mbtiData: QuestionItem[];
}

const MBTI_STATS_PATH = ["energy", "awareness", "judgement", "life"];

function ChartItem({ data }: { data: QuestionItem }) {
  const { subject, answer, selection } = data;

  const [leftType, rightType] = Object.keys(selection);
  const [leftValue, rightValue] = Object.values(selection);

  const displaySeries: ApexAxisChartSeries = [
    { name: leftType, data: [leftValue] },
    { name: rightType, data: [rightValue] }
  ];

  return (
    <li className="list-inside">
      <span>{subject}</span>
      <Chart
        type="bar"
        options={barOptions}
        series={displaySeries}
        width={"100%"}
        height={100}
      />
      <ul className="mb-[50px] mt-[-30px] ml-[45px] list-disc">
        <li>
          {leftType} : {answer[leftType]}
        </li>
        <li>
          {rightType} : {answer[rightType]}
        </li>
      </ul>
    </li>
  );
}

function StatsMbti() {
  const navigate = useNavigate();
  const { mbti: currMbti } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<MbtiStatsByType | null>(null);
  const [visibleStats, setVisibleStats] = useState<QuestionItem[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mbtiType, setMbtiType] = useState(currMbti?.toUpperCase().split(""));
  const [visibleChar, setVisibleChar] = useState(mbtiType ? mbtiType[0] : null);

  const handleMbtiType = useCallback(
    (value: string[]) => setMbtiType(value),
    []
  );

  const handleModal = ({
    currentTarget,
    target
  }: React.MouseEvent<HTMLDivElement>) => {
    if (currentTarget === target) {
      setIsOpenModal(false);
    }
  };

  const onChangeMbtiType = () => {
    setIsOpenModal(false);

    if (mbtiType) {
      navigate(`/stats/${mbtiType.join("")}`);
    }
  };

  const changeVisibleStats = (pageNum: number) => {
    if (!stats?.mbtiData) return;

    const visibleData = stats.mbtiData.slice((pageNum - 1) * 10, pageNum * 10);
    setVisibleStats(visibleData);
  };

  const filterValidData = useCallback((data: MbtiStatsByType) => {
    data.mbtiData.forEach((question) => {
      const filteredData: Pick<QuestionItem, "answer" | "selection"> = {
        answer: {},
        selection: {}
      };

      Object.entries(question.answer).forEach(([type, val]) => {
        if (val) {
          filteredData.answer[type] = question.answer[type];
          filteredData.selection[type] = question.selection[type];
        }
      });

      question.answer = filteredData.answer;
      question.selection = filteredData.selection;
    });

    return data;
  }, []);

  const getMbtiStats = async (mbtiCharIdx: number) => {
    const targetPath = MBTI_STATS_PATH[mbtiCharIdx];

    if (!targetPath || !currMbti || !mbtiType) return;

    try {
      setIsLoading(true);

      const { data } = await axiosReq.requestAxios<ResData<MbtiStatsByType>>(
        "get",
        `/stats/basic/${currMbti.toUpperCase()}/${targetPath}`
      );

      const filteredStats = filterValidData(data);

      setVisibleChar(mbtiType[mbtiCharIdx]);
      setStats(filteredStats);
      setVisibleStats(filteredStats.mbtiData.slice(0, 11)); // 변수로 수정 필요
    } catch (error) {
      alert("데이터를 받아오던 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMbtiStats(0);
  }, [currMbti]);

  if (!currMbti) {
    navigate("/");
    return null;
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <Container hasData={!!stats} isOpenModal={isOpenModal}>
      <section>
        {stats ? (
          <>
            <div className="flex place-content-between items-center px-[20px] pt-[20px]">
              <h3 className="text-5xl font-bold">{stats.mbtiType}</h3>
              <ChangeMbtiBtn setOpenMbtiModal={() => setIsOpenModal(true)} />
            </div>
            <StatsMbtiButtons
              targetChar={visibleChar || ""}
              mbtiType={stats.mbtiType}
              onClickType={getMbtiStats}
            />
            <div className="px-[20px]">
              <ChartList className="mt-[40px]">
                {visibleStats.map((data) => (
                  <ChartItem key={data.idx} data={data} />
                ))}
              </ChartList>
            </div>
            <Pagination
              maxPage={Math.ceil(stats.mbtiData.length / 10)}
              onChangePage={changeVisibleStats}
            />
          </>
        ) : (
          <Character bgcolor="#00B26E" gcolor="#FFA8DF" />
        )}
        <Footer hasData={!!stats}>
          {!stats && <h2 className="no-data">No data</h2>}
          <Link to="/stats" className="btn">
            MBTI 통계
          </Link>
          <Link to={`/board/${currMbti}`} className="btn">
            담벼락 바로가기
          </Link>
        </Footer>
        {isOpenModal && (
          <ModalWrapper onClick={handleModal}>
            <MbtiTypesModal
              isButton
              selectMbti={mbtiType || []}
              onThisMbti={handleMbtiType}
              onThisConfirm={onChangeMbtiType}
            />
          </ModalWrapper>
        )}
      </section>
    </Container>
  );
}

export default StatsMbti;
