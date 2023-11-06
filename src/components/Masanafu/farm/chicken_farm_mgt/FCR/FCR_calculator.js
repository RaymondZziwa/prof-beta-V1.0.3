import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const FCRCalculator = () => {
    const [totalFeedsConsumed, setTotalFeedsConsumed] = useState(0);
    const [totalEggsProduced, setTotalEggsProduced] = useState(0);
    const [fcr, setFCR] = useState(0);
    const [batchNumber, setBatchNumber] = useState(1);
    const [status, setStatus] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState([])

    const [areEggRecordsLoading, setAreEggRecordsLoading] = useState(true)
    const [eggRecords, setEggRecords] = useState([])


    const batchNumberInput = event => {
        event.preventDefault()
        setBatchNumber(event.target.value)
    }

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }



    const fetchFeedingRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallfeedingrecords', {
            token: localStorage.getItem("token")
        })
        //console.log('fff', res.data)
        if(Array.isArray(res.data)){
            setRecords(res.data)
            setAreRecordsLoading(false)
        }
    }

    const fetchEggProductionRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchalleggproduction', {
            token: localStorage.getItem("token")
        })
        //console.log('fff', res.data)
        if(Array.isArray(res.data)){
            setEggRecords(res.data)
            setAreEggRecordsLoading(false)
        }
    }

    useEffect(()=>{
        fetchEggProductionRecords()
        fetchFeedingRecords()
    },[])

    const calculateTotalFeedsConsumed = (batchNumber) => {
        let overallQuantity = 0;
    
        for (const data of records) {
          if (data.batchnumber === batchNumber) {
            overallQuantity += data.feedsquantity;
          }
        }
        console.log('ovv', overallQuantity)
    
        setTotalFeedsConsumed(overallQuantity);
    }

    const calculateTotalEggsProduced = (batchNumber) => {
        let overallQuantity = 0;
    
        for (const data of eggRecords) {
          if (data.batchnumber === batchNumber) {
            overallQuantity += data.totaleggscollected
          }
        }
        console.log('ovv', overallQuantity)
    
        setTotalEggsProduced(overallQuantity);
    }

    useEffect(()=>{
        calculateTotalEggsProduced(batchNumber)
        calculateTotalFeedsConsumed(batchNumber)
    },[batchNumber])





    const calculateFCR = (totalEggsProduced, totalFeedsConsumed) => {
        
        if (totalEggsProduced === 0) {
            setFCR(0) // Avoid division by zero if no eggs are produced
        }
        setFCR((totalFeedsConsumed / totalEggsProduced).toFixed(2))
    }

    useEffect(()=>{
        calculateFCR(totalEggsProduced, totalFeedsConsumed)
    },[batchNumber, totalEggsProduced, totalFeedsConsumed])
  
    const saveFCRValue = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/savebatchfcrvalue',{
            token: localStorage.getItem('token'),
            batchNumber: batchNumber,
            totalFeedsConsumed: totalFeedsConsumed,
            totalEggsProduced: totalEggsProduced,
            fcrValue: fcr,
            notes: moreInfo
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }
    return (
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
            <h1 style={{textAlign:'center'}}>Calculate Batch Feed Conversion Ratio</h1>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <div className="form-floating mb-3">
                <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={batchNumberInput} required />
                <label for="floatingInput">Chicken Batch Number</label>
            </div><br></br>
            <div className="form-floating mb-3">
                <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required value={totalFeedsConsumed} min='0' readOnly/>
                <label htmlFor="floatingInput">Total Feeds Quantity Consumed (kg):</label>
            </div><br></br>
            <div className="form-floating mb-3">
                <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required value={totalEggsProduced} min='0' readOnly/>
                <label htmlFor="floatingInput">Total Eggs Produced By Batch</label>
            </div><br></br>
            <div className="form-floating mb-3">
                <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required value={fcr} min='0' readOnly/>
                <label htmlFor="floatingInput">Feed Conversion Ratio</label>
            </div><br></br>

            <div className="mb-3">
                <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
            </div>
            <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveFCRValue}>
                Mark Batch Cycle As Completed And calculate FCR
            </button>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'></Col>
    </Row>
    )
}

export default FCRCalculator