import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const EggProductionAnalysis = ({ eggRecords }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const batchNumbersSet = new Set();
      const totalEggs = [];
      const totalGoodEggs = [];
      const totalBadEggs = [];
  
      eggRecords.forEach((record) => {
        if (!batchNumbersSet.has(record.batchnumber)) {
          batchNumbersSet.add(record.batchnumber);
          totalEggs.push(record.totaleggscollected);
          totalGoodEggs.push(record.totalgoodeggscollected);
          totalBadEggs.push(record.totaldamagedeggscollected);
        }
      });
  
      const batchNumbers = Array.from(batchNumbersSet);
  
      const chartData = {
        labels: batchNumbers,
        datasets: [
          {
            label: "Total Eggs",
            data: totalEggs,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Total Good Eggs",
            data: totalGoodEggs,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Total Bad Eggs",
            data: totalBadEggs,
            backgroundColor:"rgba(255, 99, 132, 0.2)",
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
              text: "Number of Eggs",
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
    }, [eggRecords]);
  
    return <canvas ref={chartRef} />;
}

export default EggProductionAnalysis