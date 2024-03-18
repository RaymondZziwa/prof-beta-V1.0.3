import { useState, useEffect } from 'react'
import axios from 'axios'

const EditSaleForm = ({ sale, fetchSalesData }) => {
    const [saleAmountPaid, setSaleAmountPaid] = useState(0)
    const [newDate, setNewDate] = useState(null)
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    const [status, setStatus] = useState('')
    const [category, setCategory] = useState('')

    useEffect(()=>{console.log("sale:", sale)},[sale])

    useEffect(()=>{
        setTimeout(()=>{
            setStatus('')
        },5000)
    },[status])

    const editSale = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/updateequatorialshopsale',{
            token: localStorage.getItem('token'),
            category: category,
            receiptNumber: sale[0].receiptNumber,
            newDate: newDate,
            newBalance: sale[0].totalAmount - saleAmountPaid
        }).then((res)=>{
            setStatus(res.data.msg)
            fetchSalesData()
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
    <div style={{marginTop:'50px'}}>
        {status && <div style={{ marginTop: '2px' }} className="alert alert-info" role="alert">{status}</div>}
         {/* <div className="form-floating mb-3">
            <input type='date' className="form-control" id="floatingInput" placeholder="Order-Id" onChange={(event)=>setNewDate(event.target.value.toLocaleDateString('en-GB', options))}  required/>
            <label htmlFor="floatingInput">New Sale Date</label>
          </div> */}
          <div className="form-floating mb-3">
            <input type='number' className="form-control" id="floatingInput" placeholder="Order-Id" onChange={(event)=>setSaleAmountPaid(event.target.value)} required/>
            <label htmlFor="floatingInput">New Amount Paid</label>
          </div>
          <button className="btn btn-primary" style={{display:'inline-block'}} onClick={editSale}>Update Sale Data</button>

          <h4 style={{textAlign:'center'}}>Sale Details</h4>
          {sale.length > 0 && 
            <>
                <p>Receipt Number: {sale[0].receiptNumber}</p>
                <p>Sale Date: {sale[0].saleDate}</p>
                <p>Customer Names: {sale[0].customerNames}</p>
                <p>Customer Contact: {sale[0].customerContact}</p>
                <table className="table table-light" style={{ marginTop: '2px' }}>
                 <thead>
                                                    <tr>
                                                        <th scope="col">sale Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(sale[0].itemsSold).map(saleordered =>
                                                        <tr>
                                                                <td>{saleordered.name}</td>
                                                                <td>{saleordered.quantity}</td>
                                                                <td>{saleordered.unitCost}</td>
                                                                <td>{saleordered.discount}</td>
                                                                <td>{saleordered.totalCost}</td>
                                                        </tr>
                                                    )}
                 </tbody>
        </table>
        <p>Sale Total Amount: UGX {sale[0].totalAmount}</p>
                                        <p>Total Amount Paid: UGX {sale[0].totalAmount-sale[0].balance}</p>
                                        <p>Balance: UGX {sale[0].balance}</p>
                                        <p>Notes :{sale[0].additionalinfo}</p> 
            </>
          }

    </div>
    )
}

export default EditSaleForm