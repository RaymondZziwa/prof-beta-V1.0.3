import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const ApprovedOrders = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredData, setFilteredData] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const itemsPerPage = 3

    useEffect(()=>{
        if(filteredData.length > 0){
            setStartIndex((currentPage - 1) * itemsPerPage)
            setEndIndex(startIndex + itemsPerPage)

            setTotalPages(Math.ceil(filteredData.length / itemsPerPage))

        }else{
            setStartIndex((currentPage - 1) * itemsPerPage)
            setEndIndex(startIndex + itemsPerPage);

            setTotalPages(Math.ceil(ordersList.length / itemsPerPage))
        }
    },[filteredData, ordersList, currentPage, startIndex])

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/approvedorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token"),
            dept: localStorage.getItem('department')
        })
        if(Array.isArray(res.data)){
            const recordsWithDates = res.data.map(record => ({
                ...record,
                date: new Date(record.date),
            }));
            const sortedRecords = recordsWithDates.sort((a, b) => b.date - a.date)

            setOrdersList(sortedRecords)
            setisOrdersListLoading(false)
        }else{
            setOrdersList('No data')
        }
    }   

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchOrders()
    },[])

    const approveOrder = event => {
         event.preventDefault()
          axios.post('http://82.180.136.230:3005/markascompleted', {
               orderId: event.currentTarget.id,
               newStatus: 'completed',
               branch: localStorage.getItem("branch"),
               dept: localStorage.getItem("department"),
               token: localStorage.getItem("token")
           })
           fetchOrders()
    }

    const filterData = (event) => {
        let input = event.target.value
        setCurrentPage(1)

        if(ordersList.length > 0){
            let FilteredRecords = ordersList.filter((record)=>{
                return record.status === input 
            })

            setFilteredData(FilteredRecords)
        }

    }
    return (

                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='9' lg='9' xl='9'>
                        <h2 style={{textAlign:'center', marginTop:'80px'}}>APPROVED ORDERS</h2>
                        <table className="table table-light" style={{ marginTop: '10px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order From (Branch)</th>
                                    <th scope="col">Order By</th>
                                    <th scope="col">Delivered To</th>
                                    <th scope="col">Items Ordered</th>
                                    <th scope="col">Current Order Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!isOrdersListLoading && filteredData.length === 0)  ? ordersList.slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.orderid}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.sourcebranch}</td>
                                        <td>{item.orderby}</td>
                                        <td>{item.deliveredto}</td>
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
                                                    {JSON.parse(item.itemsordered).map(itemordered =>
                                                        <tr>
                                                            <td>{itemordered.itemName}</td>
                                                            <td>{itemordered.itemQuantity}</td>
                                                            <td>{itemordered.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button id={item.orderid} className="btn btn-outline-success" style={{ display: 'inline-block' }} onClick={approveOrder}>Mark As Completed</button>
                                        </td>
                                    </tr>
                                ))
                               : filteredData.slice(startIndex, endIndex).map((item) => (
                                <tr>
                                        <td>{item.orderid}</td>
                                        <td>{formatDate(item.date)}</td>
                                        <td>{item.sourcebranch}</td>
                                        <td>{item.orderby}</td>
                                        <td>{item.deliveredto}</td>
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
                                                    {JSON.parse(item.itemsordered).map(itemordered =>
                                                        <tr>
                                                            <td>{itemordered.itemName}</td>
                                                            <td>{itemordered.itemQuantity}</td>
                                                            <td>{itemordered.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button id={item.orderid} className="btn btn-outline-success" style={{ display: 'inline-block' }} onClick={approveOrder}>Mark As Completed</button>
                                        </td>
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
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
    )
}

export default ApprovedOrders