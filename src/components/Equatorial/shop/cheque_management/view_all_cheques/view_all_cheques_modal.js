import { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ViewAllChequesModal = ({chequeData}) => {
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [filteredData, setFilteredData] = useState([])

    const filterChequeData = () => {
        const filteredCheques = chequeData.filter(cheque => {
            const chequeDate = new Date(cheque.BankingDate);
            return chequeDate >= new Date(fromDate) && chequeDate <= new Date(toDate);
          })

        setFilteredData(filteredCheques)
    }


    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
            <div className="mb-3">
            <label htmlFor="fromDate" className="form-label" style={{ marginRight: '5px' }}>
                From
            </label>
            <input
                type="date"
                className="form-control"
                id="fromDate"
                onChange={(e) => setFromDate(e.target.value)}
                required
            />
            </div>
        </div>
        -
        <div style={{ marginLeft: '10px' }}>
            <div className="mb-3">
            <label htmlFor="toDate" className="form-label" style={{ marginRight: '5px' }}>
                To
            </label>
            <input
                type="date"
                className="form-control"
                id="toDate"
                onChange={(e) => setToDate(e.target.value)}
                required
            />
            </div>
        </div>
        </div>
        <button className="btn btn-primary" onClick={filterChequeData}><FontAwesomeIcon icon={faFilter} fade style={{color: "white"}} />Filter</button>
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
            </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
            {(!filteredData.length > 0) ? chequeData.map(data =>
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
                </tr>
            ):(
                filteredData.map(data =>
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
                    </tr>
            ))}
        </tbody>
        </table>
        </>
    )
}
export default ViewAllChequesModal