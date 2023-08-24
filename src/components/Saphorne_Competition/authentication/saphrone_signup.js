import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { useState, useRef } from "react";
import './auth.css'

const SaphroneSignUp = ({handleTabClick}) => {
    const [passwordShown, setPasswordShown] = useState(false)
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [arePasswordsMatching, setArePasswordsMatching] = useState(undefined)
    const confirmPasswordRef = useRef()

    const [isDisabled, setIsDisabled] = useState(true)

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

    return(
        <Form>
            <div style={{ padding: "30px", borderRadius: "10px" }}>
                <>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                            <label for="floatingPassword">Username</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                            <label for="floatingPassword">First Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" required/>
                            <label for="floatingPassword">Last Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} required>
                                <option defaultValue>Select Your Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                    </div>

                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPwd(e.target.value)} required/>
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={confirmPwdHandler} ref={confirmPasswordRef} required/>
                            <label for="floatingPassword">Confirm Password</label>
                            {arePasswordsMatching && <span style={{fontSize:'12px',color:'red'}}>{arePasswordsMatching}</span>} <br></br>
                            {passwordShown === false ? <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span> : <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEyeSlash} /> hide password</span>}
                        </div>
                    </div>
                </>
            <div className="mb-3">
                <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} className={typeof arePasswordsMatching === 'string' ? 'disabled' : ''} disabled={isDisabled} >SIGN UP</button>
            </div>
            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#003366", cursor:'pointer' }}>Already have an account? <span style={{color:'#3E5AA7'}} onClick={() => handleTabClick('login')}>Login</span></p>
        </div>
       </Form>
    )
}
export default SaphroneSignUp