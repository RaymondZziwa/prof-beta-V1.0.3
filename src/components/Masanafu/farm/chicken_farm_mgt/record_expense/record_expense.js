import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecordChickenFarmExpense = () => {
        const [expenditureDate, setExpenditureDate] = useState()
        const [expenditureName, setExpenditureName] = useState('')
        const [desc, setDesc] = useState('')
        const [cost, setCost] = useState()
        const [status, setStatus] = useState()
        const [expenseData, setExpenseData] = useState([])

        const expenditureNameHandler = event => {
            event.preventDefault()
            setExpenditureName(event.target.value)
        }

        const additionalInfoInput = event => {
            event.preventDefault()
            setDesc(event.target.value)
        }
    
        const totalAmountInput = event => {
            event.preventDefault()
            setCost(event.target.value)
        }
      
        const saveExpenseData = async event => {
            event.preventDefault()
            try {
                let res = await axios.post('http://82.180.136.230:3005/savemasanafuchickenfarmexpense',{
                 token: localStorage.getItem('token'),
                 expenditureDate: expenditureDate,
                 expenditureName: expenditureName,
                 expenditureDesc: desc,
                 expenditureTotalCost: cost
                }) 
                setStatus({ type: 'success' })
                fetchMasanafuChickenFarmExpenseData()
            } catch (error) {
                setStatus({ type: 'error', error })
            }
        }
    
        const fetchMasanafuChickenFarmExpenseData = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchmasanafuchickenfarmexpenses',{
                 token: localStorage.getItem('token')
             })
             setExpenseData(res.data)
        }

        useEffect(()=>{
            fetchMasanafuChickenFarmExpenseData()
            let date = new Date().toLocaleDateString()
            setExpenditureDate(date)
        },[])
    
        return(
            <>
                <Row>
                    <Col sm='12' md='12' lg='12' xl='12'>
                        <Navbar />
                    </Col>
                </Row>
                <Row style={{marginTop:'60px'}}>
                    <Col sm='12' md='3' lg='3' xl='3' style={{marginLeft:'20px'}}>
                    <h3>Save Expense Data</h3>
                            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                                <label htmlFor="floatingInput">Expenditure Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={expenditureNameHandler} required/>
                                <label htmlFor="floatingInput">Expenditure Name</label>
                            </div>
                            <div className="mb-3">
                                <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Expenditure Description" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} onChange={additionalInfoInput} />
                                {/* <label for="floatingInput">Expenditure Description</label> */}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={totalAmountInput} min='0' />
                                <label for="floatingInput">Expenditure Total Cost</label>
                            </div>
                            <button style={{ width: "300px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveExpenseData}>
                                Save Expenditure Data
                            </button>
                    </Col>
                    <Col>
                        <h3 style={{textAlign:'center'}}>Expenses List</h3>
                        <table className="table table-light">
                            <thead>
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Cost (UGX)</th>
                                </tr>
                            </thead>
                            <tbody>
                               {expenseData && 
                                    expenseData.map((record) => 
                                        <tr key={record.expenditureid}>
                                            <td>{record.date}</td>
                                            <td>{record.expenditurename}</td>
                                            <td>{record.expendituredescription}</td>
                                            <td>{record.expenditurecost}</td>
                                        </tr>
                                    )
                               }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </>
        )
}

export default RecordChickenFarmExpense