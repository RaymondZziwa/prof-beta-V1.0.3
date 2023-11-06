import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import RecordIncomingInventoryForm from './record_incoming_inventory'
import EquatorialLabellingInventoryRecords from './display_records'

const LabellingDepartmentIncomingInventoryMgt = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [areInventoryRecordsLoading, setAreInventoryRecordsLoading] = useState(true)
    const [inventoryRecords, setInventoryRecords] = useState([])

    function sortRecords(a, b) {
        const dateA = new Date(
            a.date.split(',')[0].split('/').reverse().join('/') + a.date.split(',')[1]
          );
          const dateB = new Date(
            b.date.split(',')[0].split('/').reverse().join('/') + b.date.split(',')[1]
          );
        
          return dateB - dateA;
    }

    const fetchShopInventoryRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchlabellingdepartmentinventoryrestockingrecords',{
            token: localStorage.getItem('token'),
            branch: localStorage.getItem('branch')
        })
        
        if(Array.isArray(res.data)){
            setAreInventoryRecordsLoading(false);
            setInventoryRecords(res.data.sort(sortRecords))
        }
    }

    useEffect(()=> {
        fetchShopInventoryRecords()
    },[])
    
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        //setFilteredRecords(null);
        setIsModalOpen(false);
    }


    return (
        <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
            <h1 style={{textAlign:'center'}}>Department Incoming Inventory Records</h1>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <span style={{float:'right', cursor:'pointer', color:'blue'}} onClick={openModal}><h5>Save New Record<FontAwesomeIcon icon={faPenToSquare} beat /></h5></span>
                    <EquatorialLabellingInventoryRecords inventoryRecords={inventoryRecords} fetchShopInventoryRecords={fetchShopInventoryRecords}/>
                </Col>
            </Row>
        </div>
        {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <h2 style={{textAlign:'center'}}>Save New Record</h2>
                <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                <RecordIncomingInventoryForm fetchShopInventoryRecords={fetchShopInventoryRecords}/>
            </Modal> 
        <Col sm='12' md='1' lg='1' xl='1'></Col>
    </Row>
    )
}
export default LabellingDepartmentIncomingInventoryMgt