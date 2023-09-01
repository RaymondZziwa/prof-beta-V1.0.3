import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const SaphroneCompetitionWeeklyAnalysis = () => {
    const [selectedDay, setSelectedDay] = useState()
    const [allRecords, setAllRecords] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [total, setTotal] = useState(0)

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState("");
    const [selectedYear, setSelectedYear] = useState("")

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
      }

      const getWeekOfMonth = (date) => {
        const day = date.getDate();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const weekOffset = (day + firstDayOfMonth - 1) / 7;
        const weekNumber = Math.ceil(weekOffset);
      
        return weekNumber;
    };



    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.post(
                    'http://82.180.136.230:3005/fetchallsaphronesalesdata',
                    {
                        token: localStorage.getItem('token'),
                    }
                );
    
                if (Array.isArray(res.data)) {
                    setAllRecords(res.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData()
    }, [])

    useEffect(() => {
        const filterSalesData = () => {
          const filteredSales = allRecords.filter((sale) => {
            const saleDate = sale.date.split("/"); // Split date into day, month, year
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
    
          setFilteredData(filteredSales);
        };
    
        filterSalesData();
        let totalQuantitySold = 0;
            if (filteredData && filteredData.length > 0) {
                totalQuantitySold = filteredData.reduce((acc, data) => {
                    return acc + data.merchandisesold;
                }, 0);

                setTotal(totalQuantitySold)
            }
    }, [selectedMonth, selectedYear])


   useEffect(() => {
            const handleFilterSales = () => {
                   // Convert selectedWeek to a number
                const weekNumber = parseInt(selectedWeek);

                // Filter salesData based on selectedMonth and weekNumber
                const filteredSales = allRecords.filter((sale) => {
                const [saleDay, saleMonth, saleYear] = sale.date.split('/');
                const saleDate = new Date(`${saleYear}-${saleMonth}-${saleDay}`);
                const saleMonthNumber = saleDate.getMonth() + 1; // Months are zero-based in JavaScript
                const saleWeek = getWeekOfMonth(saleDate);

                return (
                    parseInt(selectedMonth) === saleMonthNumber && // Compare selected month with sale month
                    weekNumber === saleWeek
                );
                });

                // Set the filtered sales
                setFilteredData(filteredSales);
            }
            handleFilterSales()
            let totalQuantitySold = 0;
            if (filteredData && filteredData.length > 0) {
                totalQuantitySold = filteredData.reduce((acc, data) => {
                    return acc + data.merchandisesold;
                }, 0);

                setTotal(totalQuantitySold)
            }
          }, [selectedWeek]);

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <Col  sm='12' md='8' lg='8' xl='8' style={{marginTop:'60px'}}>
                <h2 style={{textAlign:'center'}}>Weekly Competition Analysis</h2>
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
                    <div>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">EmployeeId</th>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Quantity Sold</th>
                                    <th scope="col">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ?
                                filteredData.map((data)=> 
                                <tr>
                                    <td>{data.date}</td>
                                    <td>{data.employeeId}</td>
                                    <td>{data.firstName} {data.lastName}</td>
                                    <td>{data.merchandisesold}</td>
                                    <td>{data.merchandisesold*0.5}</td>
                                </tr>
                                ) :
                                <tr>
                                    <td colSpan='5'>Select the day</td>
                                </tr>
                                }
                            </tbody>
                        </table>
                        <tfoot>
                    <tr>
                        <td colSpan="5"></td>
                        <td>Total Quantity Sold: </td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
                    </div>
            </Col>
            <Col sm='12' md='2' lg='2' xl='2'>
            </Col>
        </Row>
    )
}

export default SaphroneCompetitionWeeklyAnalysis