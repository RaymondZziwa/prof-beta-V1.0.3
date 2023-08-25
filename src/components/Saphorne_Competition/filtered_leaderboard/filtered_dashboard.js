import {Row, Col} from 'react-bootstrap'
import SaphroneLeaderboard from '../Leaderboard/leaderboard'
import '../Leaderboard/leaderboard'
import bkg from '../../../imgs/bkg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import SaphroneNavbar from '../nav_bar/saphrone_navbar'

const FilteredParticipantDashboard = () => {
    const [selectedGender, setSelectedGender] = useState('')
    const [fromDate, setFromDate] = useState(undefined)
    const [toDate, setToDate] = useState(undefined)
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
                <h3 style={{textAlign:'center', color:'white'}}>Filter Competition Leaderboard</h3>
                <div className="d-flex flex-column align-items-center" style={{textAlign:'center'}}>
                    <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} required>
                                <option defaultValue>Filter By Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
            <div className="mb-3">
            <label htmlFor="fromDate" className="form-label" style={{ marginRight: '5px' }}>
                From
            </label>
            <input
                type="date"
                className="form-control"
                id="fromDate"
                onChange={(e) => setFromDate(e.target.value)}
                required
            />
            </div>
        </div>
        -
        <div style={{ marginLeft: '10px' }}>
            <div className="mb-3">
            <label htmlFor="toDate" className="form-label" style={{ marginRight: '5px' }}>
                To
            </label>
            <input
                type="date"
                className="form-control"
                id="toDate"
                onChange={(e) => setToDate(e.target.value)}
                required
            />
            </div>
        </div>
        </div>
        <button className="btn btn-primary" ><FontAwesomeIcon icon={faFilter} fade style={{color: "white"}} />Filter</button>
            <SaphroneLeaderboard /> 
        </div>
            </Col>

        </Row>
       </div>
    )
}
export default FilteredParticipantDashboard