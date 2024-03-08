import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EquatorialShopInventoryRecords = () => {

    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])
    const [incomingRecords, setIncomingRecords] = useState([]);
    const [outgoingRecords, setOutgoingRecords] = useState([]);

    const fetchShopInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchequatorialshopinventoryrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false)
            const incoming = res.data.filter(record => record.recordcategory === 'incoming');
            const outgoing = res.data.filter(record => record.recordcategory === 'outgoing');
            setAreInventoryRecordsLoading(false);
            setInventoryRecords(res.data);
            setIncomingRecords(incoming);
            setOutgoingRecords(outgoing);
        }
    }

    useEffect(()=> {
        fetchShopInventoryRecords()
    },[])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Equatorial Shop Department Inventory Restocking Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">Restock Source</th>
                                <th scope="col">Source Details</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areInventoryRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                incomingRecords.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.munits}</td>
                                        <td>{item.restocksource}</td>
                                        <td>{item.externalsourcedetails}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                <h1 style={{textAlign:'center'}}>Equatorial Shop Department Inventory Outgoing Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">Destination</th>
                                <th scope="col">Destination Details</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areInventoryRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                outgoingRecords.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.munits}</td>
                                        <td>{item.restocksource}</td>
                                        <td>{item.externalsourcedetails}</td>
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

export default EquatorialShopInventoryRecords