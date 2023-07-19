import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ChickenMedicineInventoryRecords = () => {
    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])

    const fetchShopInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchmasanafuchickenmedicinesinventoryrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        console.log(res.data)
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false)
            setInventoryRecords(res.data)
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
                <h1 style={{textAlign:'center'}}>Masanafu Shop Inventory Restocking Records</h1>
                <table className="table table-dark">
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
                                inventoryRecords.map(item => (
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

export default ChickenMedicineInventoryRecords