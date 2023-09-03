import { useState, useEffect } from 'react'

const CurrentBatchMortalityRate = ({ batchData }) => {
    const [mortalityRate, setMortalityRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (batchData.length > 0) {
      const getMortalityRateForActiveBatch = (batchData) => {
        const activeBatch = batchData.find((batch) => batch.status === "active");
        if (activeBatch && activeBatch.chickendead && activeBatch.numberofchicken) {
          const deadChickens = activeBatch.chickendead;
          const totalChickens = activeBatch.numberofchicken;
          return (deadChickens / totalChickens) * 100;
        }
        return 0;
      };

      const currentMortalityRate = getMortalityRateForActiveBatch(batchData);
      setMortalityRate(currentMortalityRate);
      setIsLoading(false);
    }
  }, [batchData]);

  return (
    <span style={{ borderRadius: '20px', textAlign: 'center', width: '300px', backgroundColor: 'white', boxShadow: '5px 5px #888888' }}>
      <h3 style={{ padding: '10px', color: 'black' }}>Mortality Rate in Current Batch</h3>
      {!isLoading && (
        <p style={{ fontSize: '30px', color: '#29AB87' }}>{mortalityRate.toFixed(2)}%</p>
      )}
    </span>
  );
}

export default CurrentBatchMortalityRate