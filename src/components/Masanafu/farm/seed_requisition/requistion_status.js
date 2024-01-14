import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const RequisitionStatus = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 3

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(ordersList.length / itemsPerPage)

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/viewfarmrequeststatus', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === "string"){
            setOrdersList('No records found.')
        }else{
            const recordsWithDates = res.data.map(record => ({
                ...record,
                date: new Date(record.date),
            }));
            const sortedRecords = recordsWithDates.sort((a, b) => b.date - a.date);
            setOrdersList(sortedRecords)
            setisOrdersListLoading(false)
        }
        
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                        <h2 style={{textAlign:'center', marginTop: '100px'}}>SEEDS REQUESTS RECORDS</h2>
                        <table className="table table-light" style={{ marginTop: '10px' }}>
                            <thead >
                                <tr>
                                    <th scope="col">Requisition Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Batch Number</th>
                                    <th scope="col">Request From (Role)</th>
                                    <th scope="col">Request From (user)</th>
                                    <th scope="col">Additional Info</th>
                                    <th scope="col">Items Requested</th>
                                    <th scope="col">Current Status</th>
                                    <th scope="col">Custodian's Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.slice(startIndex, endIndex).map((item) => (
                                    <tr>
                                        <td>{item.requisitionid}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.batchno}</td>
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
                                                    {JSON.parse(item.itemsrequested).map(( itemrequested) =>
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
                                : <tr><td>{ordersList}</td></tr>}
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
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                </Row>
            </div>
        </>
    )
}

export default RequisitionStatus