import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate"
import '../../Namungoona/inventory crud/pagination.css'
import arrowLeft from '../../../imgs/arrowleft.svg'
import arrowRight from '../../../imgs/arrowright.svg'

const ProjectsEquipmentRequests = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [comment, setComment] = useState('')
    const url = 'http://82.180.136.230:3005'
    const commentInput = event => {
        event.preventDefault()
        setComment(event.target.value)
    }
    
    const fetchOrders = async () => {
        const res = await axios.post(`${url}/fetchprojectsrequisitions`, {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            console.log(res)
            setOrdersList('There are no pending farm requests.')
        }else{
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }     
    }

    useEffect(() => {
        fetchOrders()
        const interval = setTimeout(() => {
            fetchOrders()
        }, 100)


        return () => clearTimeout(interval)
    },[])


    const rejectOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/rejectrawmaterialrequest', {
            department: 'projects',
            requisitionId: event.currentTarget.id,
            branch: localStorage.getItem("branch"),
            comment: comment,
            newStatus: 'rejected',
            token: localStorage.getItem("token")
        })
    }

    const approveOrder = event => {
        event.preventDefault()
        axios.post('http://82.180.136.230:3005/approverawmaterialrequest', {
            department: 'projects',
            requisitionId: event.currentTarget.id,
            newStatus: 'approved',
            branch: localStorage.getItem("branch"),
            comment: comment,
            token: localStorage.getItem("token")
        })
    }

    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                        <table className="table table-dark" style={{ marginTop: '100px', width: '100%' }}>
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
                                {!isOrdersListLoading ? ordersList.map(item => (
                                    <tr>
                                        <td>{item.requisitionid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.requesterdepartment}</td>
                                        <td>{item.requesterrole}</td>
                                        <td>{item.requestedby}</td>
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
                                : <tr><td>{ordersList}</td></tr>}
                            </tbody>
                        </table>
                        {/* <ReactPaginate
                            onPageChange={paginate}
                            pageCount={Math.ceil(ordersList.length / itemsPerPage)}
                            previousLabel={<img src={arrowLeft} className = 'previous' alt="arrow-left"/>}
                            nextLabel={<img src={arrowRight} className = 'next' alt="arrow-right"/>}
                            containerClassName={'pagination'}
                            pageLinkClassName={'page-number'}
                            previousLinkClassName={'page-number'}
                            nextLinkClassName={'page-number'}
                            activeLinkClassName={'active'}
                        /> */}
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProjectsEquipmentRequests