import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductOrders = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [comment, setComment] = useState('')

    const commentInput = event => {
        event.preventDefault()
        setComment(event.target.value)
    }
    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        console.log(res.data)
        if(Array.isArray(res.data)){
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }else{
            setOrdersList('There are no pending product orders')
        }   
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 1000)


        return () => clearInterval(interval)
    })

    const rejectOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/rejectorder', {
            orderId: event.currentTarget.id,
            branch: localStorage.getItem("branch"),
            newStatus: 'rejected',
            comment: comment,
            token: localStorage.getItem("token")
        })
        setisOrdersListLoading(true) 
    }

    const approveOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/confirmorder', {
            orderId: event.currentTarget.id,
            newStatus: 'sent to the production unit',
            branch: localStorage.getItem("branch"),
            comment: comment,
            token: localStorage.getItem("token")
        })
        setisOrdersListLoading(true)
    }
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                        <table className="table table-dark" style={{ marginTop: '100px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Source Branch</th>
                                    <th scope="col">Order By</th>
                                    <th scope="col">Delivered To</th>
                                    <th scope="col">Items Ordered</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">Current Order Status</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {(!isOrdersListLoading && Array.isArray(ordersList)) ? ordersList.map(item => (
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
                                        <td>{item.additionalinfo}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <div className="mb-3">
                                                <div className="form-floating mb-3">
                                                    <textarea type="text" id={item.orderid} className="form-control" rows="6" placeholder="johndoe" style={{ color: "#8CA6FE;", height: '200px' }} onChange={commentInput}/>
                                                    <label for="floatingInput">Comment</label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button id={item.orderid} className="btn btn-outline-danger" style={{ display: 'inline-block', marginRight: '5px' }} onClick={rejectOrder}>Reject</button>
                                            <button id={item.orderid} className="btn btn-outline-success" style={{ display: 'inline-block' }} onClick={approveOrder}>Approve</button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td>There are no pending orders</td></tr>}
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProductOrders