import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { useState } from "react";
import './auth.css'
import axios from "axios";
import { tokenMgtActions } from "../store/store";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

const SaphroneLoginForm = ({handleTabClick}) => {
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)
    const [serverMsg, setServerMsg] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const showPwd = event => {
        event.preventDefault()
        setPasswordShown(!passwordShown);
    } 
    
    const loginHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saphroneparticipantlogin',{
            username: username.trim(),
            password: pwd
        })
        if(res.data.status === 200){
            const token = res.data.token
            const employeeId = res.data.employeeId
            const userData = res.data.userData
            if(token && employeeId){
                dispatch(tokenMgtActions.saveUserLogInData({token, employeeId}))
                localStorage.setItem('saphroneAuthToken', token)
            }
            if(res.data.branch){
                 dispatch(tokenMgtActions.saveUserData(userData))
                 history.replace('/saphroneparticipantdashboard')
            }else{
                 dispatch(tokenMgtActions.saveUserData(userData))
                 history.replace('/completeuserprofile')
            }
        }else{
            setServerMsg(res.data.msg)
        }
    }

    return (
        <Form>  
                {serverMsg.length > 0 && <p style={{ margin: '5px',wordWrap:'break-word', width:'358px', textAlign:'center' }} className="alert alert-danger" role="alert">{serverMsg}</p>}
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
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPwd(e.target.value)} required/>
                                    <label for="floatingPassword">Password</label>
                                    {passwordShown === false ? <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span> : <span style={{ color: '#003366', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEyeSlash} /> hide password</span>}
                                </div>
                            </div>
                        </>
                    <div className="mb-3">
                        <button id='auth-btn' style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} onClick={loginHandler}>LOGIN</button>
                    </div>
                    <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#003366", cursor:'pointer' }}>Create an account <span style={{color:'#3E5AA7'}} onClick={() => handleTabClick('signup')}>Signup now</span></p>
                </div>
        </Form>
    )
}

export default SaphroneLoginForm