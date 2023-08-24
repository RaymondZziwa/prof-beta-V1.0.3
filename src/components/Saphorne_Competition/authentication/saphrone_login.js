import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { useState } from "react";
import './auth.css'

const SaphroneLoginForm = ({handleTabClick}) => {
    const [passwordShown, setPasswordShown] = useState(false)

    const showPwd = event => {
        event.preventDefault()
        setPasswordShown(!passwordShown);
    }
    
    return (
        <Form>
                 <div style={{ padding: "30px", borderRadius: "10px" }}>
                        <>
                            <div className="mb-3">
                                <div className="form-floating" id='saphroneAuthInput'>
                                    <input className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating" id='saphroneAuthInput'>
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                    {passwordShown === false ? <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span> : <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEyeSlash} /> hide password</span>}
                                </div>
                            </div>
                        </>
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} >LOGIN</button>
                    </div>
                    <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#003366", cursor:'pointer' }}>Create an account <span style={{color:'#3E5AA7'}} onClick={() => handleTabClick('signup')}>Signup now</span></p>
                </div>
        </Form>
    )
}

export default SaphroneLoginForm