import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SaveParticipantSale = () => {
    const [participants, setParticipants] = useState([])
    const [employeeId, setEmployeeId] = useState('')
    const [quantitySold, setQuantitySold] = useState('')
    const [points, setPoints] = useState(0)
    const [status, setStatus] = useState('')

    useEffect(()=>{
        setPoints(quantitySold*0.5)
    },[quantitySold])

    useEffect(()=>{
        const fetchAllParticipants = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallparticipants',{
            token: localStorage.getItem('token')
        })
        if(Array.isArray(res.data)){
            setParticipants(res.data)
        }
        }
        fetchAllParticipants()
    },[])

    const saveRecord = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveparticipantsale',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleDateString(),
            employeeId: employeeId,
            quantitySold: quantitySold,
            points: points
        })
        .then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row> 
            <Col sm='12' md='1' lg='1' xl='1'>
                <Navbar />
            </Col>
            <Col sm='12' md='10' lg='10' xl='10' style={{marginTop:'60px'}}>
                <h2 style={{textAlign:'center'}}>Save Participant Sale</h2>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px" }} onChange={(e)=>setEmployeeId(e.target.value)} required>
                    <option selected>Select Participant</option>   
                    { !participants ? <option>Loading Items From Database</option> :
                            participants.map(item => (
                                <option key={item.employeeId} value={item.employeeId}>
                                    {item.firstName} {item.lastName}
                                </option>
                            ))
                    } 
                </select>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={(e)=>setQuantitySold(e.target.value)}  required />
                    <label for="floatingInput">Quantity Sold</label>
                </div>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput"  placeholder="Quantity" value={points} readOnly/>
                    <label for="floatingInput">Total Points</label>
                </div>
                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveRecord}>
                    Save Data
                </button>
            </Col>
            <Col sm='12' md='1' lg='1' xl='1'>
            </Col>
        </Row>
    )
}
export default SaveParticipantSale