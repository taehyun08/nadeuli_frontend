import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ data, options }) => {
  // charts series
  const series = [
    {
      name: "Desktops",
      fill: false,
      data,
    },
  ];

  // charts options
  const defaultOptions = {
    chart: {
      //   height: 90,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#fff"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
  };

  const chartOptions = options || defaultOptions;

  return <ApexCharts series={series} options={chartOptions} height={90} />;
};

export default LineChart;
