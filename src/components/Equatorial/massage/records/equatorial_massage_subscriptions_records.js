import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap";

const EquatorialMassageSubscriptionsRecords = () => {
    const [data, setSalesData] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('')
    const [filteredRecords, setFilteredRecords] = useState([])

    useEffect(()=>{
        const filteredRecords = data.filter((data)=> data.subscriptionstatus === selectedStatus)
        setFilteredRecords(filteredRecords)
    }, [data, selectedStatus])

    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialmassagesubscriptions', {
            token: localStorage.getItem('token')
          })
      
          if (Array.isArray(res.data)) {
            setSalesData(res.data);
          }
        }
      
        fetchSalesData()
    }, [])

    return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Equatorial Massage Client Subscriptions  Records</h2>
                    Filter Records By Subscription Status: <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginBottom:'10px', width:'250px'}} onChange={(event)=> setSelectedStatus(event.target.value)} required>
                        <option selected>Select Status</option>
                        <option value='active'>active</option>
                        <option value='inactive'>inactive</option>
                    </select>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Subscription Id</th>
                                    <th scope="col">Subscription Date</th>
                                    <th scope="col">Client Names</th>
                                    <th scope="col">Client Contact</th>
                                    <th scope="col">Amount Paid (UGX)</th>
                                    <th scope="col">Balance (UGX)</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length > 0 ? filteredRecords.map(item => (
                                    <tr key={item.subscriptionId}>
                                        <td>{item.subscriptionId}</td>
                                        <td>{item.subscriptiondate}</td>
                                        <td>{item.clientnames}</td>
                                        <td>{item.clientcontact}</td>
                                        <td>{item.amountPaid}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.subscriptionstatus}</td>
                                    </tr>
                                )):data ? data.map(item => (
                                    <tr key={item.subscriptionId}>
                                        <td>{item.subscriptionId}</td>
                                        <td>{item.subscriptiondate}</td>
                                        <td>{item.clientnames}</td>
                                        <td>{item.clientcontact}</td>
                                        <td>{item.amountPaid}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.subscriptionstatus}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EquatorialMassageSubscriptionsRecords