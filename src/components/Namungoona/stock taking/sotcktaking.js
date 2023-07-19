import { Row, Col } from 'react-bootstrap'
import Navbar from "../../side navbar/sidenav";
import './stockpage.css'
import axios from 'axios';
import { useState } from 'react';
import AdminNavbar from '../../side navbar/adminnavbar';

const Stocktaking = () => {
    const [isLoading, setisLoading] = useState(true)
    const [Data, setData] = useState()


    const fetchOutOfStockItems = async event => {
        event.preventDefault()
        setData()
        let stockFilter = "outofstock";
        let res = await axios.post('http://82.180.136.230:3005/stocktaking', {
            branch: localStorage.getItem('branch'),
            department: localStorage.getItem('department'),
            role: localStorage.getItem('role'),
            stockFilter: stockFilter,
            token: localStorage.getItem("token")
        })
        console.log(res.data)
        setisLoading(false)
        setData(res.data)
    }

    const fetchRunningOutOfStockItems = async event => {
        event.preventDefault()
        setData()
        let stockFilter = "runningoutofstock";
        let res = await axios.post('http://82.180.136.230:3005/stocktaking', {
            branch: localStorage.getItem('branch'),
            department: localStorage.getItem('department'),
            role: localStorage.getItem('role'),
            stockFilter: stockFilter,
            token: localStorage.getItem("token")
        })
        console.log(res.data)
        setisLoading(false)
        setData(res.data)
    }

    const fetchInStockItems = async event => {
        event.preventDefault()
        setData()
        let stockFilter = "instock";
        let res = await axios.post('http://82.180.136.230:3005/stocktaking', {
            branch: localStorage.getItem('branch'),
            department: localStorage.getItem('department'),
            role: localStorage.getItem('role'),
            stockFilter: stockFilter,
            token: localStorage.getItem("token")
        })
        if(res.status !== '204'){
            setisLoading(false)
            setData(res.data)
        }
        
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    {localStorage.getItem("branch") !== 'admin' ? <Navbar /> : <AdminNavbar />}
                    <ul className='stocktakingnavigation' style={{ marginTop: '50px' }}>
                        <li>
                            <button className='btn btn-danger' onClick={fetchOutOfStockItems}>Out of Stock</button>
                        </li>
                        <li>
                            <button className='btn btn-success' onClick={fetchRunningOutOfStockItems}>Running Out of Stock</button>
                        </li>
                        <li>
                            <button className='btn btn-primary' onClick={fetchInStockItems}>In Stock</button>
                        </li>
                    </ul>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In Stock</th>
                                <th scope="col">Unit Of Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(Data) ? Data.map((item => (
                                <tr><td>{item.name}</td><td>{item.quantityinstock}</td><td>{item.measurementunits}</td></tr>))) : <td><tr>There are no items matching this criteria</tr></td>}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
}

export default Stocktaking