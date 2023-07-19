import { Row, Col } from 'react-bootstrap';
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from 'axios';

const SaveShopExpenditureReceipts = () => {
    const [expenditureId, setExpenditureId] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [status, setStatus] = useState('')

    const expenseIdHandler = event => {
        event.preventDefault()
        setExpenditureId(event.target.value)
    }

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    }

    const saveReceiptDataHandler = async (event) => {
        event.preventDefault();
        console.log(expenditureId);
        console.log(selectedFile);
      
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('expenseId', expenditureId);
      
        try {
          const res = await axios.post('http://82.180.136.230:3005/saveexpensereceipt', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(() => setStatus({ type: 'success' }))
          .catch((err) => setStatus({ type: 'error', err }))
          console.log('Response:', res.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div>
          <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
              <Navbar />
            </Col>
            <Col sm='12' md='4' lg='4' xl='4'>
              <h1 style={{ textAlign: 'center', marginTop: '60px' }}>Save Expenditure Receipt</h1>
              {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
               {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  required onChange={expenseIdHandler}/>
                    <label htmlFor="floatingInput">Expenditure Id</label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Enter Receipt Image</label>
                    <input class="form-control" type="file" id="formFile" accept="image/png, image/gif, image/jpeg" style={{ width:'300px' }} onChange={handleFileChange} required/>
                </div>
                <button style={{ width: "300px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveReceiptDataHandler}>
                    Save Expenditure Receipt Data
                </button>
            </Col>
            <Col sm='12' md='4' lg='4' xl='4'></Col>
          </Row>
          <Row style={{ marginTop: '50px' }}></Row>
        </div>
      );
}

export default SaveShopExpenditureReceipts