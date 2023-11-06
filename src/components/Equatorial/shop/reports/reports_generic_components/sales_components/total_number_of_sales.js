import { useEffect, useState } from "react"
import NumberCounter from "../support_components/number_counter"

const TotalNumberOfShopSales = ({ salesData }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [numberOfSales, setNumberOfSales] = useState(0)

    
    useEffect(()=>{
        if(Array.isArray(salesData)){
            setIsLoading(false)
            setNumberOfSales(salesData.length)
        }
    },[])

    return(
        <span style={{ borderRadius:'20px', textAlign:'center', width:'300px', backgroundColor:'white', boxShadow:'5px 5px #888888'}}>
            <h3 style={{padding:'10px', color:'black'}}>Overall Number Of Sales</h3>
            <p style={{fontSize:'30px',color:'#29AB87'}}>{!isLoading && <NumberCounter targetValue={numberOfSales} duration='3000' />}</p>
        </span>
    )
}

export default TotalNumberOfShopSales