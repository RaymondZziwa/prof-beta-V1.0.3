import Navbar from "../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"

const RegisterMaterial = () => {
    const [ equipmentName, setEquipmentName ] = useState('')
    const [isFetchedEquipmentLoading, setIsFetchedEquipmentLoading] = useState(true)
    const [fetchedEquipment, setFetchedEquipment] = useState([])
    const [ unitPrice, setUnitPrice ] = useState(0)

    const itemInputHandler = event => {
        event.preventDefault()
        setEquipmentName(event.target.value)
    }

    const unitPriceInputHandler = event => {
        event.preventDefault()
        setUnitPrice(event.target.value)
    }


    const fetchAllMaterials = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallmaterials',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedEquipmentLoading(false)
            setFetchedEquipment(res.data)
        }
        console.log(res.data)
    }

    useEffect(()=>{
        fetchAllMaterials()
    },[])

    const registerMaterialHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registermaterial', {
            token: localStorage.getItem('token'),
            equipmentName: equipmentName,
            unitPrice: unitPrice
        })

        fetchAllMaterials()
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
                                    <label for="floatingInput">Equipment Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={unitPriceInputHandler} style={{ color: "#8CA6FE" }} />
                                    <label for="floatingInput">Unit Price ( UGX ) </label>
                                </div>
                                <span><button className="btn btn-outline-primary" onClick={registerMaterialHandler}>Add Item</button></span>
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
                                    <th scope="col">Equipment Name</th>
                                    <th scope="col">Unit Price (UGX)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetchedEquipmentLoading ? <tr><td>Loading Data From Database</td></tr> :
                                    fetchedEquipment.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
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

export default RegisterMaterial