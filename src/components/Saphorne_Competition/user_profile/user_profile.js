import {Row, Col} from 'react-bootstrap'
import '../Dashboard/leaderboard.css'
import bkg from '../../../imgs/bkg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faEye, faEyeSlash, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import SaphroneNavbar from '../nav_bar/saphrone_navbar'
import sampledp from '../../../imgs/sampledp.jpg'
import './user_profile.css'

const UserProfile = () => {
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
                 <h3 style={{textAlign:'center', color:'white'}}>Manage User Profile</h3>
                 <Row>
                    <Col sm='12' md='4' lg='4' xl='4' style={{textAlign:'center'}}>
                    <div className="profile-picture">
                        <img src={sampledp} className='picture' alt="dp" height='230px' style={{borderRadius:'100%'}}/>
                        <div className="overlay">
                            <div className="change-profile">
                                <FontAwesomeIcon icon={faCamera} style={{color: "#ffffff", cursor:'pointer', fontSize:'50px'}} />
                            </div>
                        </div>
                    </div>
                        
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Name:</span> Zziwa Raymond</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Username:@</span> zray</p>
                    </Col>
                    <Col sm='12' md='4' lg='4' xl='4'>
                    <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Contact 1:</span> 0775149572</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Contact 2:</span> 0775563805</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Address:</span> Kira</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Gender:</span> Male</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Branch:</span> Masanafu</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Department:</span> Production</p>
                        <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Role:</span> Welder</p>
                    </Col>
                    <Col sm='12' md='4' lg='4' xl='4' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPwd(e.target.value)} required/>
                                <label for="floatingPassword">Enter Old Password</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPwd(e.target.value)} required/>
                                <label for="floatingPassword">New Password</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={confirmPwdHandler} ref={confirmPasswordRef} required/>
                                <label for="floatingPassword">Confirm New Password</label>
                                {arePasswordsMatching && <span style={{fontSize:'12px',color:'red'}}>{arePasswordsMatching}</span>} <br></br>
                                {passwordShown === false ? <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span> : <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEyeSlash} /> hide password</span>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} className={typeof arePasswordsMatching === 'string' ? 'disabled' : ''} disabled={isDisabled} >UPDATE PASSWORD</button>
                        </div>
                    </Col>
                 </Row>
             </Col>
         </Row>
        </div>
     )
}
export default UserProfile