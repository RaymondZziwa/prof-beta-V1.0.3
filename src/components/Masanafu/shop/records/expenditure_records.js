import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from 'react-bootstrap'

const ShopExpensesRecords = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [expensesData, setExpensesData] = useState([])

    useEffect(() => {
        const fetchExpensesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallshopexpenses', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            setExpensesData(res.data);
          }
        }
      
        fetchExpensesData()
      }, [])

      return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Expenditure Records</h2>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Expenditure Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Expense Category</th>
                                    <th scope="col">Expense Name</th>
                                    <th scope="col">Expense Description</th>
                                    <th scope="col">Total Cost</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? expensesData.map(item => (
                                    <tr>
                                        <td>{item.expenditureid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.expenditurecategory}</td>
                                        <td>{item.expenditurename}</td>
                                        <td>{item.expendituredescription}</td>
                                        <td>{item.expenditurecost}</td>
                                        <td>{item.amountspent}</td>
                                        <td>{item.balance}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='8'>Loading...</td></tr>}
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

export default ShopExpensesRecords