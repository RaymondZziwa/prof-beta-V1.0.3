import { useEffect, useState } from "react"

const MortalityRate = ({ batchData }) => {
    const [mortalityRate, setMortalityRate] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (batchData.length > 0) {
            setIsLoading(false)
            let totalDead = 0;
            let totalChickens = 0;

            for (const batch of batchData) {
                totalDead += batch.chickendead;
                totalChickens += batch.numberofchicken;
            }

            const calculatedMortalityRate = (totalDead / totalChickens) * 100
            setMortalityRate(calculatedMortalityRate.toFixed(2))
        }
      }, [batchData]);
      
    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Mortality Rate %</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{!isLoading && <p>{mortalityRate} </p>}</p>
        </span>
    )
}

export default MortalityRate