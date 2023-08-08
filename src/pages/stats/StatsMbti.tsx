import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import axiosReq from '@/api';
import { resData } from '@/interfaces';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import Character from '@/components/common/Character';
import MbtiTypesModal, { ModalBg } from '@/components/common/MbtiTypesModal';

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

const Container = tw.main`
    bg-black
    text-white
    p-[20px]
    w-[390px]
    min-h-[calc(100vh_-_170px)]
    m-auto
`;

const FooterBtn = tw(Link)`
    mb-[15px]
    p-4
    bg-[#FFDF3F]
    border-solid
    border-1
    rounded-[50px]
    font-bold
    text-center
    text-lg
`;

const ChartList = styled.ol`
    & div[type="bar"] {
        color: black;
    }
`;

function Footer({ mbtiType }: { mbtiType: string | undefined }) {
    return (
        <div className="btns flex flex-col text-3xl text-black font-bold w-full m-auto">
            <FooterBtn to="/stats">MBTI 통계</FooterBtn>
            <FooterBtn to={`/board/${mbtiType}`}>담벼락 바로가기</FooterBtn>
        </div>
    );
}

function ChartItem({ data }: { data: QuestionItem }) {
    const { idx, subject, answer, selection } = data;

    const [leftType, rightType] = Object.keys(selection);
    const [leftValue, rightValue] = Object.values(selection);

    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: "100px",
            stacked: true,
            stackType: '100%',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: { horizontal: true },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            x: {
                show: false
            },
            // @ts-ignore
            y: {
                formatter: (_, { seriesIndex, w }) => {
                    const percentage = Math.round(w.globals.seriesPercent[seriesIndex]);
                    return `${percentage}%`;
                },
                title: {
                    // @ts-ignore
                    formatter: (val) => `${val} : `,
                }
            }
        },
        xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        fill: { opacity: 1 },
        grid: { show: false },
        legend: { show: false }
    };

    const displaySeries: ApexAxisChartSeries = [
        { name: leftType, data: [leftValue] },
        { name: rightType, data: [rightValue] }
    ];

    return (
        <li>
            <p>{idx}. {subject}</p>
            <Chart type='bar' options={chartOptions} series={displaySeries} height={100} />
            <ul className="mb-[50px] mt-[-30px] ml-[45px] list-disc">
                <li>{leftType} : {answer[leftType]}</li>
                <li>{rightType} : {answer[rightType]}</li>
            </ul>
        </li>
    ); 
}

function StatsMbti() {
    const navigate = useNavigate();
    const { mbti: currMbti } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState<MbtiStatsByType | null>(null);

    // 모달 관련
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mbtiType, setMbtiType] = useState(currMbti?.toUpperCase().split(""));

    const handleMbtiType = useCallback((value: string[]) => setMbtiType(value), []);

    const onChangeMbtiType = () => {
        setIsOpenModal(false);

        if (mbtiType) {
            navigate(`/stats/${mbtiType.join("")}`);
        }
    };

    const filterStats = useCallback((data: MbtiStatsByType | null) => {
        if (!data) return data;

        data.mbtiData.forEach((question) => {
            const { answer, selection } = question;
            const filteredData: Pick<QuestionItem, 'answer' | 'selection'> = {
                answer: {},
                selection: {}
            };
            
            Object.entries(answer).forEach(([type, val]) => {
                if (val) {
                    filteredData.answer[type] = answer[type];
                    filteredData.selection[type] = selection[type];
                }
            });

            question.answer = filteredData.answer;
            question.selection = filteredData.selection;
        });
    
        return data;
    }, []);

    const fetchStats = async () => {
        setIsLoading(true);

        try {
            const { data } = await axiosReq.requestAxios<resData<MbtiStatsByType>>(
                'get', 
                `/stats/basic/${currMbti?.toUpperCase()}`
            );

            const filteredStats = filterStats(data);
            // setStats(filteredStats);
        } catch (error) {
            alert("데이터를 받아오던 중 에러가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchStats();
    }, [currMbti]);

    if (!currMbti) {
        navigate('/');
    }

    if (isLoading) return <LoadingIndicator />;

    if (!stats) {
        return (
            <Container className='p-0 pt-16 flex flex-col justify-end'>
                <Character bgcolor={"#00B26E"} gcolor={"#FFA8DF"} />
                <div className='bg-[#00B26E] p-[20px] text-center grow'>
                    <h2 className='mb-8 text-6xl text-black font-bold'>No data</h2> 
                    <Footer mbtiType={currMbti} />
                </div>
            </Container>
        );
    }

    return (
        <Container>
            {stats && 
                <>
                {
                    isOpenModal ?
                    <>
                        <ModalBg />
                        <MbtiTypesModal
                            selectMbti={mbtiType || []}
                            onThisMbti={handleMbtiType}
                            isButton={true}
                            onThisConfirm={onChangeMbtiType}
                        />
                    </>
                    : (
                        <>
                            <div className="flex place-content-between items-center">
                                <h3 className="text-5xl font-bold">{stats.mbtiType}</h3>
                                {/* MBTI 변경 버튼 */}
                                <button onClick={() => setIsOpenModal(prev => !prev)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="48"
                                        height="47"
                                        fill="none"
                                    >
                                        <ellipse
                                            cx="23.536"
                                            cy="23.204"
                                            fill="#00B26E"
                                            rx="23.536"
                                            ry="23.204"
                                        />
                                        <path
                                            fill="#000"
                                            d="M19.024 18.303a6.762 6.762 0 0 1 9.523-.042l-1.741 1.737a1.016 1.016 0 0 0 .718 1.733H32.935c.562 0 1.014-.452 1.014-1.014v-5.41a1.016 1.016 0 0 0-1.733-.719l-1.758 1.758c-3.703-3.656-9.667-3.643-13.348.043a9.414 9.414 0 0 0-2.232 3.542 1.352 1.352 0 0 0 2.549.9 6.694 6.694 0 0 1 1.598-2.528Zm-5.363 7.148v5.41a1.016 1.016 0 0 0 1.733.718l1.758-1.758c3.703 3.656 9.667 3.644 13.348-.042a9.443 9.443 0 0 0 2.236-3.538 1.352 1.352 0 0 0-2.549-.9 6.693 6.693 0 0 1-1.597 2.527 6.762 6.762 0 0 1-9.523.043l1.737-1.742a1.016 1.016 0 0 0-.719-1.733h-5.41c-.562 0-1.014.453-1.014 1.015Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <section>
                                <ChartList className='mt-[40px]'>
                                    {stats.mbtiData.map((data) => <ChartItem key={data.idx} data={data} />)}
                                </ChartList>
                            </section>
                            <Footer mbtiType={currMbti} />
                        </>
                    )
                }
                </>
            }
        </Container>
    );
};

export default StatsMbti;