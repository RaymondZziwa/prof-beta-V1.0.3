import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDelivery = () => {
    const [orderId, setOrderId] = useState('')
    const [areOrderDetailsLoading, setAreOrderDetailsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState([])
    const [pastDeliveries, setPastDeliveries] = useState([])
    const [arePastDeliveriesLoading, setArePastDeliveriesLoading] = useState(true)
    const [deliveryDate, setDeliveryDate] = useState()
    const [lastDelivery, setLastDelivery] = useState()
    const [itemQuantityDelivered, setItemQuantityDelivered] = useState(0)
    const [originalQuantity, setOriginalQuantity] = useState(0)
    const [orderBalance, setOrderBalance] = useState(0)
    const [status, setStatus] = useState('')
    
    const orderIdInput = event => {
        event.preventDefault()
        setOrderId(event.target.value)
    }

    const fetchOrderDeliveriesData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchorderprojectsdeliveries', {
            token: localStorage.getItem('token'),
            orderId: orderId
        })

        if(Array.isArray(res.data)){
            setArePastDeliveriesLoading(false)
            setPastDeliveries(res.data) 
            setLastDelivery(res.data.length - 1)
        }

        console.log('deliveries', res.data)
        console.log('test', JSON.parse(orderDetails[0].itemsordered))
    }

    const fetchOrderData = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/fetchprojectsorderdata', {
            token: localStorage.getItem('token'),
            orderId: orderId
        })

        if(Array.isArray(res.data)){
            setAreOrderDetailsLoading(false)
            setOrderDetails(res.data) 
            fetchOrderDeliveriesData()
            const itemsOrdered = JSON.parse(res.data[0].itemsordered);
            const orderBalance = res.data[0].orderedquantitynotdelivered
            //console.log('deee', itemsOrdered[0].itemQuantity)
            setOriginalQuantity(itemsOrdered[0].itemQuantity)
            setOrderBalance(orderBalance)
        }

        console.log(res.data)
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setDeliveryDate(date)
    },[])

    // const handleDeliveredItemChange = (event) => {
    //     event.preventDefault()
    //     setDeliveredItemName(event.target.value);
    // };

    const itemQuantityDeliveredHandler = event => {
        event.preventDefault()
        setItemQuantityDelivered(event.target.value)
    }


    const deliveryHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveprojectsorderdelivery',{
            token: localStorage.getItem('token'),
            orderId: orderId,
            deliveryDate: deliveryDate,
            itemQuantityDelivered: itemQuantityDelivered,
            mUnits:'Pcs'
        }).then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'40px'}}>
                <h1 style={{textAlign:'center'}}> Projects Order Delivery Form</h1>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={orderIdInput} required />
                    <label for="floatingInput">Order-Id</label>
                </div>
                <button className='btn btn-primary' onClick={fetchOrderData}>Retrieve Order Details</button>
                <Row>
                    <Col sm='12' md='4' lg='4' xl='4'>
                        <h3 style={{textAlign:'center'}}>Order Details</h3>
                            <table className="table table-dark" style={{ marginTop: '2px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Units Of Measurement</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                    { !areOrderDetailsLoading ? 
                                        JSON.parse(orderDetails[0].itemsordered).map(itemordered =>
                                            <tr key={orderDetails[0].orderid}>
                                                <td>{itemordered.itemName}</td>
                                                <td>{itemordered.itemQuantity}</td>
                                                <td>{itemordered.mUnits}</td>
                                            </tr>
                                        ) :
                                        <tr>
                                            <td>No Data.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <h3 style={{textAlign:'center'}}>Past Order Deliveries</h3>
                            <table className="table table-dark" style={{ marginTop: '2px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Delivery Date</th>
                                        <th scope="col">Quantity Delivered</th>
                                        <th scope="col">Units Of Measurement</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                    { !arePastDeliveriesLoading ? 
                                        pastDeliveries.map(delivery =>
                                            <tr key={delivery.id}>
                                                <td>{delivery.deliverydate}</td>
                                                <td>{delivery.quantitydelivered}</td>
                                                <td>{delivery.munits}</td>
                                            </tr>
                                        ) :
                                        <tr>
                                            <td>No Data.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                            <h3 style={{textAlign:'center'}}>Order Status</h3>
                            <table className="table table-dark" style={{ marginTop: '2px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Quantity Ordered</th>
                                        <th scope="col">Quantity Delivered</th>
                                        <th scope="col">Quantity Not Delivered</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>
                                    { !areOrderDetailsLoading ? 
                                            <tr>
                                                <td>{originalQuantity}</td>
                                                <td>{originalQuantity - orderBalance}</td>
                                                <td>{orderBalance}</td>
                                            </tr>
                                         :
                                        <tr>
                                            <td>No Data.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                    </Col>
                    <Col sm='12' md='6' lg='6' xl='6' style={{textAlign:'center'}}>
                            <h3 style={{textAlign:'center'}}>Delivery Form</h3>
                            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={deliveryDate} required readOnly/>
                                <label for="floatingInput">Date Of Delivery</label>
                            </div>
                            {/* <div className="form-floating mb-3">
                                <input type='text' className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  onChange={handleDeliveredItemChange} required />
                                <label for="floatingInput">Delivered Item Name</label>
                            </div> */}
                            <div className="form-floating mb-3">
                                <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" onChange={itemQuantityDeliveredHandler} style={{ color: "#8CA6FE" }} min='0' required/>
                                <label for="floatingInput">Item Quantity Delivered</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value='Pcs' required readOnly/>
                                <label for="floatingInput">Units</label>
                            </div>
                            <div className="mb-3" style={{ textAlign: 'center' }}>
                                <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={deliveryHandler}>DELIVER</button>
                            </div>
                    </Col>
                </Row>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default OrderDelivery