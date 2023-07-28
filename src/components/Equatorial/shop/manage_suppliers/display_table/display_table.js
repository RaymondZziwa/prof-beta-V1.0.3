import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1, faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

const DisplayTable = ({records, filteredRecords}) => {
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const openPayModal = () => {
        setIsPayModalOpen(true)
    }

    const closePayModal = () => {
       // setFilteredRecords(null);
        setIsPayModalOpen(false);
    }

    const openViewModal = () => {
        setIsViewModalOpen(true)
    }

    const closeViewModal = () => {
        //setFilteredRecords(null);
        setIsViewModalOpen(false);
    }
    return (
        <>
                    <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                                <thead style={{ textAlign: 'center' }}>
                                    <tr>
                                        <th scope="col">Supply Id</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Names</th>
                                        <th scope="col">Branch Supplied</th>
                                        <th scope="col">Item Supplied</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Amount (UGX)</th>
                                        <th scope="col">Balance (UGX)</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Cheque Number</th>
                                        <th scope="col">Recieved By</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRecords && filteredRecords.length > 0 ? (
                                        filteredRecords.map((item) => (
                                        <tr key={item.submissionId}>
                                            <td style={{color:'blue', cursor: 'pointer', textDecoration:'underline'}}>{item.submissionId}</td>
                                            <td>{item.submissionDate}</td>
                                            <td>{item.massageamount}</td>
                                            <td>{item.productamount}</td>
                                            <td>{item.submittedBy}</td>
                                            <td>{item.receivedby}</td>
                                            <td>{item.submissionstatus}</td>
                                        </tr>
                                        ))
                                    ) : records && records.length > 0 ? (
                                        records.map((item) => (
                                        <tr key={item.supplyId}>
                                            <td>{item.supplyId}</td>
                                            <td>{item.supplydate}</td>
                                            <td>{item.suppliernames}</td>
                                            <td>{item.branchsupplied}</td>
                                            <td>{item.itemsupplied}</td>
                                            <td>{item.quantitysupplied} {item.units}</td>
                                            <td>{item.totalsupplycost}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.paymentmethod}</td>
                                            <td>{item.paymentstatus}</td>
                                            <td>{item.transactionId}</td>
                                            <td>{item.chequenumber}</td>
                                            <td>{item.receivedBy}</td>
                                            <td>{item.notes}</td>
                                            <td>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openPayModal}>Pay <FontAwesomeIcon icon={faMoneyBill1} beat /></p>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openViewModal}>View Payment Record<FontAwesomeIcon icon={faEye} beat /></p>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='15'>No supplier data....</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            {/* Modal */}
        <Modal
        isOpen={isPayModalOpen}
        onRequestClose={closeViewModal}
        //contentLabel="Subscription Details"
    >
        <h2 style={{textAlign:'center'}}>Pay Supplier</h2>
        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closePayModal}>Close</button>
    </Modal>
    {/* Modal */}
    <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        //contentLabel="Subscription Details"
    >
        <h2 style={{textAlign:'center'}}>View Supply Payment Record</h2>
        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeViewModal}>Close</button>
    </Modal>
        </>
    )
}
export default DisplayTable