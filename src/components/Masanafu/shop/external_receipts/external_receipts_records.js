import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import Navbar from "../../../side navbar/sidenav";

const ExternalReceiptsRecords = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [externalReceiptsData, setExternalReceiptsData] = useState([]);
  const [receiptNumber, setReceiptNumber] = useState();
  const [filteredReceiptsData, setFilteredReceiptsData] = useState([]);

  const receiptNumberHandler = event => {
    event.preventDefault();
    const inputReceiptNumber = event.target.value;
    if (inputReceiptNumber) {
      const filteredData = externalReceiptsData.filter(item => item.receiptnumber === inputReceiptNumber);
      setFilteredReceiptsData(filteredData);
    } else {
      setFilteredReceiptsData([]);
    }
  };

  useEffect(() => {
    const fetchExternalReceiptsData = async () => {
      let res = await axios.post('http://82.180.136.230:3005/fetchallexternalreceiptsdata', {
        token: localStorage.getItem('token')
      });

      if (Array.isArray(res.data)) {
        setIsLoading(false);
        setExternalReceiptsData(res.data);
      }
    };

    fetchExternalReceiptsData();
  }, []);

  return (
    <div style={{ backgroundColor: '#E9E9E9', color: 'black' }}>
      <Row>
        <Col sm='12' md='1' lg='1' xl='1'>
          <Navbar />
        </Col>
        <Col sm='12' md='10' lg='10' xl='10'>
          <h1 style={{ textAlign: 'center', color: 'black', marginTop: '60px' }}>External Receipts Records</h1>
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <div className="form-floating mb-3">
              <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required onChange={receiptNumberHandler} />
              <label htmlFor="floatingInput">Search By Receipt Number</label>
            </div>
          </div>

          <h1 style={{ textAlign: 'center', color: 'black', marginTop: '40px' }}>Masanafu External Receipts Records</h1>
          <table className="table table-light" style={{ marginTop: '20px', textAlign: 'center' }}>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th scope="col">Receipt No.</th>
                <th scope="col">Date</th>
                <th scope="col">Customer Names</th>
                <th scope="col">Customer Contact</th>
                <th scope="col">Items Sold</th>
                <th scope="col">Receipt Issued From</th>
                <th scope="col">Receipt Issued By</th>
                <th scope="col">Receipt To Be Delivered To</th>
                <th scope="col">Receipt Payment Status</th>
                <th scope="col">Receipt Delivery Status</th>
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

export default ExternalReceiptsRecords;
