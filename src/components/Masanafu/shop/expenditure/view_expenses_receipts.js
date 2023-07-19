import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Navbar from '../../../side navbar/sidenav';

const MasanafuExpenseReceiptViewer = () => {
  const [expenseId, setExpenditureId] = useState(null);
  const [filteredReceipt, setFilteredReceipt] = useState(null);
  const [receipts, setReceipts] = useState([]);

  const expenseIdHandler = (event) => {
    event.preventDefault();
    setExpenditureId(event.target.value);
  };

  useEffect(() => {
    // Fetch the receipts data from the backend API
    const fetchReceipts = async () => {
      try {
        const response = await axios.post('http://82.180.136.230:3005/fetchmasanafuexpensesreceipts', {
          token: localStorage.getItem('token'),
        });
        const updatedReceipts = response.data.map((receipt) => ({
          ...receipt,
          receiptimage: `http://82.180.136.230:3005/${receipt.receiptimage}`, // Update the URL here
        }));
        setReceipts(updatedReceipts);
        console.log('resssss', response.data);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, []);

  const handleViewReceipt = (event) => {
    event.preventDefault()
    console.log('Expense ID:', expenseId);
    console.log('Receipts:', receipts);
    
    const filteredReceipt = receipts.find((receipt) => parseInt(receipt.expenditureid) === parseInt(expenseId))
    setFilteredReceipt(filteredReceipt);
  };

  const handleClearReceipt = () => {
    setExpenditureId('');
    setFilteredReceipt(null);
  };

  return (
    <Row>
      <Col sm="12" md="1" lg="1" xl="1">
        <Navbar />
      </Col>
      <Col sm="12" md="10" lg="10" xl="10" style={{ marginTop: '60px' }}>
        <h1 style={{ textAlign: 'center' }}>View Expenditure Receipt</h1>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingInput"
            placeholder="Order-Id"
            style={{ color: '#8CA6FE' }}
            required
            onChange={expenseIdHandler}
          />
          <label htmlFor="floatingInput">Expenditure Id</label>
        </div>
        <button
          style={{
            width: '300px',
            border: 'none',
            color: 'white',
            height: '45px',
            backgroundColor: '#3452A3',
            marginTop: '5px',
          }}
          onClick={(event) => handleViewReceipt(event)}
        >
          View Expense Receipt
        </button>

        {filteredReceipt ? (
          <div className="mb-3">
            <h3>Expense ID: {filteredReceipt.expenditureid}</h3>
            <img src={filteredReceipt.receiptimage} alt="Receipt" className="img-fluid" style={{height:'800px', width:'800px'}}/>
          </div>
        ) : (
          <p>No receipt available for the provided Expense ID.</p>
        )}
      </Col>
      <Col sm="12" md="1" lg="1" xl="1"></Col>
    </Row>
  );
};

export default MasanafuExpenseReceiptViewer;
