import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const FarmRequestsRecords  = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(ordersList.length / itemsPerPage)


    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/rawmaterialrequestsrecords', {
            branch: 'masanafu',
            dept: 'farm',
            token: localStorage.getItem("token")
        })
        console.log(res.data)
        if(typeof res.data === "string"){
            setOrdersList('No records found.')
        }else{
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }
        
    }

    useEffect(() => {
        fetchOrders()
    },[])
    return (
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                    <h1 style={{textAlign:'center', marginTop:'60px'}}>Farm Requests Records</h1>
                        <table className="table table-light" style={{ marginTop: '10px' }}>
                            <thead >
                                <tr>
                                    <th scope="col">Requisition Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Request From (Department)</th>
                                    <th scope="col">Request From (Role)</th>
                                    <th scope="col">Request From (user)</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">Items Requested</th>
                                    <th scope="col">Current Status</th>
                                    <th scope="col">Custodian's Comments</th>
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
                                        <td>{item.additionalinfo}</td>
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
                                        <td>{item.status}</td>
                                        <td>{item.comment}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='10'>{ordersList}</td></tr>}
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

export default FarmRequestsRecords