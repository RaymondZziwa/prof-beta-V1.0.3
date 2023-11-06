import Navbar from "../../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"

const RegisterChickenMedicine = () => {
    const [ medicineName, setMedicineName ] = useState('')
    const [isFetchedMedicinesLoading, setIsFetchedMedicinesLoading] = useState(true)
    const [fetchedMedicines, setFetchedMedicines] = useState([])
    const [ unitPrice, setUnitPrice ] = useState(0)

    const itemInputHandler = event => {
        event.preventDefault()
        setMedicineName(event.target.value)
    }

    const unitPriceInputHandler = event => {
        event.preventDefault()
        setUnitPrice(event.target.value)
    }


    const fetchAllFeeds = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallchickenmedicines',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedMedicinesLoading(false)
            setFetchedMedicines(res.data)
        }
        console.log(res.data)
    }

    useEffect(()=>{
        fetchAllFeeds()
    },[])

    const registerMedicineHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registerchickenmedicine', {
            token: localStorage.getItem('token'),
            productName: medicineName,
            unitPrice: unitPrice
        })

        fetchAllFeeds()
    }
    return(
        <div className='container-fluid'>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                <Navbar />
                <div className="col align-self-center">
                    <Form style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={itemInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Medicine Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={unitPriceInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Unit Price ( UGX ) </label>
                            </div>
                            <span><button className="btn btn-outline-primary" onClick={registerMedicineHandler}>Add Item</button></span>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm='12' md='8' lg='8' xl='8'>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Feeds Name</th>
                                <th scope="col">Unit Price (UGX)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetchedMedicinesLoading ? <tr><td>Loading Data From Database</td></tr> :
                                fetchedMedicines.map(item => (
                                    <tr key={item.productId}>
                                        <td>{item.productName}</td>
                                        <td>{item.unitPrice}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>  
            </Col>
        </Row>

    </div>
    )
}

export default RegisterChickenMedicine