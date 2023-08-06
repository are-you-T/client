import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { styled } from 'styled-components';

/* Chart Options */
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


interface QuestionItem {
    idx: number;
    subject: string;
    answer: {
        [key: string]: string;
    };
    selection: {
        [key: string]: number;
    }
}

interface MbtiStatsByType {
    mbtiType: string;
    parent: string;
    totalResponse: number;
    mbtiData: QuestionItem[];
}

interface IProps {
    data: QuestionItem;
}

const apiResult: MbtiStatsByType = {
    "mbtiType": "ISFJ",
    "parent": "basic",
    "totalResponse": 50,
    "mbtiData": [
        {
            "idx": 1,
            "subject": "바쁜 회사 생활을 보낸 당신. 황금 같은 주말을 어떻게 보내려고 할까?",
            "answer": {
                "I": "주중 회사(실외)였으니 주말엔 집에서 쉬어야지~",
                "E": "주중 회사(실내)였으니 주말엔 밖에 나가서 놀아야지!"
            },
            "selection": {
                "E": 17,
                "I": 33
            }
        },
        {
            "idx": 2,
            "subject": "친구와 1시간이 넘는 통화를 마친 뒤 당신의 상태는?",
            "answer": {
                "E": "남은 얘기는 만나서 해야징ㅎㅎ",
                "I": "휴.. 통화가 끝났으니 이제 쉬어야지.."
            },
            "selection": {
                "E": 20,
                "I": 30
            }
        },
        {
            "idx": 3,
            "subject": "내가 더 잘 알고 있는 것은?",
            "answer": {
                "E": "상대방을 기분 좋게 하는 방법 :D",
                "I": "상대방을 기분 나쁘지 않게 배려하는 방법 :)"
            },
            "selection": {
                "E": 24,
                "I": 26
            }
        },
        {
            "idx": 4,
            "subject": "나는 새로운 사람을 만나면",
            "answer": {
                "I": "누군가 먼저 말을 걸지 않으면 웬만해선 먼저 말을 걸지 않는다.",
                "E": "침묵을 견디지 못하고 무슨 말이라도 걸어 본다."
            },
            "selection": {
                "E": 1,
                "I": 49
            }
        },
        {
            "idx": 5,
            "subject": "비행기를 탔는데 갑자기 흔들린다면?",
            "answer": {
                "S": "비행기가 흔들리네..? 무섭다,, 멀미난다,, ㅜㅜ",
                "N": "비행기가 왜 흔들리지? 낙하산타고 비행기 탈출하는 모습까지 상상함ㅋㅋ"
            },
            "selection": {
                "N": 10,
                "S": 40
            }
        },
        {
            "idx": 6,
            "subject": "밥먹을 때 나는?",
            "answer": {
                "S": "김치찌개와 된장찌개 중 무엇을 먹을지 고민한다.",
                "N": "(점심을 먹으면서) 저녁은 뭐 먹을까??"
            },
            "selection": {
                "N": 25,
                "S": 25
            }
        },
        {
            "idx": 7,
            "subject": "얼마 남지 않은 시험, 공부가 손에 잡히지 않을 때 드는 생각은?",
            "answer": {
                "S": "단기간에 외울 수 있는 방법은 뭐가 있을까?",
                "N": "시험이 없는 세상은 어떨까?"
            },
            "selection": {
                "N": 2,
                "S": 48
            }
        },
        {
            "idx": 8,
            "subject": "달리는 버스 안에서 창밖을 바라보고 있다. 이때 드는 생각은?",
            "answer": {
                "N": "버스 기사님은 매일 보는 이 풍경이 지루하지 않으실까?",
                "S": "와 날씨 좋다! 피크닉 가고 싶네."
            },
            "selection": {
                "N": 22,
                "S": 28
            }
        },
        {
            "idx": 9,
            "subject": "시험이 끝난 후 친구의 한 마디, \"와! 너 열심히 안했는데 성적 이정도면 진짜 재능 있는듯 ㅎㅎ\"",
            "answer": {
                "T": "뭐야 ㅎㅎ 그런가? (칭찬이라고 생각하고 기분 좋음 헤헤)",
                "F": "내가 열심히 했는지 안했는지 너가 어떻게 알아? (기분이.. 나쁘다..)"
            },
            "selection": {
                "F": 24,
                "T": 26
            }
        },
        {
            "idx": 10,
            "subject": "\"다음 주말에 뭐 해?\"라는 말의 의미는?",
            "answer": {
                "T": "주말에 뭐 하는지 궁금해!",
                "F": "약속 없으면 만날 수 있어? 만나자ㅎㅎ"
            },
            "selection": {
                "F": 32,
                "T": 28
            }
        },
        {
            "idx": 11,
            "subject": "\"생각해볼게\"의 진짜 의미는?",
            "answer": {
                "T": "오 괜찮은 것 같은데!? 생각해봐야지ㅎㅎ",
                "F": "그렇게 하기 싫은데.. 바로 거절하면 상처받겠지?"
            },
            "selection": {
                "F": 26,
                "T": 24
            }
        },
        {
            "idx": 12,
            "subject": "\"나 우울해서 머리 잘랐어\"라고 친구에게 연락이 왔다. 이 때 나의 반응은?",
            "answer": {
                "F": "왜 우울해? 무슨 일 있어??",
                "T": "얼마나 잘랐어? 사진 보내봐ㅋㅋ"
            },
            "selection": {
                "F": 30,
                "T": 20
            }
        },
        {
            "idx": 13,
            "subject": "친구들을 집에 초대하고 음식을 준비할때 내 생각은?",
            "answer": {},
            "selection": {
                "J": 30,
                "P": 20
            }
        },
        {
            "idx": 14,
            "subject": "쇼핑중 본인인증 관련 문자가 왔다 문자 확인 후 나의 반응은?",
            "answer": {
                "J": "본인인증 문자는 바로 확인하거나 끝나고 지운다.",
                "P": "본인인증 미리보기로 보고 쌓아둔다"
            },
            "selection": {
                "J": 31,
                "P": 19
            }
        },
        {
            "idx": 15,
            "subject": "약속이 취소되었을 때 나의 반응은?",
            "answer": {
                "J": "아.. 아쉬운데? 다른 약속을 잡아봐야겠다!",
                "P": "아싸! 집에서 쉬어야지~~"
            },
            "selection": {
                "J": 41,
                "P": 9
            }
        },
        {
            "idx": 16,
            "subject": "친구와 제주도 여행을 가기로 했다. 이 때 나는?",
            "answer": {
                "J": "최적의 동선을 생각하고 계획을 세운다.",
                "P": "제주도는 반시계로만 돌면 되지! 지나가다 괜찮은 곳이 있으면 방문한다."
            },
            "selection": {
                "J": 46,
                "P": 4
            }
        }
    ]
}

function ChartItem({ data }: IProps) {
    const { idx, subject, selection } = data;

    const [leftType, rightType] = Object.keys(selection);
    const [leftValue, rightValue] = Object.values(selection);

    const displaySeries: ApexAxisChartSeries = [
        {
            name: leftType,
            data: [leftValue]
        },
        {
            name: rightType,
            data: [rightValue]
        }
    ];

    return (
        <li>
            <p>{idx}. {subject}</p>
            <Chart type='bar' options={chartOptions} series={displaySeries} height={100} />
        </li>
    );
}

const Container = tw.main`
    container
    h-full
    bg-black
    text-white
    p-[20px]
    h-auto
`;

const FooterBtn = tw(Link)`
    bg-[#FFDF3F]
    border-solid
    border-1
    mt-[20px]
    px-[20px]
    py-[20px]
    rounded-[100px]
    text-center
`;

const ChartList = styled.ol`
    & div[type="bar"] {
        color: black;
    }
`;

function StatsMbti() {
    const [res, setRes] = useState<MbtiStatsByType>(apiResult);
    const { mbtiType, mbtiData } = res;

    return (
        <Container>
            <div className="flex place-content-between items-center">
                <h3 className="text-5xl font-bold">{mbtiType}</h3>
                {/* MBTI 변경 버튼 */}
                <button>
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
                    {
                        mbtiData.map((data) => <ChartItem key={data.idx} data={data} />)
                    }
                </ChartList>
            </section>
            <div className="btns flex flex-col text-3xl text-black font-bold w-full m-auto">
                <FooterBtn to="/stats">MBTI 통계</FooterBtn>
                <FooterBtn to="/board">담벼락 바로가기</FooterBtn>
            </div>
        </Container>
    );
};

export default StatsMbti;