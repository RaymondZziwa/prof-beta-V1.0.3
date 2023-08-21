import { useState, useEffect } from "react"
import axios from "axios"
import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import ReportPrintingButton from "../reports/reports_generic_components/support_components/report_printing button"

const EquatorialShopMonthlySalesReport = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])
    const [filteredSales, setFilteredSales] = useState([])
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedYear, setSelectedYear] = useState("")

    const [expensesData, setExpensesData] = useState([])
    const [filteredExpenses, setFilteredExpenses] = useState([])

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountPaid, setTotalAmountPaid] = useState(0);
    const [balance, setBalance] = useState(0)
    const [massageData,  setMassageData] = useState([])
    const [filteredMassageData,  setFilteredMassageData] = useState([])
    const [totalMassageAmount, setTotalMassageAmount] = useState(0)

    const [totalExpenditureAmount, setTotalExpenditureAmount] = useState(0);
    const [totalExpenditureAmountPaid, setTotalExpenditureAmountPaid] = useState(0);
    const [expenditureBalance, setExpenditureBalance] = useState(0)

    const [paymentMethodTotals, setPaymentMethodTotals] = useState({
        Cash: 0,
        Visa: 0,
        MTNMoMo: 0,
        AirtelMoney: 0,
        ProfMM: 0,
      });
      const [expensePaymentMethodTotals, setExpensePaymentMethodTotals] = useState({
        Cash: 0,
        Visa: 0,
        MTNMoMo: 0,
        AirtelMoney: 0,
        ProfMM: 0,
      });

      let paymentMethods = {
        Cash: 0,
        Visa: 0,
        MTNMoMo: 0,
        AirtelMoney: 0,
        ProfMM: 0,
      }
      let ExpensepaymentMethod = {
        Cash: 0,
        Visa: 0,
        MTNMoMo: 0,
        AirtelMoney: 0,
        ProfMM: 0,
      }

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
      };
    
      const handleWeekChange = (event) => {
        const selectedWeek = event.target.value;
        setSelectedWeek(selectedWeek);
      };

      const handleYearChange = (event) => {
        const selectedWeek = event.target.value;
        setSelectedYear(selectedWeek);
      };

      useEffect(() => {
        const fetchExpensesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialshopexpenses', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            setExpensesData(res.data);
          }
        }
      
        fetchExpensesData()
      }, [])


      useEffect(() => {
        const filterExpensesData = () => {
          const filteredExpenses = expensesData.filter((expense) => {
            const expensesDate = expense.date.split("/"); // Split date into day, month, year
            const expenseDay = parseInt(expensesDate[0], 10);
            const expenseMonth = parseInt(expensesDate[1], 10);
            const expenseYear = parseInt(expensesDate[2], 10);
    
            if (
              selectedMonth !== "" &&
              selectedMonth === expenseMonth.toString() && // Compare selected month with sale month
              selectedYear !== "" &&
              selectedYear === expenseYear.toString() // Compare selected year with sale year
            ) {
              return true;
            }
    
            return false;
          });
    
          setFilteredExpenses(filteredExpenses);
        };
    
        filterExpensesData();
      }, [expensesData, selectedMonth, selectedYear])





    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallequatorialshopsales', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            console.log(res.data)
            setIsLoading(false);
            setSalesData(res.data);
          }
        };
      
        fetchSalesData();
    }, [])

    useEffect(() => {
        const filterSalesData = () => {
          const filteredSales = salesData.filter((sale) => {
            const saleDate = sale.saleDate.split("/"); // Split date into day, month, year
            const saleDay = parseInt(saleDate[0], 10);
            const saleMonth = parseInt(saleDate[1], 10);
            const saleYear = parseInt(saleDate[2], 10);
    
            if (
              selectedMonth !== "" &&
              selectedMonth === saleMonth.toString() && // Compare selected month with sale month
              selectedYear !== "" &&
              selectedYear === saleYear.toString() // Compare selected year with sale year
            ) {
              return true;
            }
    
            return false;
          });
    
          setFilteredSales(filteredSales);
        };
    
        filterSalesData();
      }, [salesData, selectedMonth, selectedYear])


      useEffect(() => {
        // Calculate totalAmount, totalAmountPaid, and balance
        let totalAmount = 0;
        let totalAmountPaid = 0;
        let balance = 0;
      
        let totalExpenseAmount = 0;
        let totalExpenseAmountPaid = 0;
        let expenseAmountNotPaid = 0;
      
        filteredSales.forEach((sale) => {
          totalAmount += sale.totalAmount;
          totalAmountPaid += sale.totalAmount - sale.balance;
          balance += sale.balance;

          if (sale.paymentMethod === 'Cash') {
            paymentMethods.Cash += sale.totalAmount-sale.balance;
          } else if (sale.paymentMethod === 'Prof MM') {
            paymentMethods.ProfMM += sale.totalAmount-sale.balance;
          } else if (sale.paymentMethod === 'Visa') {
            paymentMethods.Visa += sale.totalAmount-sale.balance;
          }else if (sale.paymentMethod === 'MTN MoMo') {
            paymentMethods.MTNMoMo += sale.totalAmount-sale.balance;
          }else if (sale.paymentMethod === 'Airtel Money') {
            paymentMethods.AirtelMoney += sale.totalAmount-sale.balance;
          }
        });
      
        filteredExpenses.forEach((expense) => {
          totalExpenseAmount += expense.expenditurecost;
          totalExpenseAmountPaid += expense.amountspent;
          expenseAmountNotPaid += expense.balance;

          if (expense.paymentmethod === 'Cash') {
            ExpensepaymentMethod.Cash += expense.amountspent;
          } else if (expense.paymentmethod === 'Prof MM') {
            ExpensepaymentMethod.ProfMM += expense.amountspent;
          } else if (expense.paymentmethod === 'Visa') {
            ExpensepaymentMethod.Visa += expense.amountspent;
          }else if (expense.paymentmethod === 'MTN MoMo') {
            ExpensepaymentMethod.MTNMoMo += expense.amountspent;
          }else if (expense.paymentmethod === 'Airtel Money') {
            ExpensepaymentMethod.AirtelMoney += expense.amountspent;
          }
        });
      
        setTotalAmount(totalAmount);
        setTotalAmountPaid(totalAmountPaid);
        setBalance(balance);
        setPaymentMethodTotals(paymentMethods)
        console.log(ExpensepaymentMethod)
        setExpensePaymentMethodTotals(ExpensepaymentMethod)
      
        setTotalExpenditureAmount(totalExpenseAmount);
        setTotalExpenditureAmountPaid(totalExpenseAmountPaid);
        setExpenditureBalance(expenseAmountNotPaid);
        //setIsCalculationsLoading(false);
      }, [filteredSales, filteredExpenses])

      useEffect(() => {
        const fetchMassageData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallincomesubmissionrecords', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            setMassageData(res.data);
          }
        }
      
        fetchMassageData()
      }, [])

      useEffect(()=>{

        const filteredData = massageData.filter((data)=>{
          const saleDate = data.submissionDate.split("/"); // Split date into day, month, year
          const saleDay = parseInt(saleDate[0], 10);
          const saleMonth = parseInt(saleDate[1], 10);
          const saleYear = parseInt(saleDate[2], 10);
  
          if (
            selectedMonth !== "" &&
            selectedMonth === saleMonth.toString() && // Compare selected month with sale month
            selectedYear !== "" &&
            selectedYear === saleYear.toString() // Compare selected year with sale year
          ) {
            return true;
          }
  
          return false;
        })
        setFilteredMassageData(filteredData)

                  let grandTotalMassageAmount = 0;
                  let grandTotalProductAmount = 0;
            
                  // Calculate totals for each object and accumulate them
                  filteredData.forEach(item => {
                      const totalMassageAmount = item.massageamount;
                      const totalProductAmount = item.productamount;
            
                      grandTotalMassageAmount += totalMassageAmount;
                      grandTotalProductAmount += totalProductAmount;
                  })
                  setTotalMassageAmount(grandTotalMassageAmount+grandTotalProductAmount)
      
    },[massageData, selectedMonth, selectedYear])


    return(
        <div style={{backgroundColor:'#E9E9E9', color:'black'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Equatorial Shop Monthly Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'10px' }}>
                        <label htmlFor="week" style={{color:'black'}}>Select Year: </label>
                        <select id="week" value={selectedYear}  style={{ width: '300px' }} className="form-control" onChange={handleYearChange}>
                        <option value="">All Years</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="month" style={{color:'black'}}>Select Month: </label>
                        <select id="month" value={selectedMonth} style={{ width: '300px' }} className="form-control" onChange={handleMonthChange}>
                        <option value="">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                        </select>
                    </div>
                    <h1 style={{textAlign:'center', color:'black',marginTop:'40px'}}>Monthly Sales List</h1>
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
                                    <th scope="col">Additional Notes</th>
                                    <th scope="col">Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? filteredSales.map(item => (
                                    <tr>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr>
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
                                        <td>{item.additionalinfo}</td>
                                        <td>{item.paymentMethod}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>No data...</td></tr>}
                                    {/* Grand total row */}
                                        {!isLoading && filteredSales.length > 0 && (
                                        <tr>
                                            <td colSpan="4"></td>
                                            <td>
                                            <strong>
                                                Grand Total:
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredSales.reduce((total, item) => total + item.totalAmount, 0)}
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredSales.reduce((total, item) => total + (item.totalAmount - item.balance), 0)}
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredSales.reduce((total, item) => total + item.balance, 0)}
                                            </strong>
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        )}
                            </tbody>
                        </table>
                        <h2 style={{textAlign:'center', marginTop:'60px',color:'black'}}>Monthly Expenditure List</h2>
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
                                    <th scope="col">Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isLoading ? filteredExpenses.map(item => (
                                    <tr>
                                        <td>{item.expenditureid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.expenditurecategory}</td>
                                        <td>{item.expenditurename}</td>
                                        <td>{item.expendituredescription}</td>
                                        <td>{item.expenditurecost}</td>
                                        <td>{item.amountspent}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.paymentmethod}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='8'>Loading...</td></tr>}
                                {/* Grand total row */}
                                {!isLoading && filteredExpenses.length > 0 && (
                                        <tr>
                                            <td colSpan="4"></td>
                                            <td>
                                            <strong>
                                                Grand Total:
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredExpenses.reduce((total, item) => total + item.expenditurecost, 0)}
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredExpenses.reduce((total, item) => total + (item.expenditurecost - item.balance), 0)}
                                            </strong>
                                            </td>
                                            <td>
                                            <strong>
                                                {filteredExpenses.reduce((total, item) => total + item.balance, 0)}
                                            </strong>
                                            </td>
                                            <td></td>
                                        </tr>
                                        )}
                            </tbody>
                        </table>
                        <h2 style={{textAlign:'center', marginTop:'60px',color:'black'}}>Daily Net Profit / Loss Report</h2>
                    <div style={{display:'inline-block'}}>
                        <h4>Gross Income Analysis</h4>
                        {totalAmount ? 
                            <>
                                <p>Total Amount From Sales: UGX {totalAmount}</p>
                                <p>Amount Recieved (Cash): UGX {paymentMethodTotals.Cash}</p>
                                <p>Amount Recieved (MTN MoMo): UGX {paymentMethodTotals.MTNMoMo}</p>
                                <p>Amount Recieved (Airtel Money): UGX {paymentMethodTotals.AirtelMoney}</p>
                                <p>Amount Recieved (Prof MM): UGX {paymentMethodTotals.ProfMM}</p>
                                <p>Amount Recieved (Visa): UGX {paymentMethodTotals.Visa}</p>
                                <p>Total Amount Recieved: UGX {totalAmountPaid}</p>
                                <p>Total Amount Not Paid: UGX {balance}</p>
                            </>
                            : <p>No data.....</p>
                        }
                    </div>
                    <div style={{display:'inline-block',marginLeft:'100px'}}>
                        <h4>Total Expenditure Analysis</h4>
                        {totalExpenditureAmount ? 
                            <>
                                <p>Total Expenditure Amount: UGX {totalExpenditureAmount}</p>
                                <p>Expense Paid By (Cash): UGX {expensePaymentMethodTotals.Cash}</p>
                                <p>Expense Paid By (MTN MoMo): UGX {expensePaymentMethodTotals.MTNMoMo}</p>
                                <p>Expense Paid By (Airtel Money): UGX {expensePaymentMethodTotals.AirtelMoney}</p>
                                <p>Expense Paid By (Prof MM): UGX {expensePaymentMethodTotals.ProfMM}</p>
                                <p>Expense Paid By (Visa): UGX {expensePaymentMethodTotals.Visa}</p>
                                <p>Total Expenditure Amount Paid: UGX {totalExpenditureAmountPaid}</p>
                                <p>Total Expenditure Amount Not Paid: UGX {expenditureBalance}</p>
                            </>
                            : <p>No data.....</p>
                        }
                    </div>
                    <div style={{float:'right'}}>
                        <h4>Net Profit / Loss Analysis</h4>
                        {(totalAmount || totalExpenditureAmount) ? 
                            <>
                                <p>Total Amount From Sales: UGX {totalAmount}</p>
                                <p>Total Expenditure Amount: UGX {totalExpenditureAmount}</p>
                                <p>Total Sales Amount Recieved: UGX {totalAmountPaid}</p>
                                <p>Total Income Amount From Massage Department: UGX {totalMassageAmount}</p> 
                                <p>Total Expenditure Amount Spent: UGX {totalExpenditureAmountPaid}</p>
                                <p>Total Sales Amount Not Recieved: UGX {balance}</p>
                                <p>Total Expenditure Amount Not Paid: UGX {expenditureBalance}</p>
                                <p>Total Net Income Available (Cash): UGX {paymentMethodTotals.Cash-expensePaymentMethodTotals.Cash}</p>
                                <p>Total Net Income Available (MTN MoMo): UGX {paymentMethodTotals.MTNMoMo-expensePaymentMethodTotals.MTNMoMo}</p>
                                <p>Total Net Income Available (Airtel Money): UGX {paymentMethodTotals.AirtelMoney-expensePaymentMethodTotals.AirtelMoney}</p>
                                <p>Total Net Income Available (Prof MM): UGX {paymentMethodTotals.ProfMM-expensePaymentMethodTotals.ProfMM}</p>
                                <p>Total Net Income Available (Visa): UGX {paymentMethodTotals.Visa-expensePaymentMethodTotals.Visa}</p>
                            </>
                            : <p>No data.....</p>
                    }
                    </div>
                </Col>
                <Col sm='12' md='1' lg='1' xl='1'></Col>
            </Row>
            <Row style={{marginTop:'50px'}}></Row>

        </div>
    )
}

export default EquatorialShopMonthlySalesReport