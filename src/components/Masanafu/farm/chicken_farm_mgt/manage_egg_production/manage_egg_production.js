import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ManageEggProduction = () => {
    const [batchNumber, setBatchNumber] = useState('')
    const [date, setDate] = useState()
    const [quantity, setquantity] = useState(0)
    const [status, setStatus] = useState('')
    const [moreInfo, setMoreInfo] = useState('')
    const [isItemListLoading, setIsItemLoading] = useState(true)
    const [itemList, setitemList] = useState('')
    const [itemName, setitemName] = useState('')
    const [totalEggsCollected, setTotalEggsCollected] = useState(0);
    const [totalGoodEggsCollected, setTotalGoodEggsCollected] = useState(0);
    const [totalDamagedEggsCollected, setTotalDamagedEggsCollected] = useState(0);

    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState()

    const handleTotalEggsCollectedChange = (event) => {
        setTotalEggsCollected(event.target.value);
      };
    
      const handleTotalGoodEggsCollectedChange = (event) => {
        setTotalGoodEggsCollected(event.target.value);
      };
    
      const handleTotalDamagedEggsCollectedChange = (event) => {
        setTotalDamagedEggsCollected(event.target.value);
      };
    

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }

    const batchNumberInput = event => {
        event.preventDefault()
        setBatchNumber(event.target.value)
    }

    const quantityInput = event => {
        event.preventDefault()
        setquantity(event.target.value)
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
        const res = await axios.post('http://82.180.136.230:3005/fetchbatcheggproduction', {
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
        let res = await axios.post('http://82.180.136.230:3005/savebatcheggproduction',{
            token: localStorage.getItem('token'),
            batchNumber: batchNumber,
            date: date,
            totalEggsCollected: totalEggsCollected,
            totalGoodEggsCollected: totalGoodEggsCollected,
            totalDamagedEggsCollected: totalEggsCollected-totalGoodEggsCollected,
            totalEggTraysCollected: (totalGoodEggsCollected/30).toFixed(1),
            notes: moreInfo
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
        //console.log(batchNumber, date, quantity, moreInfo)
    }


    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Egg Production Manager</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input  className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={batchNumberInput} required />
                    <label for="floatingInput">Chicken Batch Number</label>
                </div><br></br>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={date} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div><br></br>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required onChange={handleTotalEggsCollectedChange}/>
                    <label htmlFor="floatingInput">Total Eggs Collected</label>
                </div><br></br>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required onChange={handleTotalGoodEggsCollectedChange}/>
                    <label htmlFor="floatingInput">Total Number Of Good Eggs</label>
                </div><br></br>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required value={totalEggsCollected-totalGoodEggsCollected} readOnly/>
                    <label htmlFor="floatingInput">Total Number of Damaged Eggs</label>
                </div><br></br>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required readOnly value={(totalGoodEggsCollected/30).toFixed(1)}/>
                    <label htmlFor="floatingInput">Total Number of Egg Trays</label>
                </div><br></br>

                <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                </div>
                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveChickenDeathRecord}>
                    Save Egg Collection Record
                </button>
                <h1 style={{textAlign:'center'}}>Batch Egg Collection Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Collection Date</th>
                                <th scope="col">Total Eggs Collected</th>
                                <th scope="col">Total Good Eggs Collected</th>
                                <th scope="col">Total Damaged Eggs Collected</th>
                                <th scope="col">Total Egg Trays</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                records.map(item => (
                                    <tr>
                                        <td>{item.collectiondate}</td>
                                        <td>{item.totaleggscollected}</td>
                                        <td>{item.totalgoodeggscollected}</td>
                                        <td>{item.totaldamagedeggscollected}</td>
                                        <td>{item.totaleggtrays}</td>
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

export default ManageEggProduction
