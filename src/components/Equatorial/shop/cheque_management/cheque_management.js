import { useState, useEffect } from "react"
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"
import DisplayTodayCheques from "./display_today_cheques/display_today_cheques"
import SaveNewChequeData from "./new_cheque_form/save_new_cheque_data"

const ChequeManagement = () => {
    const [cheques, setCheques] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [status]);

    return(
        <>
        <Row>
                <Col sm='12' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <Row>
                        <Col sm='12' md='3' lg='3' xl='3' style={{marginLeft:'20px'}}>
                            <h2 style={{textAlign:'center', marginTop:'60px'}}>Save Cheque Details</h2>
                            <SaveNewChequeData setStatus={setStatus}/>
                        </Col>
                        <Col sm='12' md='8' lg='8' xl='8' style={{marginLeft:'20px'}}>
                            <h2 style={{textAlign:'center', marginTop:'60px'}}>Cheques Scheduled To Be Banked Today</h2>
                            <p style={{textAlign:'center'}}>Today's Date: {new Date().toLocaleDateString()}</p>
                            <DisplayTodayCheques />
                        </Col>
                    </Row>
                </Col>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
    </>
    )
}
export default ChequeManagement