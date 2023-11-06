import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap";

const EquatorialTodayScheduledProjectsClientPayments = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchprojectsclientpaymentplans', {
            token: localStorage.getItem('token')
          });
          
          console.log(res.data)
          if (Array.isArray(res.data)) {
            const today = new Date();
            const filteredData = res.data.map((item) => {
                const paymentPlan = JSON.parse(item.paymentPlan);
                const filteredPaymentPlan = paymentPlan.filter((payment) => {
                  const paymentDateParts = payment.paymentDate.split('/');
                  const paymentDate = new Date(
                    paymentDateParts[2],
                    paymentDateParts[1] - 1,
                    paymentDateParts[0]
                  );
                  return (
                    paymentDate.getDate() === today.getDate() &&
                    paymentDate.getMonth() === today.getMonth() &&
                    paymentDate.getFullYear() === today.getFullYear()
                  );
                });
                return { ...item, paymentPlan: filteredPaymentPlan };
              });



            setIsLoading(false);
            setSalesData(filteredData);
          }
        };
      
        fetchSalesData();
    }, [])


    useEffect(()=>{
        console.log('qqaaazzz',salesData)
    },[salesData])

    return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='9' lg='9' xl='9'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Today's Projects Clients Scheduled Payments</h2>
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
                                    <th scope="col">Amount To Be Paid</th>
                                    <th scope="col">Balance After Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? salesData.map(item => (
                                    <tr key={item.receiptNumber}>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Receipt Number</th>
                                                        <th scope="col">Client Names</th>
                                                        <th scope="col">Client Contact</th>
                                                        <th scope="col">Items Taken</th>
                                                        <th scope="col">Total Amount</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr key={itemordered.index}>
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
                                        <td>{item.paymentPlan[0].amountToBePaid}</td>
                                        <td>{item.balance-item.paymentPlan[0].amountToBePaid}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='10'>Loading...</td></tr>}
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EquatorialTodayScheduledProjectsClientPayments