import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";

import axiosReq from "@/api";
import { ResData } from "@/@types";
import LoadingIndicator from "@/components/common/LoadingIndicator/LoadingIndicator";
import Character from "@/components/common/Character";
import MbtiTypesModal from "@/components/common/MbtiTypesModal/MbtiTypesModal";
import ChangeMbtiBtn from "@/components/board/Button/ChangeMbtiBtn/ChangeMbtiBtn";
import Pagination from "@/components/pagination/Pagination";
import StatsMbtiButtons from "@/components/stats/StatsMbtiButtons/StatsMbtiButtons";
import { barOptions } from "@/constants/charts";
import { Container, Footer, ChartList } from "./StatsMbti.styles";

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
const LIST_SIZE = 10;

const filterInvalidData = (data: MbtiStatsByType) => {
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
};

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
  const { mbti: mbtiType } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const [visibleStats, setVisibleStats] = useState<QuestionItem[]>([]);
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats", MBTI_STATS_PATH[charIdx]],
    queryFn: () =>
      axiosReq.requestAxios<ResData<MbtiStatsByType>>(
        "get",
        `/stats/basic/${mbtiType?.toUpperCase()}/${MBTI_STATS_PATH[charIdx]}`
      ),
    select: ({ data }) => filterInvalidData(data),
    enabled: !!mbtiType,
    staleTime: 10 * 60 * 1000
  });

  const handleModal = ({
    currentTarget,
    target
  }: React.MouseEvent<HTMLDivElement>) => {
    if (currentTarget === target) {
      setIsOpenModal(false);
    }
  };

  const onChangeMbtiType = (selectedMbti: string[]) => {
    setIsOpenModal(false);
    navigate(`/stats/${selectedMbti.join("")}`);
  };

  const changeVisibleStats = (pageNum: number) => {
    if (!stats?.mbtiData) return;

    const visibleData = stats.mbtiData.slice(
      (pageNum - 1) * LIST_SIZE,
      pageNum * LIST_SIZE
    );
    setVisibleStats(visibleData);
  };

  useEffect(() => {
    if (stats) {
      changeVisibleStats(1);
    }
  }, [stats]);

  if (!mbtiType) {
    alert("잘못된 접근입니다.");
    navigate("/");
    return null;
  }

  if (isLoading) return <LoadingIndicator />;

  return (
    <Container hasData={!!stats} isOpenModal={isOpenModal}>
      <section>
        {stats ? (
          <>
            <div className="flex place-content-between items-center py-[20px]">
              <h3 className="text-5xl font-bold">{stats.mbtiType}</h3>
              <ChangeMbtiBtn setOpenMbtiModal={() => setIsOpenModal(true)} />
            </div>
            <StatsMbtiButtons
              targetChar={mbtiType[charIdx]}
              mbtiType={stats.mbtiType}
              onClickType={(idx) => setCharIdx(idx)}
            />
            <ChartList className="mt-[40px]">
              {visibleStats.map((data) => (
                <ChartItem key={data.idx} data={data} />
              ))}
            </ChartList>
            <Pagination
              maxPage={Math.ceil(stats.mbtiData.length / LIST_SIZE)}
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
          <Link to={`/board/${mbtiType}`} className="btn">
            담벼락 바로가기
          </Link>
        </Footer>
        {isOpenModal && mbtiType && (
          <MbtiTypesModal
            isButton
            defaultMbti={mbtiType.toUpperCase().split("")}
            onCloseModal={handleModal}
            onSelectMbti={onChangeMbtiType}
          />
        )}
      </section>
    </Container>
  );
}

export default StatsMbti;
