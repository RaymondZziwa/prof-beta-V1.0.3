import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from 'axios'
import AdminNavbar from "../../side navbar/adminnavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const AdminManageEquatorialExpenses = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [expensesData, setExpensesData] = useState([])
    const [expenseId, setExpenseId] = useState()
    const [newDate, setNewDate] = useState()
    const [status, setStatus] = useState('')
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(expensesData.length / itemsPerPage)

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
    

    useEffect(() => {  
        fetchExpensesData()
      }, [])

      useEffect(() => {  
            setTimeout(()=>{
                setStatus('')
            },2000)
      }, [status])

    const expenseIdHandler = event => {
        event.preventDefault()
        setExpenseId(event.target.value)
    }

    const newDateHandler = event => {
        event.preventDefault()
        setNewDate(new Date(event.target.value).toLocaleDateString('en-GB', options))
    }

    const changeDateHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/updateexpensedate', {
            token: localStorage.getItem('token'),
            expenseId: expenseId,
            newDate: newDate
        }).then((res)=>{
            setStatus(res.data.msg)
            fetchExpensesData()
        }).catch

    }

    return(
       <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <AdminNavbar />
        </Col>
        <div className="col align-self-center">
            <h2 style={{marginTop:'50px', textAlign:'center'}}>Manage Expenses Data</h2>
            {status && <div style={{ marginTop: '2px' }} className="alert alert-info" role="alert">{status}</div>}
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  required onChange={expenseIdHandler}/>
                    <label htmlFor="floatingInput">Expenditure Id</label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Enter New Expenditure Date</label>
                    <input class="form-control" type="date"  style={{ width:'300px' }} onChange={newDateHandler} required/>
                </div>
            <button className="btn btn-primary" onClick={changeDateHandler} style={{display:'inline-block'}}>Update Expense Date</button>

            <div>
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
            </div>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default AdminManageEquatorialExpenses