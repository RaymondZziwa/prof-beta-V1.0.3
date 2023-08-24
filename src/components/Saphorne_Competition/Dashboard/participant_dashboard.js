import {Row, Col} from 'react-bootstrap'
import SaphroneLeaderboard from '../Leaderboard/leaderboard'
import './leaderboard.css'
import bkg from '../../../imgs/bkg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import SaphroneNavbar from '../nav_bar/saphrone_navbar'

const ParticipantDashboard = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    }

    return(
       <div style={{backgroundImage:`url(${bkg})`, backgroundSize:'cover', height:'100vh'}}>
       <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                {isOpen === true ? <FontAwesomeIcon icon={faX} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/> : <FontAwesomeIcon icon={faBars} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/>}
                <div style={{backgroundColor:'red'}}>
                    <SaphroneNavbar isOpen={isOpen} />
                </div>
            </Col>
       </Row>
       
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' className='ld-col d-flex flex-column align-items-center justify-content-center'>
                <h3 style={{textAlign:'center', color:'white'}}>Competition Leaderboard</h3>
                <div className="d-flex flex-column align-items-center" style={{textAlign:'center'}}>
                    <SaphroneLeaderboard /> 
                </div>
            </Col>

        </Row>
       </div>
    )
}
export default ParticipantDashboard