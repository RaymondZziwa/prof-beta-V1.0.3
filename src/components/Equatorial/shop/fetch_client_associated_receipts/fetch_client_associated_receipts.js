import { Row, Col } from 'react-bootstrap';
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";


const FetchClientAssociatedReceipts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [externalReceiptsData, setExternalReceiptsData] = useState([]);
    const [receiptNumber, setReceiptNumber] = useState();
    const [filteredReceiptsData, setFilteredReceiptsData] = useState([]);


    return (
        <div style={{ backgroundColor: '#E9E9E9', color: 'black' }}>
          <Row>
            <Col sm='12' md='1' lg='1' xl='1'>
              <Navbar />
            </Col>
            <Col sm='12' md='10' lg='10' xl='10'>
              <h1 style={{ textAlign: 'center', color: 'black', marginTop: '60px' }}>Individual Client Receipts Records</h1>
              <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <div className="form-floating mb-3">
                  <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required  />
                  <label htmlFor="floatingInput">Search By Client's Names</label>
                </div>
                <button className='btn btn-primary'>Fetch Data</button>
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
                  {!isLoading ? (filteredReceiptsData.length > 0 ? filteredReceiptsData.map(item => (
                    <tr>
                      <td>{item.receiptnumber}</td>
                      <td>{item.receiptdate}</td>
                      <td>{item.clientfirstname} {item.clientdmiddlename} {item.clientlastname}</td>
                      <td>{item.clientcontact}</td>
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
                            {JSON.parse(item.itemsattached).map(itemordered =>
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
                      <td>{item.receiptissuedfromdepartment}</td>
                      <td>{item.receiptissuedby}</td>
                      <td>{item.receiptdeliveredtopersonnel}</td>
                      <td>{item.receiptpaymentstatus}</td>
                      <td>{item.receiptdeliverystatus}</td>
                      <td>{item.additionalinfo}</td>
                    </tr>
                  )) : (
                    externalReceiptsData.map(item => (
                      <tr>
                        <td>{item.receiptnumber}</td>
                        <td>{item.receiptdate}</td>
                        <td>{item.clientfirstname} {item.clientdmiddlename} {item.clientlastname}</td>
                        <td>{item.clientcontact}</td>
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
                              {JSON.parse(item.itemsattached).map(itemordered =>
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
                        <td>{item.receiptissuedfromdepartment}</td>
                        <td>{item.receiptissuedby}</td>
                        <td>{item.receiptdeliveredtopersonnel}</td>
                        <td>{item.receiptpaymentstatus}</td>
                        <td>{item.receiptdeliverystatus}</td>
                        <td>{item.additionalinfo}</td>
                      </tr>
                    ))
                  )) : (
                    <tr>
                      <td colSpan='11'>Loading...</td>
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