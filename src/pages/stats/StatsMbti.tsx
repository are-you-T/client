import React from 'react';
import tw from 'tailwind-styled-components';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// 차트 컴포넌트
interface ResultType {
    type: string;
    value: number;
}

interface ChartItemType {
    title: string;
    result: ResultType[];
}

const testResults: ChartItemType[] = [
    { title: "바쁜 회사 생활을 보낸 당신. 황금 같은 주말을 어떻게 보내려고 할까?", result: [{ type: "E", value: 53 }, {type: "I", value: 47}] },
    { title: "친구와 1시간이 넘는 통화를 마친 뒤 당신의 상태는? ", result: [{ type: "E", value: 36 }, {type: "I", value: 65}] },
    { title: "내가 더 잘 알고 있는 것은?", result: [{ type: "E", value: 71 }, {type: "I", value: 29}] },
];

interface ChartItemProps {
    data: ChartItemType;
    order: number;
}

// result: [{ type: "E", value: 71 }, {type: "I", value: 29}]
function ChartItem({ data, order }: ChartItemProps) {
    const { title, result } = data;
    
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: "100px",
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
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
                formatter: function(val) {
                    return `${val}%`;
                },
                title: {
                    // @ts-ignore
                    formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                        // 해당인덱스의 제목에 접근
                        const title = w.globals.seriesX[0][dataPointIndex];
                        
                        return `${title} : `;
                    }   
                }
            }
        },
        fill: {
            opacity: 1
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: false } }
        },
        legend: {
            show: false
        }
    };

    // name: data: {x, y}
    const displaySeries: ApexAxisChartSeries = [
        {
            name: "dsadsad",
            data: [
                // { x: "1번", y: result[0].value}
                result[0].value
            ]
        },
        {
            name: "dsa",
            data: [
                // { x: "2번", y: result[1].value}
                result[1].value
            ]
        }
    ];

    return (
        <li>
            <p>{order}. {title}</p>
            <Chart type='bar' options={options} series={displaySeries} height={100} />
        </li>
    );
}

// 컨테이너
const Container = tw.main`
    container
    h-full
    bg-black
    text-white
    p-[20px]
    h-auto
`;

const FooterBtn = tw.button`
    bg-[#FFDF3F]
    border-solid
    border-1
    mt-[20px]
    px-[20px]
    py-[20px]
    rounded-[100px]
`;

function StatsMbti() {
    return (
        <Container>
            <div className="flex place-content-between items-center">
                <h3 className="text-5xl font-bold">INTJ</h3>
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
                <ol className='mt-[40px]'>
                    {
                        testResults.map((result, i) => <ChartItem key={i} order={i+1} data={result} />)
                    }
                </ol>
            </section>
            <div className="btns flex flex-col text-3xl text-black font-bold w-full m-auto">
                <FooterBtn>MBTI 통계</FooterBtn>
                <FooterBtn>담벼락 바로가기</FooterBtn>
            </div>
        </Container>
    );
};

export default StatsMbti;