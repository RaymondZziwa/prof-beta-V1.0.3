import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const FarmRequests = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [comment, setComment] = useState('')

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 7

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(ordersList.length / itemsPerPage)


    const url = 'http://82.180.136.230:3005'
    const commentInput = event => {
        event.preventDefault()
        setComment(event.target.value)
    }
    
    const fetchOrders = async () => {
        const res = await axios.post(`${url}/fetchfarmrequisitions`, {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setOrdersList('There are no pending farm requests.')
        }else{
            const filteredRecords = res.data.filter((record)=> record.requesterdepartment === 'farm')
            setOrdersList(filteredRecords)
            setisOrdersListLoading(false)
        }     
    }

    useEffect(() => {
        fetchOrders()
    },[])

    const rejectOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/rejectrawmaterialrequest', {
            department: 'farm',
            requisitionId: event.currentTarget.id,
            branch: localStorage.getItem("branch"),
            comment: comment,
            newStatus: 'rejected',
            token: localStorage.getItem("token")
        })
        fetchOrders()
    }

    const approveOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/approverawmaterialrequest', {
            department: 'farm',
            requisitionId: event.currentTarget.id,
            newStatus: 'approved',
            branch: localStorage.getItem("branch"),
            comment: comment,
            token: localStorage.getItem("token")
        })
        fetchOrders()
    }
    return (
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                        <h1 style={{textAlign:'center', marginTop:'60px'}}>Farm Seeds Requests Records</h1>
                        <table className="table table-light" style={{ marginTop: '10px' }}>
                            <thead >
                                <tr>
                                    <th scope="col">Requisition Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Request From (Department)</th>
                                    <th scope="col">Request From (Role)</th>
                                    <th scope="col">Request From (user)</th>
                                    <th scope="col">Items Requested</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">Current Status</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.requisitionid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.requesterdepartment}</td>
                                        <td>{item.requesterrole}</td>
                                        <td>{item.requestedby}</td>
                                        <td>
                                            <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Units Of Measurement</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsrequested).map(itemrequested =>
                                                        <tr>
                                                            <td>{itemrequested.itemName}</td>
                                                            <td>{itemrequested.itemQuantity}</td>
                                                            <td>{itemrequested.mUnits}</td>
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
                                                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;", boxShadow: '0px 0px 5px 1px rgba(0, 0, 0, 0.25)', height: '200px' }} onChange={commentInput}/>
                                                    <label for="floatingInput">Comment</label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button id={item.requisitionid} className="btn btn-outline-danger" style={{ display: 'inline-block', marginRight: '5px' }} onClick={rejectOrder}>Reject</button>
                                            <button id={item.requisitionid} className="btn btn-outline-success" style={{ display: 'inline-block' }} onClick={approveOrder}>Approve</button>
                                        </td>
                                        
                                    </tr>
                                ))
                                : <tr><td colSpan='11'>{ordersList}</td></tr>}
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
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
    )
}

export default FarmRequests