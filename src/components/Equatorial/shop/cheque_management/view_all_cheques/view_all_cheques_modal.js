import { useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Modal from 'react-modal'
import EditChequeData from "../edit_cheque_data/edit_cheque_data";

const ViewAllChequesModal = ({chequeData, fetchAllChequeRecords}) => {
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [filteredData, setFilteredData] = useState([])
    const [drawerNames, setDrawerNames] = useState('')
    const [editableChequeData, setEditableChequeData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const filterChequeData = () => {
        const filteredCheques = chequeData.filter(cheque => {
            const chequeDate = new Date(cheque.BankingDate);
            return chequeDate >= new Date(fromDate) && chequeDate <= new Date(toDate);
          })

        setFilteredData(filteredCheques)
    }

    const filterByNames = (e) => {
        const drawerNames = e.target.value

        if(drawerNames.length > 0){
            const names = drawerNames.toUpperCase().trim()
            const filteredCheques = chequeData.filter(cheque => {
                return names === cheque.DrawerNames
            })
    
            setFilteredData(filteredCheques)
        }
    }

    const editChequeData = async (event) => {
        event.preventDefault()
        const chequeId = event.target.id;

        const chequeToEdit = chequeData.filter(cheque => {
            return chequeId === cheque.chequeId
        })

        setEditableChequeData(chequeToEdit)

        if(editableChequeData){
            setIsModalOpen(true)
        }
    }

    const deleteChequeData = async (event) => {
        event.preventDefault();
        const chequeId = event.target.id;
        try {
            let res = await axios.post('http://82.180.136.230:3005/deletechequedata', {
                token: localStorage.getItem('token'),
                chequeId: chequeId
            });
            await fetchAllChequeRecords();
        } catch (error) {
            console.error('Error deleting cheque data:', error);

        }
    }




    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
            <button onClick={window.print}>Print</button>
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
        <div className="mb-3">
            <div className="form-floating">
                <input className="form-control" id="floatingPassword" placeholder="Password" onChange={filterByNames} required/>
                <label for="floatingPassword">Filter By Drawer's Names</label>
            </div>
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
                <th scope="col">Cheque Recorded By</th>
                <th scope="col">Notes</th>
                <th scope="col">Cheque Status</th>
                <th scope="col">Action</th>
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
                    <td>
                        {/* <button id={data.chequeId} onClick={editChequeData}>Edit</button> */}
                        <button id={data.chequeId} onClick={deleteChequeData}>Delete</button>
                    </td>
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
                        <td>
                            {/* <button id={data.chequeId} onClick={editChequeData}>Edit</button> */}
                            <button id={data.chequeId} onClick={deleteChequeData}>Delete</button>
                        </td>
                    </tr>
            ))}
        </tbody>
        </table>
        {/* Modal */}
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
        >
            <h2 style={{textAlign:'center'}}>Edit Cheque Data</h2>
            <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeModal}>Close</button>
            <EditChequeData editableChequeData={editableChequeData} fetchAllChequeRecords={fetchAllChequeRecords}/>
        </Modal>
        </>
    )
}
export default ViewAllChequesModal