import { ApexOptions } from "apexcharts";

export const treeOptions: ApexOptions = {
    legend: {
      show: false,
    },
    chart: {
      type: "treemap",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      colors: ['#000']
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
  };

export const barOptions: ApexOptions = {
    chart: {
        type: 'bar',
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
        y: {
            formatter: (_, { seriesIndex, w }) => {
                const percentage = Math.round(w.globals.seriesPercent[seriesIndex]);
                return `${percentage}%`;
            },
            title: {
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