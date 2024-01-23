import Navbar from "../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import '../../side navbar/sidenav'
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const Manageinventory = () => {
    const [itemName, setItemName] = useState('')
    const [itemList, setitemList] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 6

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(itemList.length / itemsPerPage)


    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/allitemslist', {
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
            itemName: itemName,
            token: localStorage.getItem("token")
        })
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
                <Row style={{marginTop:'50px'}}>
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
                                    itemList.slice(startIndex, endIndex).map(item => (
                                        <tr>
                                            <td>{item.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>  
                        {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default Manageinventory