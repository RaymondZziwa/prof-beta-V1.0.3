import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react";

const ChickenMortalityAnalysis = ({ mortalityData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      // Combine the data for the same batch
      const batchData = {};
      mortalityData.forEach((data) => {
        if (batchData[data.batchnumber]) {
          batchData[data.batchnumber] += data.numberofchickendead;
        } else {
          batchData[data.batchnumber] = data.numberofchickendead;
        }
      });
  
      const batchNumbers = Object.keys(batchData);
      const mortalities = Object.values(batchData);
  
      const chartData = {
        labels: batchNumbers,
        datasets: [
          {
            label: "Mortalities per Batch",
            data: mortalities,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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
              text: "Number of Chickens Dead",
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
    }, [mortalityData]);
  
    return <canvas ref={chartRef} />;
}

export default ChickenMortalityAnalysis