import axios from "axios"
import { useState, useEffect } from "react"
import { Row, Col, Form } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import StartBatchProcess from "./register_batch";
import UpdateBatchStatus from "./update_batch_stage";

const ManageBatch = () => {
    const [formType, setFormType] = useState('none')

    const formTypeHandler = event => {
        event.preventDefault()
        setFormType(event.target.value)
    }

    const fetchAllRequisitionNumbers = async () => {
        const res = await axios.post('http://82.180.136.230:3005/farmrequisitionnumbers', {
            token: localStorage.getItem('token')
        })
    }

    useEffect(() => {
        fetchAllRequisitionNumbers()
    }, [])
    
    return(
            <Row>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
                <Col className="col align-self-center" style={{marginTop:'60px'}}>
                    <h3 style={{textAlign:'center'}}>Start / Update Batch </h3>

                    <div className="form-floating mb-3">
                        <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={formTypeHandler} required>
                        <option defaultValue>Choose form type</option>
                            <option value='register'>Start</option>
                            <option value='monitor'>Update</option>
                        </select>
                    </div>

                    <Form>
                        {formType === 'register' && 
                            <StartBatchProcess /> 
                        }
                        {formType === 'monitor' && 
                            <UpdateBatchStatus />
                        }
                    </Form>
                </Col>
            </Row>
    )
}

export default ManageBatch