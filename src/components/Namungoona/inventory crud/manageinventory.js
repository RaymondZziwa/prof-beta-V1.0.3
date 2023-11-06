import Navbar from "../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import '../../side navbar/sidenav'
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import ReactPaginate from "react-paginate"
import './pagination.css'
import arrowLeft from '../../../imgs/arrowleft.svg'
import arrowRight from '../../../imgs/arrowright.svg'

const Manageinventory = () => {
    const [itemName, setItemName] = useState('')
    const [itemList, setitemList] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const [itemsPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = itemList.slice(indexOfFirstPost, indexOfLastPost);
    console.log('current items', currentPosts)

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

    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
     };

    return (
        <div className='container-fluid'>
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
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Item Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <h4>Loading Data From Database</h4> :
                                    currentPosts.map(item => (
                                        <tr>
                                            <td>{item.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>  

                        <ReactPaginate
                            onPageChange={paginate}
                            pageCount={Math.ceil(itemList.length / itemsPerPage)}
                            previousLabel={<img src={arrowLeft} className = 'previous' alt="arrow-left"/>}
                            nextLabel={<img src={arrowRight} className = 'next' alt="arrow-right"/>}
                            containerClassName={'pagination'}
                            pageLinkClassName={'page-number'}
                            previousLinkClassName={'page-number'}
                            nextLinkClassName={'page-number'}
                            activeLinkClassName={'active'}
                        />
                </Col>
            </Row>

        </div>
    )
}

export default Manageinventory