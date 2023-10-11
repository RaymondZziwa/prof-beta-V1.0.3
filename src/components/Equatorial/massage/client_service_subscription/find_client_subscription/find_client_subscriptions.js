import { useEffect, useState} from "react"
import axios from "axios"

const FindActiveClientSubscriptions = ({ setClientSubscriptionData }) => {
    const [subscriptionData, setSubscriptionData] = useState([])
    const [clientName, setClientName] = useState('')
    const [fName, setFName] = useState('')
    const [mName, setMName] = useState('')
    const [lName, setLName] = useState('')

    useEffect(()=>{
        const fetchSubscriptionData = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialmassagesubscriptions',{
                token: localStorage.getItem('token')
            })

            if(Array.isArray(res.data)){
                setSubscriptionData(res.data)
            }
        }

        fetchSubscriptionData()
    },[])

    useEffect(()=>{
        setClientName(`${fName.toUpperCase().trim()} ${mName.toUpperCase().trim()} ${lName.toUpperCase().trim()}`)   
    },[fName, mName, lName])

    const dataFilterHandler = event => {
        event.preventDefault()
        if(clientName){
            console.log(clientName)

            const filteredSubscriptionData = subscriptionData.filter(
                (data) => data.clientnames === clientName
              );
              setClientSubscriptionData(filteredSubscriptionData)
        }
    }
    return(
       <>
        <h3 style={{textAlign:'center'}}>Retrieve Active Client Subscriptions</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setFName(event.target.value)}/>
                <label for="floatingInput">First Name</label>
            </div>
            {/* <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setMName(event.target.value)}/>
                <label for="floatingInput">Middle Name</label>
            </div> */}
            <div className="form-floating mb-3" >
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setLName(event.target.value)}/>
                <label for="floatingInput">Last Name</label>
            </div>
            <button className="btn btn-primary" style={{height:'50px'}} onClick={dataFilterHandler}>Retrieve</button>
        </div>
       </>
    )
}

export default FindActiveClientSubscriptions