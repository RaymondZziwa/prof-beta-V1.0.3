import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductionRecords = () => {
    const [ordersList, setOrdersList] = useState()
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/productionrecords', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data !== 'string'){
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }else{
            setOrdersList('There are no production records.')
        }
        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 2000)


        return () => clearInterval(interval)
    })
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Production Id</th>
                                    <th scope="col">Order Id (Production Completed For Order)</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Items Manufactured</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.map(item => (
                                    <tr>
                                        <td>{item.productionid}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.date}</td>
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
                                                    {JSON.parse(item.itemsordered).map(itemordered =>
                                                        <tr>
                                                            <td>{itemordered.itemName}</td>
                                                            <td>{itemordered.itemQuantity}</td>
                                                            <td>{itemordered.mUnits}</td>
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

export default ProductionRecords