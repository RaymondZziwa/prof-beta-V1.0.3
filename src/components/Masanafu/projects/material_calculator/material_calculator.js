import { Row, Col } from "react-bootstrap";
import '../../../Namungoona/inventory records/forms.css'
import Navbar from "../../../side navbar/sidenav";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderSummaryTable from "./material_calculations";

const MaterialCalculator = () => {
    const [orderId, setOrderId] = useState('')
    const [areOrderDetailsLoading, setAreOrderDetailsLoading] = useState(true)
    const [orderDetails, setOrderDetails] = useState([])
    const [materials, setMaterials] = useState([])

    const [itemsOrdered, setItemsOrdered] = useState()
    const [itemName, setItemName] = useState('')
    const [itemQuantityOrdered, setItemQuantityOrdered] = useState(0)
    const [isCalculating, setIsCalculating] = useState(true)

    const orderIdInput = event => {
        event.preventDefault()
        setOrderId(event.target.value)
    }

    const fetchOrderMaterialData = async itemName => {
        let res = await axios.post('http://82.180.136.230:3005/fetchordermaterialdata', {
            token: localStorage.getItem('token'),
            machineryName : itemName
        })

        console.log('fetchOrderMaterialData', res.data)
         if(Array.isArray(res.data)){
             setMaterials(JSON.parse(res.data[0].itemsrequired))
             setIsCalculating(false)
         }
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
        }
        console.log(res.data)
    }

    useEffect(()=>{
        if(orderDetails && orderDetails.length > 0){
            setItemsOrdered(JSON.parse(orderDetails[0].itemsordered))
        }
    }, [orderDetails])

    useEffect(() => {
        if (itemsOrdered && itemsOrdered.length > 0) {
          const itemName = itemsOrdered[0].itemName;
          setItemName(itemName);
          setItemQuantityOrdered(itemsOrdered[0].itemQuantity)
          fetchOrderMaterialData(itemName);
        }
    }, [itemsOrdered]);


    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Material Calculator</h1>
            <div className="mb-3">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={orderIdInput} style={{ color: "#8CA6FE" }} />
                    <label for="floatingInput">Enter Order Id</label>
                </div>
                <span><button className="btn btn-outline-primary" onClick={fetchOrderData}>Calculate</button></span>
            </div>

            <h1 style={{textAlign:'center'}}>Order Material Calculations</h1>
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
                </Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h3 style={{textAlign:'center'}}>Materials Needed</h3>
                    {!isCalculating ? <OrderSummaryTable materials={materials} orderQuantity={itemQuantityOrdered} /> : <p style={{textAlign:'center'}}>Loading....</p>}
                </Col>
            </Row>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default MaterialCalculator