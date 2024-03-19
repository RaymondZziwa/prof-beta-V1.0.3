import { Row, Col } from 'react-bootstrap';
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from 'axios';

const FetchClientAssociatedReceipts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState('')
    const [clientName, setClientName] = useState('');

    const handleFilter = (event) => {
      event.preventDefault()
      let filtered = data.filter((sale)=> sale.customerNames.includes(clientName.toUpperCase().trim()))
      setFilteredData(filtered)
    }

    useEffect(()=>{
        const fetchData = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallbranchessalesrecords',{
                token: localStorage.getItem('token')
            })

            if(Array.isArray(res.data)){
              setIsLoading(false)
              setData([...res.data])
            }
        }

        fetchData()
    },[])

    return (
        <div style={{ color: 'black' }}>
          <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
              <Navbar />
            </Col>
            <Col sm='12' md='10' lg='10' xl='10'>
              <h1 style={{ textAlign: 'center', color: 'black', marginTop: '60px' }}>Individual Client Receipts Records</h1>
              <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <div className="form-floating mb-3">
                  <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={(e)=>setClientName(e.target.value)} required  />
                  <label htmlFor="floatingInput">Search By Client's Names</label>
                </div>
                <button className='btn btn-primary' onClick={handleFilter}>Fetch Data</button>
              </div>
    
              <h1 style={{ textAlign: 'center', color: 'black', marginTop: '40px' }}>Client's Receipts Records</h1>
              <table className="table table-light" style={{ marginTop: '20px', textAlign: 'center' }}>
                <thead style={{ textAlign: 'center' }}>
                  <tr>
                    <th scope="col">Receipt No.</th>
                    <th scope="col">Sale Date</th>
                    <th scope="col">Customer Names</th>
                    <th scope="col">Customer Contact</th>
                    <th scope="col">Items Sold</th>
                    <th scope="col">Total Sale Amount</th>
                    <th scope="col">Amount Paid</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Additional Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? (filteredData.length > 0 ? filteredData.map((item) => (
                    <tr key={item.receiptNumber}>
                    <td>{item.receiptNumber}</td>
                    <td>{item.saleDate}</td>
                    <td>{item.customerNames}</td>
                    <td>{item.customerContact}</td>
                    <td>
                    <table className="table table-light" style={{ marginTop: '2px' }}>
                            <thead>
                                <tr>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit Price (UGX)</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Total Cost (UGX)</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {JSON.parse(item.itemsSold).map(itemordered =>
                                    <tr>
                                            <td>{itemordered.name}</td>
                                            <td>{itemordered.quantity}</td>
                                            <td>{itemordered.unitCost}</td>
                                            <td>{itemordered.discount}</td>
                                            <td>{itemordered.totalCost}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </td>
                    <td>{item.totalAmount}</td>
                    <td>{item.totalAmount-item.balance}</td>
                    <td>{item.balance}</td>
                    <td>{item.paymentStatus}</td>
                    <td>{item.additionalinfo}</td>
                </tr>
                  )) : (
                    data.map((item) => (
                      <tr key={item.receiptNumber}>
                      <td>{item.receiptNumber}</td>
                      <td>{item.saleDate}</td>
                      <td>{item.customerNames}</td>
                      <td>{item.customerContact}</td>
                      <td>
                      <table className="table table-light" style={{ marginTop: '2px' }}>
                              <thead>
                                  <tr>
                                      <th scope="col">Item Name</th>
                                      <th scope="col">Quantity</th>
                                      <th scope="col">Unit Price (UGX)</th>
                                      <th scope="col">Discount</th>
                                      <th scope="col">Total Cost (UGX)</th>
                                  </tr>
                              </thead>
                              <tbody style={{ textAlign: 'center' }}>
                                  {JSON.parse(item.itemsSold).map(itemordered =>
                                      <tr>
                                              <td>{itemordered.name}</td>
                                              <td>{itemordered.quantity}</td>
                                              <td>{itemordered.unitCost}</td>
                                              <td>{itemordered.discount}</td>
                                              <td>{itemordered.totalCost}</td>
                                      </tr>
                                  )}
                              </tbody>
                          </table>
                      </td>
                      <td>{item.totalAmount}</td>
                      <td>{item.totalAmount-item.balance}</td>
                      <td>{item.balance}</td>
                      <td>{item.paymentStatus}</td>
                      <td>{item.additionalinfo}</td>
                  </tr>
                    ))
                  )) : (
                    <tr>
                      <td colSpan='11'>Search client to view data...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Col>
            <Col sm='12' md='1' lg='1' xl='1'></Col>
          </Row>
          <Row style={{ marginTop: '50px' }}></Row>
        </div>
      );
}

export default FetchClientAssociatedReceipts