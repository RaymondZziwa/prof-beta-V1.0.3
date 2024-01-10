import { Row, Col } from "react-bootstrap";
import '../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../side navbar/sidenav";
import { useState } from "react";
import axios from "axios";
import { Password } from "@mui/icons-material";

const AccountSettings = () => {
    const [oldUserName, setOldUserName] = useState('')
    const [newUserName, setNewUserName] = useState('')
    const [confirmNewUserName, setConfirmUserName] = useState('')

    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [confirmNewPwd, setConfirmNewPwd] = useState('')

    const [passwordMatch, setPasswordMatch] = useState(false)

    const validatedPassword = () => {
        if (newPwd === confirmNewPwd) setPasswordMatch(true)
    }
    
    const resetUsername = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/resetusername', {
            token: localStorage.getItem('token'),
            oldUserName: oldUserName,
            newUserName: newUserName
        })
    }
    const resetPassword = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/resetpassword', {
            token: localStorage.getItem('token'),
            username: oldUserName,
            oldPassword: oldPwd,
            password: confirmNewPwd
        })
    }
    
    return(
        <div className='container-fluid'>
            <Row>
                <Col sm='2' md='2' lg='2' xl='2'></Col>

                <Col sm='12' md='8' lg='8' xl='8'>
                    <div>
                        <div style={{ padding: "30px", borderRadius: "10px", marginTop:'50px', textAlign:'center' }}>
                        <form style={{marginTop:'10px'}}> 
                                <h4>Change Username</h4>
                                <div className="form-floating">
                                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={localStorage.getItem('username')} readOnly/>
                                    <label for="floatingInput">Old Username</label>
                                </div><br></br>
                                <div className="form-floating">
                                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                    <label for="floatingPassword">New Username</label>
                                </div><br></br>
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                    <label for="floatingPassword">Confirm New Username</label>
                                </div><br></br>
                                <button className="btn btn-outline-primary" style={{marginTop:'10px'}} onClick={resetUsername}>Reset Username</button>
                            </form>

                            <form style={{marginTop:'10px'}}> 
                                <h4>Reset Password</h4>
                                <div className="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                    <label for="floatingInput">Old Password</label>
                                </div><br></br>
                                <div className="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                    <label for="floatingPassword">New Password</label>
                                </div><br></br>
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
                                    <label for="floatingPassword">Confirm New Password</label>
                                </div><br></br>
                                <button className="btn btn-outline-primary" style={{marginTop:'10px'}} onClick={resetPassword}>Reset Password</button>
                            </form>

                            
                        </div>
                    </div>
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    )
}

export default AccountSettings