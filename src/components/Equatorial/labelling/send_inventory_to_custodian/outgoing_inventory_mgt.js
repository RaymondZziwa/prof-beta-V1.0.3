import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import LabellingOutgoingForm from './outgoing_form'
import EquatorialLabellingInventoryTransferRecords from './display_records'

const LabellingDepartmentInventoryTransferToCustodianMgt = () => {
    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    function sortRecords(a, b) {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));

        return dateB - dateA;
    }

    const fetchInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchlabelledinventorytransferrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false);
            setInventoryRecords(res.data.sort(sortRecords))
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => { 
        setIsModalOpen(false);
    }

    useEffect(()=> {
        fetchInventoryRecords()
    },[])
    


    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
            <h1 style={{textAlign:'center'}}>Inventory Transfer To Custodian Records</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <span style={{float:'right', cursor:'pointer', color:'blue'}} onClick={openModal}><h5>Save New Record<FontAwesomeIcon icon={faPenToSquare} beat /></h5></span>
                    <EquatorialLabellingInventoryTransferRecords inventoryRecords={inventoryRecords}/>
                </Col>
            </Row>
        </div>
        {/* Modal */}
        <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <h2 style={{textAlign:'center'}}>Transfer Labelled Inventory To Custodian</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <LabellingOutgoingForm fetchInventoryRecords={fetchInventoryRecords} />
            </Modal> 
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default LabellingDepartmentInventoryTransferToCustodianMgt