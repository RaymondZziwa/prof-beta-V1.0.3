import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1, faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import RetrieveSaleData from './sale_data_retrieval/retrieve_sale_data'

const ViewAllUnPaidSales = () => {
    const [salesRecords, setSalesRecords] = useState([])
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedReceiptNumber, setSelectedReceiptNumber] = useState(null)
    const [saleData, setSaleData] = useState([])

    const fetchSalesData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialshopsales',{
            token: localStorage.getItem('token')
        })
        if(Array.isArray(res.data)){
            const filteredSalesRecords = res.data.filter((record)=>
                record.paymentStatus === "unpaid"
            )
            setSalesRecords(filteredSalesRecords)
        }
    }

    const openPayModal = (event) => {
        setSelectedReceiptNumber(event.target.id)
        if(selectedReceiptNumber && salesRecords){
            const saleData = salesRecords.filter((record)=>
                record.receiptNumber === selectedReceiptNumber
            )
            setSaleData(saleData)
            setIsPayModalOpen(true)
        }
    }

    const closePayModal = () => {
        setIsPayModalOpen(false)
        setSelectedReceiptNumber(null)
        fetchSalesData()
    }

    const openViewModal = (event) => {
        setSelectedReceiptNumber(event.target.id)
        if(selectedReceiptNumber){
            setIsViewModalOpen(true)
        }
    }

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        fetchSalesData()
    }


    useEffect(()=>{
        fetchSalesData()
    },[])
    return(
        <>
            <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>View All Unpaid Sales</h2>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Receipt No.</th>
                                    <th scope="col">Sale Date</th>
                                    <th scope="col">Customer Names</th>
                                    <th scope="col">Customer Contact</th>
                                    <th scope="col">Items Sold</th>
                                    <th scope="col">Total Sale Amount</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Additional Notes</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesRecords ? salesRecords.map(item => (
                                    <tr key={item.receiptNumber}>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr>
                                                                <td>{itemordered.name}</td>
                                                                <td>{itemordered.quantity}</td>
                                                                <td>{itemordered.unitCost}</td>
                                                                <td>{itemordered.discount}</td>
                                                                <td>{itemordered.totalCost}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.totalAmount-item.balance}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.additionalinfo}</td>
                                        <td>
                                            <p style={{color:'blue', cursor: 'pointer' }} id={item.receiptNumber} onClick={openPayModal} >Record Payment <FontAwesomeIcon icon={faMoneyBill1} beat /></p>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
                {/* Modal */}
                <Modal
                isOpen={isPayModalOpen}
                onRequestClose={closeViewModal}
                >
                    <h2 style={{textAlign:'center'}}>Record Client Payment</h2>
                    <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closePayModal}>Close</button>
                    <RetrieveSaleData saleData={saleData[0]}/>
                </Modal>
        </>
    )
}

export default ViewAllUnPaidSales