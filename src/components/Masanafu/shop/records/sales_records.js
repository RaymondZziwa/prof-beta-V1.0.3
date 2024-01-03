import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap";

const ShopSalesRecords = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallshopsales', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            const sortedRecords = res.data.slice().sort((a, b) => {
                // Assuming saleDate is in the format dd/mm/yyyy
                const partsA = a.saleDate.split('/');
                const partsB = b.saleDate.split('/');
                
                // Convert to Date objects and compare in descending order
                const dateA = new Date(`${partsA[1]}/${partsA[0]}/${partsA[2]}`);
                const dateB = new Date(`${partsB[1]}/${partsB[0]}/${partsB[2]}`);
        
                return dateB - dateA;
            });

            setSalesData(sortedRecords);
          }
        };
      
        fetchSalesData();
    }, [])

    return(
        <>
                <Row>
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <Navbar />
                    </Col>
                </Row>
                <Row>
                    <Col sm='12' md='12' lg='12' xl='12'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Masanafu Shop Sales Records</h2>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
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
                                    <th scope="col">Additional Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? salesData.map(item => (
                                    <tr>
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
                                        <td>{item.additionalinfo}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
                    </Col>                
                </Row>
        </>
    )
}

export default ShopSalesRecords