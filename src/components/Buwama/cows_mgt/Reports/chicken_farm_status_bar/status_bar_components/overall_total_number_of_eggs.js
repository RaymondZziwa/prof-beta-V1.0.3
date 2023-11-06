import { useState, useEffect } from "react"

const OverallTotalNumberOfEggs = ({ eggRecords }) => {
    const [total, setTotal] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (eggRecords.length > 0) {
            setIsLoading(false)
            const totalEggs = eggRecords.reduce((sum, batch) => sum + batch.totaleggscollected, 0)
            setTotal(totalEggs)
        }
      }, [eggRecords]);

      return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Total Number of Eggs</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && total > 0) && <p> {total} </p>}</p>
        </span>
    )
}

export default OverallTotalNumberOfEggs