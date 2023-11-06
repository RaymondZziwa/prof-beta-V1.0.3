import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const MedicineConsumptionAnalysis = ({ medicineRecords }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const batchTotals = {};
  
      medicineRecords.forEach((record) => {
        const batchNumber = record.batchnumber;
        const quantityUsed = record.medicinequantityused;
  
        if (batchTotals.hasOwnProperty(batchNumber)) {
          batchTotals[batchNumber] += quantityUsed;
        } else {
          batchTotals[batchNumber] = quantityUsed;
        }
      });
  
      const batchNumbers = Object.keys(batchTotals);
      const totalQuantities = Object.values(batchTotals);
  
      const chartData = {
        labels: batchNumbers,
        datasets: [
          {
            label: "Quantity of Medicine Used",
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
              text: "Quantity of Medicine Used",
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
    }, [medicineRecords]);
  
    return <canvas ref={chartRef} />;
}

export default MedicineConsumptionAnalysis