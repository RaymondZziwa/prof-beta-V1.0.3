import axios from "axios"
import { useState, useEffect} from "react"
import { Row, Col } from "react-bootstrap"

const EditChequeData = ({editableChequeData, fetchAllChequeRecords}) => {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contact, setContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [chequeNumber, setChequeNumber] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState(0)
    const [bankingDate, setBankingDate] = useState('')
    const [notes, setNotes] = useState('')
    const [status, setStatus] = useState('')

    useEffect(()=>{
        if(editableChequeData){
            setFName(editableChequeData[0].DrawerNames)
            setContact(editableChequeData[0].DrawerContact)
            setBankName(editableChequeData[0].BankName)
            setChequeNumber(editableChequeData[0].chequeNumber)
            setReason(editableChequeData[0].PaymentReason)
            setAmount(editableChequeData[0].amount)
            setBankingDate(editableChequeData[0].BankingDate)
            setNotes(editableChequeData[0].Notes)
        }
    },[editableChequeData])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let res = await axios.post('http://82.180.136.230:3005/updatechequedata',{
                token: localStorage.getItem('token'),
                chequeId: editableChequeData[0].chequeId,
                drawerNames: fName,
                drawerContact: contact,
                bankName: bankName,
                chequeNumber: chequeNumber,
                reason: reason,
                amount: amount,
                bankingDate: bankingDate,
                notes: notes
            })
            
            setStatus({ type: 'success' })
            await fetchAllChequeRecords()
        } catch (error) {
            console.log(error)
            setStatus({ type: 'error', err: error });
        }
    }

    return(
        <Row>
            <Col sm='12' md='3' lg='3' xl='3'></Col>
            <Col sm='12' md='6' lg='6' xl='6'>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <form>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Drawer's Name
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={fName}
                    onChange={(e)=>setFName(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Drawer's Contact
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={contact}
                    onChange={(e)=>setContact(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Bank Name
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={bankName}
                    onChange={(e)=>setBankName(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Cheque Number
                    </label>
                    <input
                    className="form-control"
                    id="firstName"
                    value={chequeNumber}
                    onChange={(e)=>setChequeNumber(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Payment Reason
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={reason}
                    onChange={(e)=>setReason(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Amount (UGX)
                    </label>
                    <input
                    className="form-control"
                    id="firstName"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Banking Date
                    </label>
                    <input
                    type="date"
                    className="form-control"
                    id="firstName"
                    value={bankingDate}
                    onChange={(e)=>setBankingDate(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        Notes
                    </label>
                    <textarea
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={notes}
                    onChange={(e)=>setNotes(e.target.value)}
                    required
                    ></textarea>
                </div>
                <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'5px'}} onClick={handleSubmit}>
                    Update Cheque Data
                </button>
            </form>
            </Col>
        </Row>
    )
}

export default EditChequeData