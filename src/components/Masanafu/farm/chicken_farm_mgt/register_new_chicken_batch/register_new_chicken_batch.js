import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const RegisterNewChickenBatch = () => {
    const [date, setDate] = useState()
    const [quantity, setquantity] = useState(0)
    const [unitPrice, setUnitPrice] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)

    const [moreInfo, setMoreInfo] = useState('')
    const [status, setStatus] = useState('')

    const externalSourceInfoInput = event => {
        event.preventDefault()
        setMoreInfo(event.target.value)
    }

    const quantityInput = event => {
        event.preventDefault()
        setquantity(event.target.value)
    }

    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setDate(date)
    },[])

    const unitPriceInput = event => {
        event.preventDefault()
        setUnitPrice(event.target.value)
    }

    const saveChickenBatchData = async (event) => {
        let res = await axios.post('http://82.180.136.230:3005/savenewchickenbatchdata',{
            token: localStorage.getItem('token'),
            batchNumber: `CB-${Math.floor(Math.random()*18000)}`,
            date: date,
            quantity: quantity,
            unitPrice: unitPrice,
            totalSpent: unitPrice * quantity,
            notes: moreInfo
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Save New Chicken Batch Data</h1>
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={date} required readOnly/>
                    <label htmlFor="floatingInput">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={quantityInput} required />
                    <label for="floatingInput">Number of chicken</label>
                </div>
                <div className="form-floating mb-3">
                    <input type='number' className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={unitPriceInput} required />
                    <label for="floatingInput">unit price (UGX)</label>
                </div>

                <div className="mb-3">
                    <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' , marginTop:'10px'}} onChange={externalSourceInfoInput} />
                    </div>
                <button style={{ width: "86%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveChickenBatchData}>
                    Save Chicken Batch Data
                </button>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default RegisterNewChickenBatch