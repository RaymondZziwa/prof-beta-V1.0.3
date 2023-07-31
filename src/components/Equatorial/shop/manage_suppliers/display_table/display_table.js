import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1, faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import PaySupplier from '../supplier_payments/pay_supplier'
import ViewPaymentRecords from '../view_payment_records/view_payment_records'

const DisplayTable = ({records, filteredRecords, fetchAllSubmissionRecords}) => {
    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedSupplyId, setSelectedSupplyId] = useState(null)
    const [clientRecords, setClientRecords] = useState([])
    const [clientName, setClientName] = useState('')
    const [fName, setFName] = useState('')
    const [mName, setMName] = useState('')
    const [lName, setLName] = useState('')

    const openPayModal = (event) => {
        setSelectedSupplyId(event.target.id)
        if(selectedSupplyId){
            setIsPayModalOpen(true)
        }
    }

    const closePayModal = () => {
       // setFilteredRecords(null);
        setIsPayModalOpen(false);
        fetchAllSubmissionRecords()
    }

    const openViewModal = (event) => {
        setSelectedSupplyId(event.target.id)
        if(selectedSupplyId){
            setIsViewModalOpen(true)
        }
    }

    const closeViewModal = () => {
        //setFilteredRecords(null);
        setIsViewModalOpen(false);
        fetchAllSubmissionRecords()
    }

    useEffect(()=>{
        setClientName(`${fName.toUpperCase().trim()} ${mName.toUpperCase().trim()} ${lName.toUpperCase().trim()}`)   
    },[fName, mName, lName])

    const dataFilterHandler = event => {
        event.preventDefault()
        if(clientName){
            console.log(clientName)

            const filteredSubscriptionData = records.filter(
                (data) => data.suppliernames === clientName
              );
              setClientRecords(filteredSubscriptionData)
        }
    }
    return (
        <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setFName(event.target.value)}/>
                <label for="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setMName(event.target.value)}/>
                <label for="floatingInput">Middle Name</label>
            </div>
            <div className="form-floating mb-3" >
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} onChange={(event)=> setLName(event.target.value)}/>
                <label for="floatingInput">Last Name</label>
            </div>
            <button className="btn btn-primary" style={{height:'50px'}} onClick={dataFilterHandler}>Retrieve</button>
        </div>
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
                                        <th scope="col">Status</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Cheque Number</th>
                                        <th scope="col">Recieved By</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientRecords && clientRecords.length > 0 ? (
                                        clientRecords.map((item) => (
                                            <tr key={item.supplyId}>
                                            <td>{item.supplyId}</td>
                                            <td>{item.supplydate}</td>
                                            <td>{item.suppliernames}</td>
                                            <td>{item.branchsupplied}</td>
                                            <td>{item.itemsupplied}</td>
                                            <td>{item.quantitysupplied} {item.units}</td>
                                            <td>{item.totalsupplycost}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.paymentstatus}</td>
                                            <td>{item.paymentmethod}</td>
                                            <td>{item.transactionId}</td>
                                            <td>{item.chequenumber}</td>
                                            <td>{item.receivedBy}</td>
                                            <td>{item.notes}</td>
                                            <td>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openPayModal} id={item.supplyId}>Pay <FontAwesomeIcon icon={faMoneyBill1} beat /></p>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openViewModal} id={item.supplyId}>View Payment Record<FontAwesomeIcon icon={faEye} beat /></p>
                                            </td>
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
                                            <td>{item.paymentstatus}</td>
                                            <td>{item.paymentmethod}</td>
                                            <td>{item.transactionId}</td>
                                            <td>{item.chequenumber}</td>
                                            <td>{item.receivedBy}</td>
                                            <td>{item.notes}</td>
                                            <td>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openPayModal} id={item.supplyId}>Pay <FontAwesomeIcon icon={faMoneyBill1} beat /></p>
                                                <p style={{color:'blue', cursor: 'pointer' }} onClick={openViewModal} id={item.supplyId}>View Payment Record<FontAwesomeIcon icon={faEye} beat /></p>
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
        <PaySupplier supplyId={selectedSupplyId}/>
    </Modal>
    {/* Modal */}
    <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        //contentLabel="Subscription Details"
    >
        <h2 style={{textAlign:'center'}}>View Supply Payment Record</h2>
        <button className='btn btn-danger' style={{float:'right', marginBottom:'20px'}} onClick={closeViewModal}>Close</button>
        <ViewPaymentRecords supplyId={selectedSupplyId} />
    </Modal>
        </>
    )
}
export default DisplayTable