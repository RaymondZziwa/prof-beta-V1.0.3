import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../../side navbar/sidenav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const SaphroneCompetitionDailyAnalysis = () => {
    const [selectedDay, setSelectedDay] = useState()
    const [allRecords, setAllRecords] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [total, setTotal] = useState(0)

    const selectedDateHandler = (event) => {
        event.preventDefault()
        setSelectedDay(event.target.value)
    }

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
        }

        fetchAllData()
    }, [])

    useEffect(()=>{
        const formattedDate = moment(selectedDay).format('DD/MM/YYYY')

       if (formattedDate) {
            const filteredData = allRecords.filter((data) => {
                const saleDate = moment(data.date, 'DD/MM/YYYY').format('DD/MM/YYYY');
                return saleDate === formattedDate;
            })

            const totalMerchandiseSoldByEmployee = [];

            filteredData.forEach((data) => {
              const date = data.date;
              const employeeName = `${data.firstName} ${data.lastName}`;
              const employeeId = data.employeeId;
              const merchandiseSold = data.merchandisesold;
            
              // Find if an entry with the same employeeId already exists in the array
              const existingEntry = totalMerchandiseSoldByEmployee.find((entry) => entry.employeeId === employeeId);
            
              if (existingEntry) {
                // If an entry already exists, update its merchandiseSold property
                existingEntry.merchandisesold += merchandiseSold;
              } else {
                // If no entry exists for the employeeId, create a new entry
                totalMerchandiseSoldByEmployee.push({
                  date: date, // Use the date value from your data object
                  employeeName: employeeName, // Combining first and last name as employeeName
                  employeeId: employeeId,
                  merchandisesold: merchandiseSold,
                });
              }
            });
            
            setFilteredData(totalMerchandiseSoldByEmployee)
            
            let totalQuantitySold = 0;
            if (filteredData && filteredData.length > 0) {
                totalQuantitySold = filteredData.reduce((acc, data) => {
                    return acc + data.merchandisesold;
                }, 0);

                setTotal(totalQuantitySold)
            }



       }

    },[selectedDay])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <Col  sm='12' md='8' lg='8' xl='8' style={{marginTop:'60px'}}>
                <h2 style={{textAlign:'center'}}>Daily Competition Analysis</h2>
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="date-select" style={{color:'black'}}>Select The Day:</label>
                        <input type="date" id="date-select" className="form-control" style={{ width: '300px' }} onChange={selectedDateHandler}/>
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
                                    <td>{data.employeeName}</td>
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

export default SaphroneCompetitionDailyAnalysis