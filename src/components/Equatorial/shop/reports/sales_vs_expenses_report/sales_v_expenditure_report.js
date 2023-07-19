import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import ReportPrintingButton from '../reports_generic_components/support_components/report_printing button'
import { useState, useEffect } from 'react'
import Loading from '../../../../../imgs/loading.gif'
import axios from 'axios'
import SalesVExpenditureStatusBar from './sales_v_expenses_status_bar/statusbar'
import ProfitAndLossStatusBar from '../expenses_report/profit_and_loss_statusbar/profit_and_loss_statusbar'
import AnnualSalesVsExpensesAnalysis from '../metrics/annual_sales_vs_expenses_analysis'
import IndividualMonthSalesVsExpenditureAnalysis from '../metrics/individual_month_sales_vs_expenses_analysis'
import AnnualProfitAndLossAnalysis from '../metrics/annual_profit_and_loss_analysis'

const SalesVsExpenditureReport = () =>  {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])
    const [expensesData, setExpensesData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch sales data
            const salesResponse = await axios.post(
              'http://82.180.136.230:3005/fetchallshopsales',
              {
                token: localStorage.getItem('token'),
              }
            );
            if (Array.isArray(salesResponse.data)) {
              setSalesData(salesResponse.data);
            }
      
            // Fetch expenses data
            const expensesResponse = await axios.post(
              'http://82.180.136.230:3005/fetchallshopexpenses',
              {
                token: localStorage.getItem('token'),
              }
            );
            if (Array.isArray(expensesResponse.data)) {
              setIsLoading(false);
              setExpensesData(expensesResponse.data);
            }
          } catch (error) {
            // Handle error
            console.error(error);
          }
        };
      
        fetchData();
      }, [])

    return(
        <div style={{backgroundColor:'#E9E9E9'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Masanafu Shop Sales Vs Expenditure Metrics Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
                <p style={{textAlign:'center', color:'black',marginTop:'5px',fontSize:'20px'}}>As On: {new Date().toLocaleString()}</p>
                {!isLoading ? <SalesVExpenditureStatusBar salesData={salesData} expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Row>
            <Row>
                <h2 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Profit / Loss Analysis</h2>
                {!isLoading ? <ProfitAndLossStatusBar salesData={salesData} expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Row>




            <Row>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Annual Sales Vs Expenses Analysis</h2>
                    {!isLoading ? <AnnualSalesVsExpensesAnalysis salesData={salesData} expensesData={expensesData} />: <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
            </Row>

            <Row style={{marginTop:'140px'}}>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', color:'black'}}>Annual Profit/Loss Analysis</h2>
                    {!isLoading ? <AnnualProfitAndLossAnalysis salesData={salesData} expensesData={expensesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'></Col>
            </Row>
            <Row>
            </Row>
        </div>
    )
}

export default SalesVsExpenditureReport