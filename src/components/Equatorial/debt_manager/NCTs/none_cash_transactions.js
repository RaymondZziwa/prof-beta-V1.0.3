import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import SaveNewNctForm from './save_new_nct_form/save_new_nct_form'
import axios from 'axios'

const NoneCashTransactionsMgt = () => {
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [nctRecords, setNctRecords] = useState([])

    const fetchNCTRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallnctrecords',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            console.log(res.data)
            setNctRecords(res.data)
        }
    }

    useEffect(()=>{
        fetchNCTRecords()
    },[])

    const openPayModal = (event) => {
            setIsPayModalOpen(true)
    }

    const closePayModal = () => {
        setIsPayModalOpen(false)
    }

    const openViewModal = (event) => {
            setIsViewModalOpen(true)
    }

    const closeViewModal = () => {
        setIsViewModalOpen(false)
    }
    return(
        <>
            <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Manage None Cash Transactions (NCTs)</h2>
                        <Row>
                            <Col sm='12' md='3' lg='3' xl='3'>
                            <h3 style={{textAlign:'center'}}>NCT Menu</h3>
                            <div style={{fontSize:'22px', color:'blue'}}>
                                <p style={{cursor:'pointer'}} onClick={openPayModal}>Save New Transaction</p>
                                {/* <p style={{cursor:'pointer'}}>Edit Transaction</p> */}
                            </div>
                            </Col>
                            <Col sm='12' md='8' lg='8' xl='8' style={{marginLeft:'50px'}}>
                                <h3 style={{textAlign:'center'}}>View All NCTs</h3>
                                <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Transaction Date</th>
                                    <th scope="col">Customer Names</th>
                                    <th scope="col">Customer Contact</th>
                                    <th scope="col">Item Brought In</th>
                                    <th scope="col">Quantity Brought In</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Item Taken Out</th>
                                    <th scope="col">Quantity Taken Out</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Authorized By</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                { nctRecords ? nctRecords.map(item => (
                                    <tr key={item.receiptNumber}>
                                        <td>{item.date}</td>
                                        <td>{item.clientnames}</td>
                                        <td>{item.clientcontact}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantityin}</td>
                                        <td>{item.unitsin}</td>
                                        <td>{item.itemOut}</td>
                                        <td>{item.quantityout}</td>
                                        <td>{item.unitsout}</td>
                                        <td>{item.authorizedby}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                            </Col>
                        </Row>
                    </Col>
                    {/* Modal */}
                    <Modal
                    isOpen={isPayModalOpen}
                    onRequestClose={closeViewModal}
                    >
                        <h2 style={{textAlign:'center'}}>Save New NCT</h2>
                        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closePayModal}>Close</button>
                        <SaveNewNctForm fetchNCTRecords={fetchNCTRecords}/>
                    </Modal>
                    <Col sm='12' md='1' lg='1' xl='1'>
                        <Navbar />
                    </Col>
                </Row>
        </>
    )
}
export default NoneCashTransactionsMgt