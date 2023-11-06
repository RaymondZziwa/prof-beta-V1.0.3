import { Row, Col, Form } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'

const MassageDailyIncomeSubmission = () => {
    const [records, setRecords] = useState([])
    const [status, setStatus] = useState('')
    const [massageAmount, setMassageAmount] = useState()
    const [productsAmount, setProductsAmount] = useState()
    const [deliveredTo, setDeliveredTo] = useState('')

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [status])

    const fetchAllSubmissionRecords = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallincomesubmissionrecords',{
            token: localStorage.getItem('token'),
        })

        if(Array.isArray(res.data)){
            setRecords(res.data)
        }
    }

    useEffect(()=>{
        fetchAllSubmissionRecords()
    },[])

    const onIncomeSubmission = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/submitmassageincome',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleDateString(),
            massageAmount: massageAmount,
            productsAmount: productsAmount,
            deliveredTo: deliveredTo,
            submittedBy: localStorage.getItem('username')
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
        fetchAllSubmissionRecords()
    }

return (
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'40px'}}>
        <h1 style={{textAlign:'center'}}>Daily Income Submission</h1>
        <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
                <h3 style={{textAlign:'center'}}>Submit Daily Income Form</h3>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <Form onSubmit={onIncomeSubmission}>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={new Date().toLocaleDateString()} required readOnly/>
                        <label htmlFor="floatingInput">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=> setMassageAmount(e.target.value)}  min='0' />
                        <label for="floatingInput">Amount Earned (Massage) </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=> setProductsAmount(e.target.value)} min='0' />
                        <label for="floatingInput">Amount Earned (Products)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input  className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={localStorage.getItem('username')}  readOnly />
                        <label for="floatingInput">Submitted By</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={(e)=> setDeliveredTo(e.target.value)} min='0' />
                        <label for="floatingInput">Delivered To</label>
                    </div>
                    <button
                        type="submit"
                        style={{
                        width: "88%",
                        border: "none",
                        color: "white",
                        height: "45px",
                        backgroundColor: "#3452A3"
                        }}
                    >
                        Submit
                    </button>
                </Form>
            </Col> 
            <Col sm='12' md='8' lg='8' xl='8'>
                <h3 style={{textAlign:'center'}}>View Submission Records</h3>
                <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Submission Id</th>
                                    <th scope="col">Submission Date</th>
                                    <th scope="col">Amount From Massage (UGX)</th>
                                    <th scope="col">Amount From Products (UGX)</th>
                                    <th scope="col">Submitted By</th>
                                    <th scope="col">Recieved By</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records ? records.map(item => (
                                    <tr>
                                        <td>{item.submissionId}</td>
                                        <td>{item.submissionDate}</td>
                                        <td>{item.massageamount}</td>
                                        <td>{item.productamount}</td>
                                        <td>{item.submittedBy}</td>
                                        <td>{item.receivedby}</td>
                                        <td>{item.submissionstatus}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
            </Col>
        </Row>
    </div>
    <Col sm='12' md='1' lg='1' xl='1'></Col>
</Row>
)
}

export default MassageDailyIncomeSubmission