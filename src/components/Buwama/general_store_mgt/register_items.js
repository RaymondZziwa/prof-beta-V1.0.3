import Navbar from "../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"

const RegisterBuwamaGeneralStoreItems = () => {
    const [itemsLoading, setItemsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [unitPrice, setUnitPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')

    const fetchAllItems = async () => {
        let res = await axios.post('http://82.180.136.230:3005/buwamafetchallitems',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setItemsLoading(false)
            setItems(res.data)
        }
    }

    useEffect(()=>{
        fetchAllItems()
    },[])

    const registerItemHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/buwamaregisteritem',{
            token: localStorage.getItem('token'),
            category: category,
            name: name,
            unitPrice: unitPrice
        })
        fetchAllItems()
    }


    return(
        <div className='container-fluid'>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                <Navbar />
                <div className="col align-self-center">
                    <Form style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={(e)=>setCategory(e.target.value)} required>
                        <option selected>Select Category</option>
                        <option value='EQUIPMENT'>Equipment</option>
                        <option value='FEEDS'>Feeds</option>
                        <option value='MEDICINE'>Medicines</option>
                        <option value='SEEDLINGS'>Seedlings</option>
                    </select>
                    <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={(e)=> setName(e.target.value)} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={(e)=> setUnitPrice(e.target.value)} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Unit Price ( UGX ) </label>
                            </div>
                            <span><button className="btn btn-primary" style={{width:'150px'}} onClick={registerItemHandler}>Add Item</button></span>
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
                                <th scope="col">Item Category</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Unit Price (UGX)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsLoading ? <tr><td>Loading Data From Database</td></tr> :
                                items.map(item => (
                                    <tr key={item.productId}>
                                        <td>{item.category}</td>
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
export default RegisterBuwamaGeneralStoreItems