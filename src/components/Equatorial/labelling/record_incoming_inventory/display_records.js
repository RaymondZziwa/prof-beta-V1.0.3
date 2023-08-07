import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import ViewDeliveryNoteNumber from './view_dnn'

const EquatorialLabellingInventoryRecords = ({inventoryRecords, fetchShopInventoryRecords}) => {
    const [deliveryNotePath, setDeliveryNotePath] = useState('')
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)


    const openViewModal = (event) => {
        setDeliveryNotePath(event.target.id)
        if(deliveryNotePath){
            setIsViewModalOpen(true)
        }
    }

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        fetchShopInventoryRecords()
    }

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div style={{marginTop:'60px'}}>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Quantity In</th>
                                <th scope="col">Units</th>
                                <th scope="col">Restock Source</th>
                                <th scope="col">External Source Details</th>
                                <th scope="col">Company Branch</th>
                                <th scope="col">Delivered By</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Delivery Note Number</th>
                                <th scope="col">Delivery Note Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!inventoryRecords ? <tr><td colSpan="11" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                inventoryRecords.map(item => (
                                    <tr key={item.restockId}>
                                        <td>{item.date}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.units}</td>
                                        <td>{item.restocksource}</td>
                                        <td>{item.externalsourcedetails}</td>
                                        <td>{item.companybranch}</td>
                                        <td>{item.deliveredby}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.deliverynotenumber}</td>
                                        <td><p style={{color:'blue', cursor: 'pointer' }} onClick={openViewModal} id={item.deliverynoteimage}>View<FontAwesomeIcon icon={faEye} beat /></p></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            {/* Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onRequestClose={closeViewModal}
                //contentLabel="Subscription Details"
            >
                <h2 style={{textAlign:'center'}}>View Delivery Note Image</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeViewModal}>Close</button>
                <ViewDeliveryNoteNumber DNN_PATH={deliveryNotePath}/>
            </Modal>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}
export default EquatorialLabellingInventoryRecords