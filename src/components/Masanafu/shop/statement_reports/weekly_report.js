import { useState, useEffect } from "react"
import axios from "axios"
import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import ReportPrintingButton from "../reports/reports_generic_components/support_components/report_printing button"
import { getISOWeek } from "date-fns";

const MasanafuWeeklySalesReport = () => {
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

    const [totalExpenditureAmount, setTotalExpenditureAmount] = useState(0);
    const [totalExpenditureAmountPaid, setTotalExpenditureAmountPaid] = useState(0);
    const [expenditureBalance, setExpenditureBalance] = useState(0)

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
      };
    
      const handleWeekChange = (event) => {
        const selectedWeek = event.target.value;
        setSelectedWeek(selectedWeek);
      };

      const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
      };


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


      useEffect(() => {
        const filterExpensesData = () => {
          const newFilteredExpenses = expensesData.filter((expense) => {
            const expenseDate = expense.date.split("/"); // Split date into day, month, year
            const expenseDay = parseInt(expenseDate[0], 10);
            const expenseMonth = parseInt(expenseDate[1], 10);
            const expenseYear = parseInt(expenseDate[2], 10);
    
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
    
          setFilteredExpenses(newFilteredExpenses);
        };

        filterExpensesData()
      }, [expensesData, selectedMonth, selectedYear])

      useEffect(() => {
        const handleFilterExpenses = () => {
               // Convert selectedWeek to a number
            const weekNumber = parseInt(selectedWeek);

            // Filter salesData based on selectedMonth and weekNumber
            const filteredExpenses = expensesData.filter((expense) => {
            const [expenseDay, expenseMonth, expenseYear] = expense.date.split('/');
            const expenseDate = new Date(`${expenseYear}-${expenseMonth}-${expenseDay}`);
            const expenseMonthNumber = expenseDate.getMonth() + 1; // Months are zero-based in JavaScript
            const expenseWeek = getWeekOfMonth(expenseDate);

            return (
                parseInt(selectedMonth) === expenseMonthNumber && // Compare selected month with sale month
                weekNumber === expenseWeek 
            );
            });

            // Set the filtered sales
            setFilteredExpenses(filteredExpenses);
        }
        handleFilterExpenses()
      }, [filteredExpenses, selectedWeek])



    useEffect(() => {
        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallshopsales', {
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
      }, [selectedMonth, selectedYear])

        useEffect(() => {
            const handleFilterSales = () => {
                   // Convert selectedWeek to a number
                const weekNumber = parseInt(selectedWeek);

                // Filter salesData based on selectedMonth and weekNumber
                const filteredSales = salesData.filter((sale) => {
                const [saleDay, saleMonth, saleYear] = sale.saleDate.split('/');
                const saleDate = new Date(`${saleYear}-${saleMonth}-${saleDay}`);
                const saleMonthNumber = saleDate.getMonth() + 1; // Months are zero-based in JavaScript
                const saleWeek = getWeekOfMonth(saleDate);

                return (
                    parseInt(selectedMonth) === saleMonthNumber && // Compare selected month with sale month
                    weekNumber === saleWeek
                );
                });

                // Set the filtered sales
                setFilteredSales(filteredSales);
            }
            handleFilterSales()
          }, [selectedWeek]);
        
        //   // Function to get the week number from a date
        //   const getWeekOfMonth = (date) => {
        //     const adjustedDate = date.getDate() + date.getDay();
        //     const prefixes = ['0', '1', '2', '3', '4', '5'];
        //     return parseInt(prefixes[0 | adjustedDate / 7]) + 1;
        //   };
        // const getWeekOfMonth = (date) => {
        //     const day = date.getDate();
        //     const weekOffset = date.getDay() === 0 ? 0 : 1; // Adjust the week offset based on the starting day of the week
        //     const weekNumber = Math.ceil((day - (weekOffset + 1) + 1) / 7); // Calculate the week number
          
        //     return weekNumber;
        // }
        // const getWeekOfMonth = (date) => {
        //     const day = date.getDate();
        //     const weekOffset = (date.getDay() + 6) % 7; // Adjust the week offset based on the starting day of the week
        //     const weekNumber = Math.ceil((day + weekOffset) / 7); // Calculate the week number
          
        //     return weekNumber;
        // }
        const getWeekOfMonth = (date) => {
            const day = date.getDate();
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            const weekOffset = (day + firstDayOfMonth - 1) / 7;
            const weekNumber = Math.ceil(weekOffset);
          
            return weekNumber;
        };

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
            });
          
            filteredExpenses.forEach((expense) => {
              totalExpenseAmount += expense.expenditurecost;
              totalExpenseAmountPaid += expense.amountspent;
              expenseAmountNotPaid += expense.balance;
            });
          
            setTotalAmount(totalAmount);
            setTotalAmountPaid(totalAmountPaid);
            setBalance(balance);
          
            setTotalExpenditureAmount(totalExpenseAmount);
            setTotalExpenditureAmountPaid(totalExpenseAmountPaid);
            setExpenditureBalance(expenseAmountNotPaid);
            //setIsCalculationsLoading(false);
          }, [filteredSales, filteredExpenses]);

    return(
        <div style={{backgroundColor:'#E9E9E9', color:'black'}}>
            <Row>
                <Col sm='12' md='1' lg='1' xl='1'>
                    <Navbar />
                </Col>
                <Col sm='12' md='10' lg='10' xl='10'>
                    <h1 style={{textAlign:'center', color:'black',marginTop:'60px'}}>Masanafu Shop Weekly Report <span style={{float:'right',marginRight:'10px'}}><ReportPrintingButton /></span></h1>
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
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'10px' }}>
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
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'10px' }}>
                        <label htmlFor="week" style={{color:'black'}}>Select Week: </label>
                        <select id="week" value={selectedWeek}  style={{ width: '300px' }} className="form-control" onChange={handleWeekChange}>
                        <option value="">All Weeks</option>
                        <option value="1">Week 1</option>
                        <option value="2">Week 2</option>
                        <option value="3">Week 3</option>
                        <option value="4">Week 4</option>
                        <option value="5">Week 5</option>
                        </select>
                    </div>
                    <h1 style={{textAlign:'center', color:'black',marginTop:'40px'}}>Weekly Sales List</h1>
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

                        <h2 style={{textAlign:'center', marginTop:'60px',color:'black'}}>Weekly Expenditure List</h2>
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
                                <p>Total Expenditure Amount Spent: UGX {totalExpenditureAmountPaid}</p>
                                <p>Total Sales Amount Not Recieved: UGX {balance}</p>
                                <p>Total Expenditure Amount Not Paid: UGX {expenditureBalance}</p>
                                <p>Total Net Income Available: UGX {totalAmountPaid-totalExpenditureAmountPaid}</p>
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

export default MasanafuWeeklySalesReport