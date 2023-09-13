import { Form } from "react-bootstrap";
import logo from '../../imgs/logo.png'
import './login.css'
import { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import award from '../../imgs/award.gif'
import { Link } from 'react-router-dom'

const Login = () => {
    const [branch, setBranch] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [loginStatus, setloginStatus] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [department, setDepartment] = useState('')
    const [role, setRole] = useState('')
    const history = useHistory()


    const authCtx = useContext(AuthContext)



    const handleBranchData = (event) => {
        event.preventDefault()
        setBranch(event.target.value)
    }
    const handleUsernameData = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }
    const handlePwdData = (event) => {
        event.preventDefault()
        setPwd(event.target.value)
    }
    const handleDeptData = (event) => {
        event.preventDefault()
        setDepartment(event.target.value)
    }
    const handleRoleData = (event) => {
        event.preventDefault()
        setRole(event.target.value)
    }
    const showPwd = event => {
        event.preventDefault()
        setPasswordShown(!passwordShown);
    }
    const loginHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/login', {
            branch: branch,
            department: department,
            role: role,
            username: username.trim(),
            password: pwd
        })
        if (typeof res.data === "string") {
            setloginStatus(res.data)
        } else {
            const { redirectPath, token, user, department, role } = res.data;
            authCtx.login(token)
            localStorage.setItem("username", user);
            localStorage.setItem("branch", branch);
            localStorage.setItem("department", department);
            localStorage.setItem("role", role);
            localStorage.setItem("home", redirectPath)
            localStorage.setItem("isUserLoggedIn", true)
            history.replace(redirectPath)
        }
    }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="mb-3">
                     <img src={logo} alt="logo" fetchpriority="high" width="350px" height="180px" headers={{ "Cache-Control": "max-age=3600" }}/>
                     <p style={{ color: "#3452A3", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "22px" }} className="login-header">PROF BIORESEARCH</p>
                     {loginStatus && <span style={{ marginTop: '2px' }} className="alert alert-danger" role="alert">{loginStatus}</span>}
                     <Form>
                 <div style={{ backgroundColor: "#8CA6FE", padding: "30px", borderRadius: "10px" }}>
                     <div className="mb-3">
                         <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleBranchData}>
                             <option defaultValue>Branch</option>
                         <option value="admin">Administrator</option>
                            <option value="namungoona">Namungoona</option>
                             <option value="masanafu">Masanafu</option>
                             <option value="equatorial">Equatorial</option>
                             <option value="buwama">Buwama</option>
                         </select>
                     </div>
                     {branch === 'namungoona' &&
                        <>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                            </div>
                        </>
                    }
                    {branch === 'admin' &&
                        <>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                            </div>
                        </>
                    }
                    {branch === 'masanafu' &&
                        <>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleDeptData}>
                                        <option defaultValue>Department</option>
                                        <option value="production">Production</option>
                                        <option value="farm">Farm</option>
                                        <option value="chickenfarm">Chicken Farm</option>
                                        <option value="projects">Projects</option>
                                        <option value="Shop">Shop</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleRoleData}>
                                        <option defaultValue>Role</option>
                                        <option value="custodian">Production Custodian</option>
                                        <option value="manager">Production Manager</option>
                                        <option value="farmmanager">Farm Manager</option>
                                        <option value="projectsmanager">Projects Manager</option>
                                        <option value="shopmanager">Shop Manager</option>
                                        <option value="chickenfarmmanager">Chicken Farm Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                            </div>
                        </>
                    }
                    {branch === 'equatorial' &&
                        <>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleDeptData}>
                                        <option defaultValue>Department</option>
                                        <option value="shop">Main Shop</option>
                                        <option value="labelling">Labelling Department</option>
                                        <option value="projects">Projects</option>
                                        <option value="massage">Massage</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleRoleData}>
                                        <option defaultValue>Role</option>
                                        <option value="equatoriallabellingmanager">Labelling Manager</option>
                                        <option value="equatorialprojectsmanager">Projects Manager</option>
                                        <option value="equatorialshopmanager">Shop Manager</option>
                                        <option value="massagemanager">Massage Manager</option>
                                        <option value="equatorialdebtmanager">Debt Manager</option>
                                        <option value="equatorialinventorycustodian">Inventory Custodian</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                            </div>
                        </>
                    }
                    {branch === 'buwama' &&
                        <>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleDeptData}>
                                        <option defaultValue>Department</option>
                                        <option value="farm">Farm</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={handleRoleData}>
                                        <option defaultValue>Role</option>
                                        <option value="farmmanager">Farm Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={handleUsernameData} />
                                    <label for="floatingInput">Username</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePwdData} />
                                    <label for="floatingPassword">Password</label>
                                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={showPwd}><FontAwesomeIcon icon={faEye} /> show password</span>
                                </div>
                            </div>
                        </>
                    }
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }} onClick={loginHandler}>LOGIN</button>
                    </div>
                </div>
                     </Form>
                        <Link to="/profbioresearchsaphronecompetitionauth" style={{textDecoration:'none'}}>
                            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7", cursor:'pointer' }}>Join The Saffron Competition <img src={award} alt="award" height="50px"/>Here</p>
                        </Link> 
                        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}>Terms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy</p>
                </div>
            </div>
        </div>

    )
}

export default Login;