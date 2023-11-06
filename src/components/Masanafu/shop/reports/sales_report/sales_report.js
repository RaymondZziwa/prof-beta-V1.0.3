import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import SalesStatusBar from './sales_report_components/status_bar'
import ReportPrintingButton from '../reports_generic_components/support_components/report_printing button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PaymentModeAnalysisPieChart from '../metrics/sales_payment_mode_analysis'
import SalesPaymentStatusAnalysis from '../metrics/sales_payment_status_analysis'
import MonthlySalesPerformanceAnalysis from '../metrics/monthly_sales_performance_analysis'
import IndividualMonthSalesPerformanceAnalysis from '../metrics/individual_month_sales_performance_analysis'
import ProductPerformance from '../metrics/product_performance'
import Loading from '../../../../../imgs/loading.gif'

const SalesReport = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallshopsales', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            setSalesData(res.data);
          }
        };
      
        fetchSalesData();
      }, []);
    return(
        <div style={{backgroundColor:'#E9E9E9'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
            </Row>
            <Row>
                <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Masanafu Shop Sales Metrics Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
                <p style={{textAlign:'center', color:'black',marginTop:'5px',fontSize:'20px'}}>As On: {new Date().toLocaleString()}</p>
                {!isLoading ? <SalesStatusBar salesData={salesData} /> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
            </Row>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Sales Payment Mode Analysis</h2>
                    {!isLoading ? <PaymentModeAnalysisPieChart salesData={salesData}/> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'20px'}}>Monthly Sales Performance Analysis</h2>
                    {!isLoading ? <MonthlySalesPerformanceAnalysis  salesData={salesData}/> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
            </Row>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Sales Payment Status Analysis</h2>
                    {!isLoading ? <SalesPaymentStatusAnalysis salesData={salesData}/> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Individual Month Sales Performance Analysis</h2>
                    {!isLoading ? <IndividualMonthSalesPerformanceAnalysis  salesData={salesData}/> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
            </Row>
            <Row>
                <Col sm='12' md='3' lg='3' xl='3'></Col>
                <Col sm='12' md='6' lg='6' xl='6'>
                    <h2 style={{textAlign:'center', color:'black',marginTop:'100px'}}>Product Performance Analysis</h2>
                    {!isLoading ? <ProductPerformance  salesData={salesData}/> : <div style={{ textAlign:'center' }}><img src={Loading} height='60px' alt='loading' /></div>}
                </Col>
                <Col sm='12' md='3' lg='3' xl='3'></Col>
            </Row>
            <Row style={{marginTop:'120px'}}>

            </Row>
        </div>
    )
}

export default SalesReport