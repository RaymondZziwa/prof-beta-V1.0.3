import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const DisplayTodayCheques = ({chequeData, openModal, fetchAllChequeRecords}) => {

    const confirmChequePayment = async (event) => {
        let res = await axios.post('http://82.180.136.230:3005/markchequeaspaid',{
            token: localStorage.getItem('token'),
            chequeId: event.target.id
        })
        .then(fetchAllChequeRecords)
    }

    const rejectChequePayment = async (event) => {
        let res = await axios.post('http://82.180.136.230:3005/markchequeasbounced',{
            token: localStorage.getItem('token'),
            chequeId: event.target.id
        })
        .then(fetchAllChequeRecords)
    }

    return(
        <>
            <div style={{float:'right', color:'blue', textDecoration:'underline', cursor:'pointer'}} onClick={openModal}>
                View All Cheques
            </div>
            <table className="table table-light" style={{ marginTop: '2px' }}>
            <thead>
                <tr>
                    <th scope="col">Cheque Number</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Drawer's Names</th>
                    <th scope="col">Drawer's Contact</th>
                    <th scope="col">Payment Reason</th>
                    <th scope="col">Amount Paid (UGX)</th>
                    <th scope="col">Date Issued</th>
                    <th scope="col">Banking Date</th>
                    <th scope="col">Cheque Issued By</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Cheque Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                { chequeData.length > 0 ? chequeData.map(data =>
                    <tr key={data.chequeId}>
                        <td>{data.chequeNumber}</td>
                        <td>{data.BankName}</td>
                        <td>{data.DrawerNames}</td>
                        <td>{data.DrawerContact}</td>
                        <td>{data.PaymentReason}</td>
                        <td>{data.amount}</td>
                        <td>{data.DateIssued}</td>
                        <td>{data.BankingDate}</td>
                        <td>{data.ChequeIssuedBy}</td>
                        <td>{data.Notes}</td>
                        <td>{data.status}</td>
                        <td>
                        <button id={data.chequeId} className='btn btn-success' onClick={confirmChequePayment}><FontAwesomeIcon icon={faCheck} bounce style={{color: "white"}} onClick={(e) => e.stopPropagation()}/></button>
                        <button id={data.chequeId} className='btn btn-danger' style={{marginTop:'2px'}} onClick={rejectChequePayment}><FontAwesomeIcon icon={faCircleXmark} fade style={{color: "white"}} onClick={(e) => e.stopPropagation()}/></button>
                        </td>
                    </tr>
                ):(
                    <tr><td colSpan='12'>There are not cheques that are expected to be banked today.</td></tr>
                )}
            </tbody>
        </table>
        </>
    )
}
export default DisplayTodayCheques