import { useState } from "react"
import axios from 'axios'

const SaveNewChequeData = ({setStatus, fetchAllChequeRecords}) => {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contact, setContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [chequeNumber, setChequeNumber] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState(0)
    const [bankingDate, setBankingDate] = useState('')
    const [notes, setNotes] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let res = await axios.post('http://82.180.136.230:3005/savechequedata',{
                token: localStorage.getItem('token'),
                drawerNames: `${fName.toLocaleUpperCase().trim()} ${lName.toUpperCase().trim()}`,
                drawerContact: contact,
                bankName: bankName,
                chequeNumber: chequeNumber,
                reason: reason,
                amount: amount,
                dateIssued: new Date().toLocaleDateString(), 
                chequeIssuedBy: localStorage.getItem('username'),
                bankingDate: bankingDate,
                notes: notes
            })
            
            setStatus({ type: 'success' })
            fetchAllChequeRecords()
        } catch (error) {
            setStatus({ type: 'error', err: error });
        }
    }
    

    return(
        <form>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    Drawer's First Name
                </label>
                <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={(e)=>setFName(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    Drawer's Last Name
                </label>
                <input
                type="text"
                className="form-control"
                id="firstName"
                onChange={(e)=>setLName(e.target.value)}
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
                onChange={(e)=>setNotes(e.target.value)}
                required
                ></textarea>
            </div>
            <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop:'5px'}} onClick={handleSubmit}>
                Save Cheque Data
            </button>
        </form>
    )
}
export default SaveNewChequeData