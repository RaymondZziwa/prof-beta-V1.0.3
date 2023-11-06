import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../side navbar/sidenav";

const AccountSettings = () => {
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
                                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" required/>
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
                                <button className="btn btn-outline-primary" style={{marginTop:'10px'}}>Reset Username</button>
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
                                <button className="btn btn-outline-primary" style={{marginTop:'10px'}}>Reset Password</button>
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