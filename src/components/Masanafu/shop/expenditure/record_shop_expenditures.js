import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecordShopExpenditure = () => {
    const [expenditureDate, setExpenditureDate] = useState()
    const [expenditureId, setExpenditureId] = useState()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [expenditureCategory, setExpenditureCategory] = useState('')
    const [expenditureName, setExpenditureName] = useState('')
    const [desc, setDesc] = useState('')
    const [cost, setCost] = useState()
    const [amountPaid, setAmountPaid] = useState()
    const [balance, setBalance] = useState('')
    const [status, setStatus] = useState('')
    const [updateStatus, setUpdateStatus] = useState('')

    const [expenseData, setExpenseData] = useState()
    const [updateExpenseTotal, setUpdateExpenseTotal] = useState()
    const [amountNotPaid, setAmountNotPaid] = useState()
    const [updateExpenseName, setUpdateExpenseName] = useState('')
    const [updateExpenseCategory, setUpdateExpenseCategory] = useState('')

    const expenseIdHandler = event => {
        event.preventDefault()
        setExpenditureId(event.target.value)
    }

    const expenditureNameHandler = event => {
        event.preventDefault()
        setExpenditureName(event.target.value)
    }
    const expenditureCategoryHandler = event => {
        event.preventDefault()
        setExpenditureCategory(event.target.value)
    }

    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    const additionalInfoInput = event => {
        event.preventDefault()
        setDesc(event.target.value)
    }

    const totalAmountInput = event => {
        event.preventDefault()
        setCost(event.target.value)
    }

    const amountInput = event => {
        event.preventDefault()
        setAmountPaid(event.target.value)
    }

    useEffect(()=>{
        setBalance(cost - amountPaid)
    }, [amountPaid])

    useEffect(()=>{
        if(balance === cost){
            setPaymentStatus('unpaid')
        }else if (balance === 0){
            setPaymentStatus('fully paid')
        }else{
            setPaymentStatus('partially paid')
        }
    }, [balance])

    
    useEffect(()=>{
        let date = new Date().toLocaleDateString()
        setExpenditureDate(date)
    },[])


    const saveExpenseData = async event => {
        event.preventDefault()
         let res = await axios.post('http://82.180.136.230:3005/savemasanafushopexpense',{
             token: localStorage.getItem('token'),
             expenditureDate: expenditureDate,
             expenditureName: expenditureName,
             expenditureCategory: expenditureCategory,
             expenditureDesc: desc,
             expenditureTotalCost: cost,
             amountPaid: amountPaid,
             balance: balance,
             paymentMethod: paymentMethod,
             paymentStatus: paymentStatus
         })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    const fetchExpenseData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchexpendituredata',{
             token: localStorage.getItem('token'),
             expenseId: expenditureId
         })
         setExpenseData(res.data)
         console.log(res.data)
    }

    useEffect(()=>{
        fetchExpenseData()
    }, [expenditureId])
    
    useEffect(()=>{
        if (expenseData) {
            setUpdateExpenseName(expenseData[0].expenditurename)
            setUpdateExpenseCategory(expenseData[0].expenditurecategory)
            setUpdateExpenseTotal(expenseData[0].expenditurecost)
            setAmountNotPaid(expenseData[0].balance)
        }
    },[expenseData])


    const updateExpenseData = async event => {
        event.preventDefault()
         let res = await axios.post('http://82.180.136.230:3005/updateexpendituredata',{
             token: localStorage.getItem('token'),
             date: expenditureDate,
             expenditureId: expenditureId,
             additionalInfo: desc,
             amountPaid: amountPaid,
             paymentMethod: paymentMethod
         })
        .then(() => setUpdateStatus({ type: 'success' }))
        .catch((err) => setUpdateStatus({ type: 'error', err }))
    }

    return(
            <Row>
            <Col sm='12' md='3' lg='3' xl='3'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <Row>
                    <Col sm='12' md='5' lg='5' xl='5'>
                        <h3>Save Expense Data</h3>
                        {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                            <label htmlFor="floatingInput">Expenditure Date</label>
                        </div>
                        <div className="mb-3">
                            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={expenditureCategoryHandler}>
                                <option defaultValue>Select Expenditure Category</option>
                                <option value="utilities">Utilities</option>
                                <option value="miscellaneous expenses">Miscellaneous Expenses</option>
                                <option value="transaction fees">Transaction Fees</option>
                                <option value="professional services">Professional Services</option>
                                <option value="shop licenses/permits">Licenses and Permits</option>
                                <option value="product transportation and delivery">Transportation and Delivery</option>
                                <option value="shop maintenance">Maintenance and Repairs</option>
                                <option value="shop insurance">Insurance</option>
                                <option value="Shop supplies and materials">Supplies and Materials</option>
                                <option value="shop equipment">Equipment and Fixtures</option>
                                <option value="advertising">Marketing and Advertising</option>
                                <option value="rent">Rent or Lease</option>
                                <option value="employee wages">Employee Wages</option>
                            </select>
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
                        <div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={amountInput} min='0' />
                                <label for="floatingInput">Amount Spent</label>
                            </div>
                        </div>
                        <div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={balance} min='0' readOnly/>
                            <label for="floatingInput">Amount Not Paid</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={paymentMethodHandler}>
                                <option defaultValue>Select Payment Method</option>
                                <option value="MTN MoMo">MTN MoMo</option>
                                <option value="AIRTEL Money">Airtel Money</option>
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                <button style={{ width: "300px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={saveExpenseData}>
                    Save Expenditure Data
                </button>
                    </Col>



                    <Col sm='12' md='5' lg='5' xl='5'>
                        <h3>Update Expense Data</h3>
                        {updateStatus?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                        {updateStatus?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={expenditureDate} required readOnly/>
                            <label htmlFor="floatingInput">Expenditure Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }}  required onChange={expenseIdHandler}/>
                            <label htmlFor="floatingInput">Expenditure Id</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={updateExpenseCategory} required readOnly/>
                            <label htmlFor="floatingInput">Expenditure Category</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={updateExpenseName} required readOnly/>
                            <label htmlFor="floatingInput">Expenditure Name</label>
                        </div>
                        <div className="mb-3">
                            <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="Additional Notes" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} onChange={additionalInfoInput} />
                            {/* <label for="floatingInput">Expenditure Description</label> */}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={updateExpenseTotal} min='0' readOnly/>
                            <label for="floatingInput">Expenditure Total Cost</label>
                        </div>
                        <div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={amountInput} min='0' />
                                <label for="floatingInput">Amount Being Paid</label>
                            </div>
                        </div>
                        <div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={amountNotPaid} min='0' readOnly/>
                            <label for="floatingInput">Amount Not Yet Paid</label>
                        </div>
                        </div>
                        <div className="mb-3">
                            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }}   onChange={paymentMethodHandler}>
                                <option defaultValue>Select Payment Method</option>
                                <option value="MTN MoMo">MTN MoMo</option>
                                <option value="AIRTEL Money">Airtel Money</option>
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                <button style={{ width: "300px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={updateExpenseData}>
                    Update Expenditure Data
                </button>
                    </Col> 
                </Row>
            </div>
            <Col sm='12' md='1' lg='1' xl='1'></Col>
        </Row>
    )
}

export default RecordShopExpenditure