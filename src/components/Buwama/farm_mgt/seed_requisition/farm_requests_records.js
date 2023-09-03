import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";


const BuwamaFarmBatchRecords  = () => {
    const [ordersList, setOrdersList] = useState()
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/buwamafetchallfarmbatchrecords', {
            token: localStorage.getItem("token")
        })
        //console.log(res.data)
        if(typeof res.data === "string"){
            setOrdersList('No records found.')
        }else{
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }
        
    }

    useEffect(() => {
        fetchOrders()
    },[])
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px' }}>
                            <thead >
                                <tr>
                                    <th scope="col">Batch Number</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.map(item => (
                                    <tr>
                                        <td>{item.batchno}</td>
                                        <td>{item.date}</td>
                                        <td>{item.additionalinfo}</td>
                                        <td>
                                            <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Units Of Measurement</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsrequested).map(itemrequested =>
                                                        <tr>
                                                            <td>{itemrequested.itemName}</td>
                                                            <td>{itemrequested.itemQuantity}</td>
                                                            <td>{itemrequested.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td>{ordersList}</td></tr>}
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

export default BuwamaFarmBatchRecords