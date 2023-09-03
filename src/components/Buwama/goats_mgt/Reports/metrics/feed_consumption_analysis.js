import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const FeedConsumptionAnalysis = ({ feedingRecords }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const batchTotals = {};
  
      feedingRecords.forEach((record) => {
        const batchNumber = record.batchnumber;
        const quantity = record.feedsquantity;
  
        if (batchTotals.hasOwnProperty(batchNumber)) {
          batchTotals[batchNumber] += quantity;
        } else {
          batchTotals[batchNumber] = quantity;
        }
      });
  
      const batchNumbers = Object.keys(batchTotals);
      const totalQuantities = Object.values(batchTotals);
  
      const chartData = {
        labels: batchNumbers,
        datasets: [
          {
            label: "Total Feeds Used",
            data: totalQuantities,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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
              text: "Total Food Eaten",
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
    }, [feedingRecords]);
  
    return <canvas ref={chartRef} />
}

export default FeedConsumptionAnalysis