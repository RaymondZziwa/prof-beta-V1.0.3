import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react";

const BatchFCRAnalysis = ({ fcrData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const batchNumbers = fcrData.map((data) => data.batchnumber);
      const fcrValues = fcrData.map((data) => data.fcrvalue);
  
      const chartData = {
        labels: batchNumbers,
        datasets: [
          {
            label: "FCR per Batch",
            data: fcrValues,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
  
      const chartOptions = {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Batch Number",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "FCR",
            },
          },
        },
      };
  
      const chartConfig = {
        type: "line",
        data: chartData,
        options: chartOptions,
      };
  
      const chart = new Chart(chartRef.current, chartConfig);
  
      return () => {
        chart.destroy();
      };
    }, [fcrData]);
  
    return <canvas ref={chartRef} />;
}

export default BatchFCRAnalysis