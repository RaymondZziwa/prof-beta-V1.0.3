import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1, faEye, faCircleUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import RecieveClientProjectsPayment from "../recieve_payment/recieve_payment"
import ViewClientPaymentRecords from "../view_client_payment_record/view_client_payment_record"
import UpgradeClientProject from "../upgrade_project/upgrade_client_project"

const DisplayClientOrders = () => {
    const [records, setRecords] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState('')
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
    const [data, setData] = useState([])

    const openPayModal = (event) => {
        setSelectedOrderId(event.target.id)
        if(selectedOrderId && records){
            const filteredData = records.filter((record)=> 
                record.orderId === selectedOrderId
            )
            setData(filteredData)
            setIsPayModalOpen(true)
        }
    }

    const openUpgradeModal = (event) => {
        setSelectedOrderId(event.target.id)
        if(selectedOrderId && records){
            const filteredData = records.filter((record)=> 
                record.orderId === selectedOrderId
            )
            setData(filteredData)
            setIsUpgradeModalOpen(true)
        }
    }

    const closeUpgradeModal = () => {
        setSelectedOrderId(null)
        fetchRecords()
        setIsUpgradeModalOpen(false)
    }

    const closePayModal = () => {
        setSelectedOrderId(null)
        fetchRecords()
        setIsPayModalOpen(false)
    }

    const openViewModal = (event) => {
        setSelectedOrderId(event.target.id)
        if(selectedOrderId){
            setIsViewModalOpen(true)
        }
    }

    const closeViewModal = () => {
        setSelectedOrderId(null)
        setIsViewModalOpen(false)
    }

    const fetchRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallclientprojectorders',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setRecords(res.data)
        }
    }

    useEffect(()=>{
        fetchRecords()
    },[])

    return(
        <>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Contact 1</th>
                                    <th scope="col">Contact 2</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price (UGX)</th>
                                    <th scope="col">Balance (UGX)</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { records ? records.map(item => (
                                        <tr key={item.orderId}>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.contact1}</td>
                                            <td>{item.contact2}</td>
                                            <td>{item.address}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.totalprice}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.notes}</td>
                                            <td>
                                                <p style={{color:'blue', cursor: 'pointer' }}  id={item.orderId} onClick={openUpgradeModal}>Upgrade <FontAwesomeIcon icon={faCircleUp} beat /></p>
                                                <p style={{color:'blue', cursor: 'pointer' }}  id={item.orderId} onClick={openPayModal}>Pay <FontAwesomeIcon icon={faMoneyBill1} beat /></p>
                                                <p style={{color:'blue', cursor: 'pointer' }}  id={item.orderId} onClick={openViewModal}>View Client Record<FontAwesomeIcon icon={faEye} beat /></p>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                        {/* Modal */}
                        <Modal
                            isOpen={isUpgradeModalOpen}
                            onRequestClose={closeViewModal}
                            //contentLabel="Subscription Details"
                        >
                            <h2 style={{textAlign:'center'}}>Upgrade Client Projects Order</h2>
                            <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeUpgradeModal}>Close</button>
                            <UpgradeClientProject data={data[0]} fetchRecords={fetchRecords}/>
                        </Modal>
                        {/* Modal */}
                            <Modal
                            isOpen={isPayModalOpen}
                            onRequestClose={closeViewModal}
                            //contentLabel="Subscription Details"
                        >
                            <h2 style={{textAlign:'center'}}>Recieve Project Payment</h2>
                            <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closePayModal}>Close</button>
                            <RecieveClientProjectsPayment saleData={data[0]} fetchRecords={fetchRecords}/>
                        </Modal>
                        {/* Modal */}
                        <Modal
                            isOpen={isViewModalOpen}
                            onRequestClose={closeViewModal}
                            //contentLabel="Subscription Details"
                        >
                            <h2 style={{textAlign:'center'}}>View Client Payment Record</h2>
                            <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeViewModal}>Close</button>
                            <ViewClientPaymentRecords orderId={selectedOrderId}/>
                        </Modal>
        </>
    )
}
export default DisplayClientOrders