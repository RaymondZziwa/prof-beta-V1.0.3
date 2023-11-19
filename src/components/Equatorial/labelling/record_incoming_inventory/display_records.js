import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import ViewDeliveryNoteNumber from './view_dnn'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const EquatorialLabellingInventoryRecords = ({inventoryRecords, fetchShopInventoryRecords}) => {
    const [deliveryNotePath, setDeliveryNotePath] = useState('')
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(inventoryRecords.length / itemsPerPage)


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
                        {inventoryRecords ? (
                            inventoryRecords
                                .slice(startIndex, endIndex)
                                .map((item, index) => {
                                const globalIndex = startIndex + index + 1; // Calculate the global index

                                return (
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
                                );
                                })
                            ) : (
                            <tr>
                                <td colSpan={4}>Loading...</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                    )}
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