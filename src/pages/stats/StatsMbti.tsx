import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';

import axiosReq from '@/api';
import { ResData } from '@/@types';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import Character from '@/components/common/Character';
import MbtiTypesModal from '@/components/common/MbtiTypesModal';
import { barOptions } from '@/constants/charts';
import { ReactComponent as SwitchIcon } from "@/assets/img/typeSwitch_icon.svg";
import {
    Container,
    Footer,
    ChartList,
    ModalWrapper
} from './StatsMbti.styles';

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

function ChartItem({ data }: { data: QuestionItem }) {
    const { subject, answer, selection } = data;

    const [leftType, rightType] = Object.keys(selection);
    const [leftValue, rightValue] = Object.values(selection);

    const displaySeries: ApexAxisChartSeries = [
        { name: leftType, data: [leftValue] },
        { name: rightType, data: [rightValue] }
    ];

    return (
        <li className='list-inside'>
            <span>{subject}</span>
            <Chart type='bar' options={barOptions} series={displaySeries} width={'100%'} height={100} />
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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [mbtiType, setMbtiType] = useState(currMbti?.toUpperCase().split(""));

    const handleMbtiType = useCallback((value: string[]) => setMbtiType(value), []);

    const handleModal = ({ currentTarget, target }: React.MouseEvent<HTMLDivElement>) => {
        if (currentTarget === target) {
            setIsOpenModal(false);
        }
    }

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

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const { data } = await axiosReq.requestAxios<ResData<MbtiStatsByType>>(
                    'get', 
                    `/stats/basic/${currMbti?.toUpperCase()}`
                );
    
                const filteredStats = filterStats(data);
                setStats(filteredStats);
            } catch (error) {
                alert("데이터를 받아오던 중 에러가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [currMbti]);

    if (!currMbti) {
        navigate('/');
        return null;
    }

    if (isLoading) return <LoadingIndicator />;

    return (
        <Container hasData={!!stats} isOpenModal={isOpenModal}>
            <section>
            {
                stats ? (
                    <>
                        <div className="flex place-content-between items-center px-[20px] pt-[20px]">
                            <h3 className="text-5xl font-bold">{stats.mbtiType}</h3>
                            <button 
                                className="flex justify-center items-center bg-[#02B26E] w-14 h-14 radius rounded-full" 
                                onClick={() => setIsOpenModal(prev => !prev)}
                            >
                                <SwitchIcon />
                            </button>
                        </div>
                        <div className='px-[20px]'>
                            <ChartList className='mt-[40px]'>
                                {stats.mbtiData.map((data) => <ChartItem key={data.idx} data={data} />)}
                            </ChartList>
                        </div>
                    </>
                ) : <Character bgcolor="#00B26E" gcolor="#FFA8DF" />
            }
            <Footer hasData={!!stats}>
                {!stats && <h2 className='no-data'>No data</h2>}
                <Link to="/stats">MBTI 통계</Link>
                <Link to={`/board/${currMbti}`}>담벼락 바로가기</Link>
            </Footer>
            {
                isOpenModal &&
                <ModalWrapper onClick={handleModal}>
                    <MbtiTypesModal
                        isButton
                        selectMbti={mbtiType || []}
                        onThisMbti={handleMbtiType}
                        onThisConfirm={onChangeMbtiType}
                    />
                </ModalWrapper>
            }
            </section>
        </Container>
    );
};

export default StatsMbti;