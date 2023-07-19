import axios from 'axios'
import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import AdminNavbar from '../../side navbar/adminnavbar'

const Registerpersonnel = () => {
    const [status, setStatus] = useState({})
    const [username, setusername] = useState('')
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [branch, setbranch] = useState('')
    const [dob, setdob] = useState('')
    const [contact, setcontact] = useState('')
    const [email, setemail] = useState('')
    const [gender, setgender] = useState('')
    const [pwd, setpwd] = useState('')

    const [msg, setmsg] = useState('')

    const pwdInput = event => {
        event.preventDefault()
        setpwd(event.target.value)
    }
    const genderInput = event => {
        event.preventDefault()
        setgender(event.target.value)
    }
    const emailInput = event => {
        event.preventDefault()
        setemail(event.target.value)
    }
    const contactInput = event => {
        event.preventDefault()
        setcontact(event.target.value)
    }
    const dobInput = event => {
        event.preventDefault()
        setdob(event.target.value)
    }
    const branchInput = event => {
        event.preventDefault()
        setbranch(event.target.value)
    }
    const lnameInput = event => {
        event.preventDefault()
        setlname(event.target.value)
    }
    const fnameInput = event => {
        event.preventDefault()
        setfname(event.target.value)
    }
    const usernameInput = event => {
        event.preventDefault()
        setusername(event.target.value)
    }

    const registerPersonnelHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registersupervisor', {
            username: username,
            firstname: fname,
            lastname: lname,
            branch: branch,
            dob: dob,
            contact: contact,
            email: email,
            gender: gender,
            password: pwd,
            token: localStorage.getItem("token")
        })
            .then(() => setStatus({ type: 'success' }))
            .catch((err) => setStatus({ type: 'error', err }))
    }
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <AdminNavbar />
                </Col>

                <Col sm='12' md='8' lg='8' xl='8'>
                    <div className="container min-vh-100 d-flex align-items-center">
                        <Form>
                            {status?.type === 'success' && <span style={{ marginTop: '20px' }} class="alert alert-success" role="alert">Operation successful</span>}
                            {status?.type === 'error' && <span style={{ marginTop: '20px' }} class="alert alert-danger" role="alert">Error!</span>}
                            <div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={usernameInput} />
                                        <label for="floatingInput">username</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={fnameInput} />
                                        <label for="floatingInput">First Name</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={lnameInput} />
                                        <label for="floatingInput">Last Name</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={branchInput} />
                                        <label for="floatingInput">Branch</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={dobInput} />
                                        <label for="floatingInput">Date Of Birth</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={contactInput} />
                                        <label for="floatingInput">Contact</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={emailInput} />
                                        <label for="floatingInput">Email</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={genderInput}>
                                        <option selected>Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE;" }} />
                                <label for="floatingInput">One-time Password</label>
                            </div>
                        </div>     */}
                                <div className="mb-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE;" }} onChange={pwdInput} />
                                        <label for="floatingInput">One-time Password</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }} onClick={registerPersonnelHandler}>REGISTER</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Registerpersonnel