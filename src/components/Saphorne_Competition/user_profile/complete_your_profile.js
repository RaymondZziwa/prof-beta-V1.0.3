import {Row, Col} from 'react-bootstrap'
import '../Dashboard/leaderboard.css'
import bkg from '../../../imgs/bkg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import SaphroneNavbar from '../nav_bar/saphrone_navbar'
import sampledp from '../../../imgs/sampledp.jpg'
import './user_profile.css'


const CompleteUserProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [arePasswordsMatching, setArePasswordsMatching] = useState(undefined)
    const [isDisabled, setIsDisabled] = useState(true)
    const confirmPasswordRef = useRef()

        const showPwd = event => {
            event.preventDefault()
            setPasswordShown(!passwordShown);
        }
 
    const confirmPwdHandler = event => {
        event.preventDefault()
        setConfirmPwd(event.target.value) 
        if(pwd !== confirmPasswordRef.current.value){
            setArePasswordsMatching('Passwords do not match!')
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
            setArePasswordsMatching(null)
        }     
    }

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    }

    return(
        <div style={{backgroundImage:`url(${bkg})`, backgroundSize:'cover', height:'125vh'}}>
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                 {isOpen === true ? <FontAwesomeIcon icon={faX} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/> : <FontAwesomeIcon icon={faBars} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/>}
                 <div style={{backgroundColor:'red'}}>
                     <SaphroneNavbar isOpen={isOpen} />
                 </div>
             </Col>
        </Row>
        
         <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                 <h3 style={{textAlign:'center', color:'white'}}>Complete Your User Profile</h3>
                 <Row>
                    <Col sm='12' md='4' lg='4' xl='4' style={{textAlign:'center'}}>
                    <div className="profile-picture">
                        <FontAwesomeIcon icon={faUser}  style={{borderRadius:'100%', height:'230px', color:'white'}}/>
                        {/* <img src={sampledp} className='picture' alt="dp" height='230px' style={{borderRadius:'100%'}}/> */}
                        <div className="overlay">
                            <div className="change-profile">
                                <FontAwesomeIcon icon={faCamera} style={{color: "grey", cursor:'pointer', fontSize:'50px'}} />
                            </div>
                        </div>
                    </div>
                        
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Name:</span> Zziwa Raymond</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Username:@</span> zray</p>
                    </Col>
                    <Col sm='12' md='4' lg='4' xl='4' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                                <label for="floatingPassword">Contact 1</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                                <label for="floatingPassword">Contact 2</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                                <label for="floatingPassword">Address</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} required>
                                <option defaultValue>Branch</option>
                                <option value="Masanafu">Masanafu</option>
                                <option value="Namungoona">Namungoona</option>
                                <option value="Equatorial">Equatorial</option>
                                <option value="Buwama">Buwama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} required>
                                <option defaultValue>Department</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} required>
                                <option defaultValue>Role</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} className={typeof arePasswordsMatching === 'string' ? 'disabled' : ''} disabled={isDisabled}>SAVE PROFILE DATA</button>
                        </div>
                    </Col>
                 </Row>
             </Col>
         </Row>
        </div>
     )
}
export default CompleteUserProfile