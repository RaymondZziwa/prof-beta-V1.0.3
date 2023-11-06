import { useEffect, useState } from "react"

const OverallTotalNumberOfChicken = ({ batchData }) => {
    const [totalChicken, setTotalChicken] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (batchData.length > 0) {
            setIsLoading(false)
            const totalNumberOfChicken = batchData.reduce(
                (accumulator, obj) => accumulator + obj.numberofchicken,
                0
            )

            setTotalChicken(totalNumberOfChicken)
        }
      }, [batchData]);
      
    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Total Number of Chicken</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && totalChicken > 0) && <p> {totalChicken} </p>}</p>
        </span>
    )
}

export default OverallTotalNumberOfChicken