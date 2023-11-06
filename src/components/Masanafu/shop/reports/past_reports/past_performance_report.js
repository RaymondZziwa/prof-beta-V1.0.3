import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PastAnnualSalesPerformanceAnalysis from '../metrics/past_annual_sales_performance_analysis'
import PastAnnualExpenditureAnalysis from '../metrics/past_annual_expenditure_analysis'
import ReportPrintingButton from '../reports_generic_components/support_components/report_printing button'
import PastProfitAndLossAnalysis from '../metrics/past_profit_and_loss_analysis'

const PastShopReports = () => {
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
    return (
      <div style={{backgroundColor:'#E9E9E9'}}>
        <Row>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
            <Row>
            <h1 style={{textAlign:'center',color:'black', marginTop:'60px'}}>Past Annual Metrics Reports<span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
              <Col sm='12' md='6' lg='6' xl='6'>
                        <h3 style={{textAlign:'center',color:'black'}}>Past Annual Sales Performance Analysis</h3>
                        {!isLoading && <PastAnnualSalesPerformanceAnalysis salesData={salesData} />}
                    </Col>
                    <Col sm='12' md='6' lg='6' xl='6'>
                        <h3 style={{textAlign:'center',color:'black'}}>Past Annual Expenditure Analysis</h3>
                        {!isLoading && <PastAnnualExpenditureAnalysis expensesData={expensesData} />}
                    </Col>
            </Row>
                <Row style={{marginTop:'120px'}}>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h3 style={{textAlign:'center',color:'black'}}>Past Annual Profit And Loss Analysis</h3>
                    {!isLoading && <PastProfitAndLossAnalysis salesData={salesData} expensesData={expensesData} />}
                    
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                </Row>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
        </div>
    )
}

export default PastShopReports