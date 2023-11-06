import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import ReportPrintingButton from '../reports_generic_components/support_components/report_printing button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../../../../../imgs/loading.gif'
import ExpensesStatusBar from './expenses_status_bar/status_bar'
import MonthlyExpensesAnalysis from '../metrics/monthly_expenses_analysis'
import ExpenditureCategoryAnalysis from '../metrics/expenditure_category_analysis'
import ExpenditurePaymentStatusAnalysis from '../metrics/expenditure_payment_status_analysis'
import ExpenditurePaymentMethodAnalysis from '../metrics/expenditure_payment_method_analysis'
import IndividualMonthExpenditureAnalysis from '../metrics/individual_month_expenditure_analysis'
import IndividualCategoryMonthlyExpenditureAnalysis from '../metrics/monthly_category_expenditure_analysis'
import IndividualMonthAndCategoryAnalysis from '../metrics/individual_month_and_category_analysis'

const ExpensesReport = () => {
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
        <div style={{backgroundColor:'#E9E9E9'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Masanafu Shop Expenditure Metrics Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
                <p style={{textAlign:'center', color:'black',marginTop:'5px',fontSize:'20px'}}>As On: {new Date().toLocaleString()}</p>
                {!isLoading ? <ExpensesStatusBar  expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Row>
            <Row>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Annual Expenditure Analysis</h2>
                    {!isLoading ? <MonthlyExpensesAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
            </Row>

            <Row style={{marginTop:'50px'}}>
                <Col sm='12' md='4' lg='4' xl='4'>
                        <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Expenditure Category Analysis</h2>
                        {!isLoading ? <ExpenditureCategoryAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Expenditure Payment Status Analysis</h2>
                    {!isLoading ? <ExpenditurePaymentStatusAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Expenditure Payment Method Analysis</h2>
                    {!isLoading ? <ExpenditurePaymentMethodAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
            </Row>
           
            <Row>
                <Col sm='12' md='3' lg='3' xl='3'></Col>
                <Col sm='12' md='6' lg='6' xl='6'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Individual Month Expenditure Analysis</h2>
                    {!isLoading ? <IndividualMonthExpenditureAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='3' lg='3' xl='3'></Col>
            </Row>

            <Row style={{marginTop:'150px'}}>
                <Col sm='12' md='6' lg='6' xl='6'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Individual Category Monthly Expenditure Analysis</h2>
                    {!isLoading ? < IndividualCategoryMonthlyExpenditureAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='6' lg='6' xl='6'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Individual Month Expenditure Analysis</h2>
                    {!isLoading ? <IndividualMonthAndCategoryAnalysis expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
            </Row>
            <Row style={{marginTop:'100px'}}>
                <Col sm='12' md='6' lg='6' xl='6'>
                    
                </Col>
                <Col sm='12' md='6' lg='6' xl='6'>
                    
                </Col>
            </Row>
        </div>
    )
}

export default ExpensesReport