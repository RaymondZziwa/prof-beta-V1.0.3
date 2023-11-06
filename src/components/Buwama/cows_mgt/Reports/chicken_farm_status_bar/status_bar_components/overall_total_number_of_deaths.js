import { useEffect, useState } from "react"

const OverallTotalNumberOfDeaths= ({ batchData }) => {
    const [totalDeaths, setTotalDeaths] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    
      useEffect(() => {
        if (batchData.length > 0) {
            setIsLoading(false)
            const totalNumberOfChickenDead = batchData.reduce(
                (accumulator, obj) => accumulator + obj.chickendead,
                0
            )

            setTotalDeaths(totalNumberOfChickenDead)
        }
      }, [batchData]);
      
    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Total Number of Chicken Deaths</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{(!isLoading && totalDeaths > 0) && <p>{totalDeaths} </p>}</p>
        </span>
    )
}

export default OverallTotalNumberOfDeaths