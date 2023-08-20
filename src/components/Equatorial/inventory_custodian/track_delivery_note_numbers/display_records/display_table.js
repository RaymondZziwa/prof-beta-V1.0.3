import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import ViewDeliveryNoteNumber from '../../../labelling/record_incoming_inventory/view_dnn'
import { useState } from 'react'

const DisplayDnnRecords = ({labellingStoreRestockRecords}) => {
    const [deliveryNotePath, setDeliveryNotePath] = useState('')
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)


    const openViewModal = (event) => {
        setDeliveryNotePath(event.target.id)
        if(deliveryNotePath){
            setIsViewModalOpen(true)
        }
    }

    const closeViewModal = () => {
        setIsViewModalOpen(false)
    }
    return(
        <>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
        <thead style={{ textAlign: 'center' }}>
            <tr>
                <th scope="col">Delivery Note No.</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity Delivered To Labelling Department</th>
                <th scope="col">Quantity Delivered To Custodian</th>
                <th scope="col">Discrepancies</th>
                <th scope="col">Units Of Measurement</th>
                <th scope="col">Delivery Note Image</th>
            </tr>
        </thead>
        <tbody>    
            {labellingStoreRestockRecords && labellingStoreRestockRecords.map((record, index)=>(
                <tr key={index+1}>
                    <td>{record.deliverynotenumber}</td>
                    <td>{record.productName}</td>
                    <td>{record.quantity}</td>
                    <td>xx</td>
                    <td>xx</td>
                    <td>{record.units}</td>
                    <td><p style={{color:'blue', cursor: 'pointer' }} onClick={openViewModal} id={record.deliverynoteimage}>View<FontAwesomeIcon icon={faEye} beat /></p></td>
                </tr>
            ))}
        </tbody>
    </table>
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
        </>
    )
}
export default DisplayDnnRecords