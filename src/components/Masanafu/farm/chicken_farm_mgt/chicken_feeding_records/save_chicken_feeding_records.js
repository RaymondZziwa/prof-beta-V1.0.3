import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SaveChickenFeedingRecords = () => {
    const [date, setDate] = useState()
    const [batchNumber, setBatchNumber] = useState('')
    const [itemName, setitemName] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [status, setStatus] = useState('')
    const [quantity, setQuantity] = useState()
    const [moreInfo, setMoreInfo] = useState('')
    const [mUnits, setMUnits] = useState('')

    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState()

    const quantityHandler = event => {
        event.preventDefault()
        setQuantity(event.target.value)
    }

    const batchNumberInput = event => {
        event.preventDefault()
        setBatchNumber(event.target.value)
    }

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }

    const mUnitsHandler = event => {
        event.preventDefault()
        setMUnits(event.target.value)
    }

    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setDate(date)
    },[])

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallchickenfeeds', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setIsItemLoading(false)
    }

    useEffect(()=>{
        fetchItems()
    },[])


    const fetchFeedingRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchbatchfeedingrecords', {
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
        fetchFeedingRecords()
    },[batchNumber])

    const saveBatchFeedingRecord = async (event) => {
        event.preventDefault()
       // console.log('dta', drugAmount)
        let res = await axios.post('http://82.180.136.230:3005/savebatchfeedingrecord',{
            token: localStorage.getItem('token'),
            batchNumber: batchNumber,
            date: date, 
            feedsId: itemName,
            quantity: quantity,
            munits: mUnits,
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
                <h1 style={{textAlign:'center'}}>Chicken Batch Feeding Manager</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}

                <div className="form-floating mb-3">
                    <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={batchNumberInput} required />
                    <label for="floatingInput">Batch Number</label>
                </div><br></br>

                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={date} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div><br></br>

                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={itemNameInput} required>
                    <option selected>Feeds Name</option>
                        { isItemListLoading ? <option>Loading Items From Database</option> :
                            itemList.map(item => (
                                <option key={item.productId} value={item.productId}>
                                    {item.productName}
                                </option>
                            ))
                        }
                </select><br></br>

                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={quantityHandler} required />
                    <label for="floatingInput">Feeds Quantity</label>
                </div><br></br>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={mUnitsHandler} required>
                    <option selected>Select Unit Of Measurement</option> 
                    <option value='Kgs'>Kilograms</option>    
                    {/* <option value='Grams'>Grams</option>  */}
                </select>
                
                <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                </div>

                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveBatchFeedingRecord}>
                    Save Feeding Record
                </button>

                <h1 style={{textAlign:'center'}}>Chicken Batch Feeding Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Feeds Name</th>
                                <th scope="col">Feeds Quantity</th>
                                <th scope="col">Units Of Measurement</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                records.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.feedsquantity}</td>
                                        <td>{item.munits}</td>
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

export default SaveChickenFeedingRecords