import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const EquatorialShopExpensesRecords = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [expensesData, setExpensesData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(expensesData.length / itemsPerPage)
    

    useEffect(() => {
        const fetchExpensesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialshopexpenses', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            const sortedRecords = res.data.slice().sort((a, b) => {
                // Assuming saleDate is in the format dd/mm/yyyy
                const partsA = a.date.split('/');
                const partsB = b.date.split('/');
                
                // Convert to Date objects and compare in descending order
                const dateA = new Date(`${partsA[1]}/${partsA[0]}/${partsA[2]}`);
                const dateB = new Date(`${partsB[1]}/${partsB[0]}/${partsB[2]}`);
        
                return dateB - dateA;
            });
            setExpensesData(sortedRecords);
          }
        }
      
        fetchExpensesData()
      }, [])

      return(
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
                                {!isLoading ? expensesData.slice(startIndex, endIndex).map(item => (
                                    <tr key={item.expenditureid}>
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
                        {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                    )}
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
    )
}

export default EquatorialShopExpensesRecords