import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ManageChickenVaccination = () => {
    const [batchNumber, setBatchNumber] = useState('')
    const [date, setDate] = useState()
    const [status, setStatus] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [itemName, setitemName] = useState('')
    const [reason, setReason] = useState('')
    const [nextDateOfAdministration, setNextDateOfAdministration] = useState()
    const [diseaseName, setDiseaseName] = useState('')
    const [drugAmount, setDrugAmount] = useState()

    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState()

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }

    const drugAmountHandler = event => {
        event.preventDefault()
        setDrugAmount(event.target.value)
    }

    const nextDate = event => {
        event.preventDefault()
        setNextDateOfAdministration(event.target.value)
    }

    const reasonInput = event => {
        event.preventDefault()
        setReason(event.target.value)
    }

    const diseaseNameInput = event => {
        event.preventDefault()
        setDiseaseName(event.target.value)
    }

    const batchNumberInput = event => {
        event.preventDefault()
        setBatchNumber(event.target.value)
    }


    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setDate(date)
    },[])

    const fetchRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchchickenhealthrecords', {
            token: localStorage.getItem("token"),
            batchNumber: batchNumber
        })
        console.log('fff', res.data)
        if(Array.isArray(res.data)){
            setRecords(res.data)
            setAreRecordsLoading(false)
        }
    }

    useEffect(()=>{
        fetchRecords()
    },[batchNumber])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallchickenmedicines', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setIsItemLoading(false)
    }

    useEffect(()=>{
        fetchItems()
    },[])

    const saveChickenDeathRecord = async (event) => {
        event.preventDefault()
       // console.log('dta', drugAmount)
        let res = await axios.post('http://82.180.136.230:3005/savechickenhealthrecord',{
            token: localStorage.getItem('token'),
            batchNumber: batchNumber,
            reason: reason,
            date: date, 
            nextDateOfAdministration: nextDateOfAdministration,
            medicineId: itemName,
            medicineQuantity: drugAmount,
            diseaseName: diseaseName,
            notes: moreInfo
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }


    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Chicken Batch Health Manager</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={batchNumberInput} required />
                    <label for="floatingInput">Batch Number</label>
                </div><br></br>

                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={reasonInput} required>
                    <option defaultValue>Reason for medicine application</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="treatment">Treatment</option> 
                </select><br></br>

                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={date} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div><br></br>

                <div className="form-floating mb-3">
                    <input type='date' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={nextDate} required />
                    <label htmlFor="floatingInput">Next Date Of Vaccination/ Treatment</label>
                </div><br></br>

                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={itemNameInput} required>
                    <option selected>Medicine Name</option>
                        { isItemListLoading ? <option>Loading Items From Database</option> :
                            itemList.map(item => (
                                <option key={item.productId} value={item.productId}>
                                    {item.productName}
                                </option>
                            ))
                        }
                </select><br></br>

                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={drugAmountHandler} required />
                    <label for="floatingInput">Medicine Quantity Used</label>
                </div><br></br>
                
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={diseaseNameInput} required />
                    <label for="floatingInput">Disease Name</label>
                </div>
                <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                </div>
                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveChickenDeathRecord}>
                    Save Health Record
                </button>
                <h1 style={{textAlign:'center'}}>Chicken Batch Health Monitoring Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Reason</th>
                                <th scope="col">Date</th>
                                <th scope="col">next treatment date</th>
                                <th scope="col">Medicine Name</th>
                                <th scope="col">Disease Name</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                records.map(item => (
                                    <tr>
                                        <td>{item.reason}</td>
                                        <td>{item.treatmentdate}</td>
                                        <td>{item.nextdateofadministration}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.diseasename}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default ManageChickenVaccination