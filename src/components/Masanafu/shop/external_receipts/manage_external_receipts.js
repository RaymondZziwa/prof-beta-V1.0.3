import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from "axios"

const ManageExternalReceipts = () => {
    const [receiptNumber, setReceiptNumber] = useState()
    const [receiptItems, setReceiptItems] = useState()
    const [status, setStatus] = useState('')
    const [receiptData, setReceiptData] = useState()
    const [total, setTotal] = useState(0)
    const [issuedFromBranch, setIssuedFromBranch] = useState('')

    const [issuedFromDept, setIssuedFromDept] = useState('')


    const [issuedBy, setIssuedBy] = useState('')

    const [receiptDate, setReceiptDate] = useState('')
    const [receiptPaymentStatus, setReceiptPaymentStatus] = useState('')
    const [receiptCurrentStatus, setReceiptCurrentStatus] = useState('')

    const [clientFName, setClientFName] = useState('')
    const [clientMName, setClientMName] = useState('')
    const [clientLName, setClientLName] = useState('')
    const [clientContact, setClientContact] = useState('')

    const [additonalInfo, setAdditionalInfo] = useState('')

    const receiptNumberHandler = event => {
        event.preventDefault()
        setReceiptNumber(event.target.value)
    }

    const retrieveReceiptDataHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/fetchreceiptdata',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })
        console.log(res.data)
        setReceiptData(res.data)
    }

    const markReceiptAsDelivered = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/markreceiptasdelivered',{
            token: localStorage.getItem('token'),
            receiptNumber: receiptNumber
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    useEffect(()=>{
        if (receiptData) {
            console.log('rd', receiptData)
            setAdditionalInfo(receiptData[0].additionalinfo)

              setClientFName(receiptData[0].clientfirstname)
              setClientMName(receiptData[0].clientMName)
              setClientLName(receiptData[0].clientlastname)
              setClientContact(receiptData[0].clientcontact)

              setIssuedBy(receiptData[0].receiptissuedby)
              setReceiptDate(receiptData[0].receiptdate)
              setReceiptPaymentStatus(receiptData[0].receiptpaymentstatus)

              setReceiptCurrentStatus(receiptData[0].receiptdeliverystatus)
              setIssuedFromDept(receiptData[0].receiptissuedfromdepartment)
              setIssuedFromBranch(receiptData[0].receiptissuedfrombranch)
              setReceiptItems(receiptData[0].itemsattached)

            //  setClientContact(receiptData.clientfirstname)
        }

    }, [receiptData])

    useEffect(() => {
        if (receiptItems && typeof receiptItems === 'string') {
          const parsedItems = JSON.parse(receiptItems);
          const totalCost = parsedItems.reduce(
            (accumulator, item) => accumulator + item.totalCost,
            0
          );
          setTotal(totalCost);
        }
      }, [receiptItems]);

    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'40px'}}>
            <h1 style={{textAlign:'center'}}>Manage External Receipts</h1>
            <div className="form-floating mb-3">
                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  required onChange={receiptNumberHandler}/>
                <label htmlFor="floatingInput">Receipt Number</label>
            </div>
            <span>
                <button className="btn btn-primary" onClick={retrieveReceiptDataHandler}>
                    Retrieve Receipt Data
                </button>
            </span>

            <h3 style={{textAlign:'center'}}>Receipt Data</h3>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <h4>Receipt Issuer Information</h4>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={issuedFromBranch} required readOnly/>
                    <label htmlFor="floatingInput">Receipt Issued From (branch)</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={issuedFromDept} required readOnly/>
                    <label htmlFor="floatingInput">Receipt Issued From (Department)</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={issuedBy} required readOnly/>
                    <label htmlFor="floatingInput">Receipt Issued By (Personnel)</label>
                </div>
            <h4>Receipt Information</h4>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptDate} required readOnly/>
                    <label htmlFor="floatingInput">Receipt Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptPaymentStatus}  required readOnly/>
                    <label htmlFor="floatingInput">Receipt Payment Status</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={receiptCurrentStatus} required readOnly/>
                    <label htmlFor="floatingInput">Receipt Current Status</label>
                </div>
            <h4>Client Details</h4>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientFName}  required readOnly/>
                    <label htmlFor="floatingInput">Client First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientMName}  required readOnly/>
                    <label htmlFor="floatingInput">Client Middle Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientLName} required readOnly/>
                    <label htmlFor="floatingInput">Client Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={clientContact}  required readOnly/>
                    <label htmlFor="floatingInput">Client's Contact</label>
                </div>
            <h4>Receipt Additional Information</h4>
            <div className="mb-3">
                <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Additional Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} value={additonalInfo} readOnly/>
            </div>
            <h4>Items Attached To Receipt</h4>
                <table className="table table-light">
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Unit Cost (UGX)</th>
                        <th>Discount (%)</th>
                        <th>Total Cost (UGX)</th>
                        </tr>
                    </thead>
                        { typeof receiptItems === "string" ? JSON.parse(receiptItems).map((item) => (
                            <>
                                <tbody>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitCost}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.totalCost}</td>
                                </tr>
                                </tbody>
                                </>
                        )): <tbody> <tr><td colSpan="5" style={{ textAlign: "center" }}>No Items</td></tr> </tbody>}
                        {typeof receiptItems === "string"  && (
                            <tfoot>
                                <tr>
                                <td colSpan="5" style={{ textAlign: "right" }}>
                                Receipt Total: UGX  {total}
                                </td>
                                </tr>
                            </tfoot>)}
        </table>
        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }}  onClick={markReceiptAsDelivered}>
                    Mark Receipt As Delivered
        </button>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'>
        </Col>
    </Row>
    )
}

export default ManageExternalReceipts