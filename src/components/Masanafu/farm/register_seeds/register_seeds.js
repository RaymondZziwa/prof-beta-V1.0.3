import Navbar from "../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"


const RegisterFarmSeeds = () => {
    const [itemName, setItemName] = useState('')
    const [itemList, setitemList] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const [itemsPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = itemList.slice(indexOfFirstPost, indexOfLastPost);

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })  
        if(typeof res.data === 'string'){
            console.log("No data")
        }else{
            setitemList(res.data)
            setisLoading(false)
        }

        
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchItems()
        }, 500)


        return () => clearInterval(interval)
    }, [])

    

    const itemInput = event => {
        event.preventDefault()
        setItemName(event.target.value)
    }

    const addItem = async (event) => {
        event.preventDefault()
        await axios.post('http://82.180.136.230:3005/registeritem', {
            itemName: itemName.toUpperCase(),
            token: localStorage.getItem("token"),
            category: 'seed'
        })
        fetchItems()
    }

    const removeItem = async (event) => {
        event.preventDefault()
        await axios.post('http://82.180.136.230:3005/deleteitem', {
            itemName: itemName,
            token: localStorage.getItem("token")
        })
    }


    return (
        <>
                <Row>
                <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                    <Navbar />
                    <div className="col align-self-center">
                        <Form style={{ justifyContent: 'center', marginTop: '20px' }}>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={itemInput} style={{ color: "#8CA6FE" }} />
                                    <label for="floatingInput">Item Name</label>
                                </div>
                                <span><button className="btn btn-outline-primary" onClick={addItem}>Add Item</button></span>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Item Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <h4>Loading Data From Database</h4> :
                                    itemList.map(item => (
                                        <tr>
                                            <td>{item.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>  

                </Col>
            </Row>
        </>
    )
}

export default RegisterFarmSeeds