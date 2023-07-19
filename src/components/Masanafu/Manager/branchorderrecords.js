import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate"
import '../../Namungoona/inventory crud/pagination.css'
import arrowLeft from '../../../imgs/arrowleft.svg'
import arrowRight from '../../../imgs/arrowright.svg'

const BranchOrderRecords = () => {
    const [ordersList, setOrdersList] = useState([])
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/branchorderrecords', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setOrdersList("There are no records.")
        }else{
            setOrdersList(res.data)
            setisOrdersListLoading(false)
        }
        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 500)


        return () => clearInterval(interval)
    })

    const [itemsPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentRecords = ordersList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
     };
  
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Ordered By</th>
                                    <th scope="col">additionalInfo</th>
                                    <th scope="col">Destination Branch</th>
                                    <th scope="col">Delivered To</th>
                                    <th scope="col">Items Ordered</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Custodian's Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading ? currentRecords.map(item => (
                                    <tr>
                                        <td>{item.orderid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.orderby}</td>
                                        <td>{item.additionalinfo}</td>
                                        <td>{item.destinationbranch}</td>
                                        <td>{item.deliveredto}</td>
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
                                        <td>{item.comment}</td>
                                    </tr>
                                ))
                                : <tr><td>{ordersList}</td></tr>}
                            </tbody>
                        </table>

                        <ReactPaginate
                            onPageChange={paginate}
                            pageCount={Math.ceil(ordersList.length / itemsPerPage)}
                            previousLabel={<img src={arrowLeft} className = 'previous' alt="arrow-left"/>}
                            nextLabel={<img src={arrowRight} className = 'next' alt="arrow-right"/>}
                            containerClassName={'pagination'}
                            pageLinkClassName={'page-number'}
                            previousLinkClassName={'page-number'}
                            nextLinkClassName={'page-number'}
                            activeLinkClassName={'active'}
                        />
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default BranchOrderRecords