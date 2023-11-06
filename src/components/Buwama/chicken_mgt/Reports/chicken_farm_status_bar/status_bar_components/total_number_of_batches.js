import { useEffect, useState } from "react"

const OverallTotalNumberOfBatches= ({ batchData }) => {
    const [totalBatches, setTotalBatches] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (batchData.length > 0) {
            setIsLoading(false)
            setTotalBatches(batchData.length)
        }
      }, [batchData]);
      
    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Total Number of Chicken Batches</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && totalBatches > 0) && <p>{totalBatches} </p>}</p>
        </span>
    )
}

export default OverallTotalNumberOfBatches