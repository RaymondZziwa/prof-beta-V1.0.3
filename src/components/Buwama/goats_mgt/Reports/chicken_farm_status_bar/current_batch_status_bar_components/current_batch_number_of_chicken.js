import { useState, useEffect } from "react"

const CurrentBatchTotalNumberOfChicken = ({ batchData }) => {
    const [total, setTotal] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (batchData.length > 0) {
            setIsLoading(false)
            const getNumberOfChickensForActiveBatch = (batchData) => {
                const activeBatch = batchData.find((batch) => batch.status === "active");
                return activeBatch ? activeBatch.numberofchicken : 0;
            }
            const numberOfChickens = getNumberOfChickensForActiveBatch(batchData)
            setTotal(numberOfChickens)
        }
      }, [batchData]);

      return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Total Number Of Chicken In Current Batch</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && total > 0) && <p> {total} </p>}</p>
        </span>
    )
}

export default CurrentBatchTotalNumberOfChicken