import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
   
const ApprovedOrders = () => {
    const [ordersList, setOrdersList] = useState()
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/approvedorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token"),
            dept: localStorage.getItem('department')
        })
        if(Array.isArray(res.data)){
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }else{
            setOrdersList('No data')
        }
    }   

    useEffect(() => {
        fetchOrders()
    },[])

    const approveOrder = event => {
         event.preventDefault()
          axios.post('http://82.180.136.230:3005/markascompleted', {
               orderId: event.currentTarget.id,
               newStatus: 'completed',
               branch: localStorage.getItem("branch"),
               dept: localStorage.getItem("department"),
               token: localStorage.getItem("token")
           })
    }
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order From (Branch)</th>
                                    <th scope="col">Order By</th>
                                    <th scope="col">Delivered To</th>
                                    <th scope="col">Items Ordered</th>
                                    <th scope="col">Current Order Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.map(item => (
                                    <tr>
                                        <td>{item.orderid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.sourcebranch}</td>
                                        <td>{item.orderby}</td>
                                        <td>{item.deliveredto}</td>
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
                                        <td>{item.status}</td>
                                        <td>
                                            <button id={item.orderid} className="btn btn-outline-success" style={{ display: 'inline-block' }} onClick={approveOrder}>Mark As Completed</button>
                                        </td>
                                    </tr>
                                ))
                               :  <tr><td>No data</td></tr>}
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

export default ApprovedOrders