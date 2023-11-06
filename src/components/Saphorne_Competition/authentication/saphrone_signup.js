import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import './auth.css'
import axios from "axios";

const SaphroneSignUp = ({handleTabClick}) => {
    const [username, setUsername] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [gender, setGender] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [arePasswordsMatching, setArePasswordsMatching] = useState(undefined)
    const confirmPasswordRef = useRef()

    const [reqStatus, setReqStatus] = useState()
    const [serverMsg, setServerMsg] = useState('')

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
        }else if(confirmPasswordRef.current.value.length < 8){
            setArePasswordsMatching('Password has less than 8 characters.')
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
            setArePasswordsMatching('')
        }     
    }

    const signUpHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/newsaphroneparticipantregistration',{
            username: username.trim(),
            fName: fName.toUpperCase().trim(),
            lName: lName.toUpperCase().trim(),
            gender: gender,
            password: confirmPwd,
            dateofregistration: new Date().toLocaleString()
        })
        if(res.data){
            setReqStatus(res.data.status)
            setServerMsg(res.data.msg)
        }
    }

    return(
        <Form>
            {reqStatus === 200 && <p style={{ margin: '5px',wordWrap:'break-word', width:'358px' }} className="alert alert-success" role="alert">{serverMsg}</p>}
            {reqStatus === 403 && <p style={{ margin: '5px',wordWrap:'break-word', width:'358px' }} className="alert alert-danger" role="alert">{serverMsg}</p>}
            <div style={{ padding: "30px", borderRadius: "10px" }}>
                <>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setUsername(e.target.value)} required/>
                            <label for="floatingPassword">Username</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setFName(e.target.value)} required/>
                            <label for="floatingPassword">First Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating" id='saphroneAuthInput'>
                            <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setLName(e.target.value)} required/>
                            <label for="floatingPassword">Last Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} onChange={(e)=>setGender(e.target.value)} required>
                                <option defaultValue>Select Your Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
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
                <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} className={typeof arePasswordsMatching === 'string' ? 'disabled' : ''} disabled={isDisabled} onClick={signUpHandler}>SIGN UP</button>
            </div>
            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#003366", cursor:'pointer' }}>Already have an account? <span style={{color:'#3E5AA7'}} onClick={() => handleTabClick('login')}>Login</span></p>
        </div>
       </Form>
    )
}
export default SaphroneSignUp