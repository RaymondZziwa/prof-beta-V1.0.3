import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const ProductionRecords = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(ordersList.length / itemsPerPage)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/productionrecords', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data !== 'string'){
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }else{
            setOrdersList('There are no production records.')
        }
        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 2000)


        return () => clearInterval(interval)
    })
    return (
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='10' lg='10' xl='10'>
                    <h2 style={{textAlign:'center',marginTop:'100px'}}>RAW MATERIAL REQUESTS RECORDS</h2>
                        <table className="table table-light" style={{ marginTop: '10px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Production Id</th>
                                    <th scope="col">Order Id (Production Completed For Order)</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Items Manufactured</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? ordersList.slice(startIndex, endIndex).map(item => (
                                    <tr>
                                        <td>{item.productionid}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.date}</td>
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
                                    </tr>
                                ))
                                : <tr><td colSpan='4'>{ordersList}</td></tr>}
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

export default ProductionRecords