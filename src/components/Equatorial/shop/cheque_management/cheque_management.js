import { useState, useEffect } from "react"
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import DisplayTodayCheques from "./display_today_cheques/display_today_cheques"
import SaveNewChequeData from "./new_cheque_form/save_new_cheque_data"
import axios from "axios"
import Modal from 'react-modal'
import ViewAllChequesModal from "./view_all_cheques/view_all_cheques_modal"

const ChequeManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [chequeData, setChequeData] = useState([])
    const [status, setStatus] = useState('')
    const [todayCheques, setTodayCheques] = useState([])

    const openModal = (event) => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [status])

    const fetchAllChequeRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallchequeData',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setChequeData(res.data)

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            
            const formattedDate = `${year}-${month}-${day}`

            const todayCheques = res.data.filter((data)=>
                data.BankingDate === formattedDate && data.status === 'Pending'
            )
            setTodayCheques(todayCheques)
        }
    }

    useEffect(()=>{
        fetchAllChequeRecords()
    },[])

    return(
        <>
        <Row>
                <Col sm='12' md='11' lg='11' xl='11'>
                    <Row>
                        <Col sm='12' md='2' lg='2' xl='2' style={{marginLeft:'20px'}}>
                            <h2 style={{textAlign:'center', marginTop:'60px'}}>Save Cheque Details</h2>
                            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                            <SaveNewChequeData setStatus={setStatus} fetchAllChequeRecords={fetchAllChequeRecords}/>
                        </Col>
                        <Col sm='12' md='9' lg='9' xl='9' style={{marginLeft:'2px'}}>
                            <h2 style={{textAlign:'center', marginTop:'60px'}}>Cheques Scheduled To Be Banked Today</h2>
                            <p style={{textAlign:'center'}}>Today's Date: {new Date().toLocaleDateString()}</p>
                            <DisplayTodayCheques chequeData={todayCheques} openModal={openModal} fetchAllChequeRecords={fetchAllChequeRecords}/>
                        </Col>
                    </Row>
                </Col>
                {/* Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    >
                        <h2 style={{textAlign:'center'}}>View All Cheques</h2>
                        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
                        <ViewAllChequesModal chequeData={chequeData}/>
                    </Modal>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
    </>
    )
}
export default ChequeManagement