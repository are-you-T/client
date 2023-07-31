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
                    // @ts-ignore, 타입 지정이 잘 못 되어있는듯;
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
                <button className='bg-[#0272F1] py-[10px] px-[20px] rounded-[10px] hover:bg-violet-600'>
                    다른 MBTI
                </button>
            </div>
            <section>
                <ol className='mt-[40px]'>
                    {
                        testResults.map((result, i) => <ChartItem key={i} order={i+1} data={result} />)
                    }
                </ol>
            </section>
            <div className="btns flex flex-col text-3xl text-black font-bold w-1/2 m-auto">
                <FooterBtn>검사 다시하기</FooterBtn>
                <FooterBtn>MBTI 통계</FooterBtn>
            </div>
        </Container>
    );
};

export default StatsMbti;