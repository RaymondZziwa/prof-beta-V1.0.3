import { useEffect, useState } from "react"
import axios from "axios"

const RecordClientSubscriptionUsage = () => {
    const [services, setServices] = useState([])
    const [serviceOfferedId, setServiceOfferedId] = useState('')
    const [subscriptionId, setSubscriptionId] = useState('')
    const [status, setStatus] = useState('')
    const [amountSpent, setAmountSpent] = useState()
    const [serviceOffered, setServiceOffered] = useState()

    useEffect(()=>{
        const fetchServices = async () => {
                let res = await axios.post('http://82.180.136.230:3005/fetchallmassageservices',{
                token: localStorage.getItem('token')
             })
            if(Array.isArray(res.data)){
                setServices(res.data)
            }
        }
        fetchServices()
    },[])

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status])

    useEffect(()=>{
        if(serviceOfferedId){
            const selectedService = services.filter((data)=>data.productId === serviceOfferedId)
            setServiceOffered(selectedService)
        }
    },[serviceOfferedId, services])

    const saveUsageHandler = async event => {
        event.preventDefault()
        if(serviceOffered){
            let res = await axios.post('http://82.180.136.230:3005/saveclientsubscriptionusage',{
                token: localStorage.getItem('token'),
                serviceId: serviceOfferedId,
                amountSpent: serviceOffered[0].unitPrice,
                date: new Date().toLocaleDateString(),
                subscriptionId: subscriptionId
            })
            .then(() => setStatus({ type: 'success' }))
            .catch((err) => setStatus({ type: 'error', err }))
        }
    }
    return(
        <>
            <h3 style={{textAlign:'center'}}>Record Client Subscription Usage</h3>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} value={new Date().toLocaleDateString()} readOnly/>
                <label for="floatingInput">Date</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setSubscriptionId(event.target.value)}/>
                <label for="floatingInput">Subscription Id</label>
            </div>
            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginBottom:'10px', width:'250px'}} onChange={(event)=> setServiceOfferedId(event.target.value)} required>
                <option selected>Service Offered</option>
                {services ? services.map((service =>(
                    <option key={service.productId} value={service.productId}>{service.productName}</option>
                ))):
                    <option>Options Loading......</option>
                }
            </select>
        </div>
        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveUsageHandler}>Save Usage</button>
        </>
    )
}

export default RecordClientSubscriptionUsage