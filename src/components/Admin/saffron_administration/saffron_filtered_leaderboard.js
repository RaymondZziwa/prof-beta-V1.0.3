import {Row, Col} from 'react-bootstrap'
import SaphroneLeaderboard from '../../Saphorne_Competition/Leaderboard/leaderboard'
import '../../Saphorne_Competition/Dashboard/leaderboard.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SaffronFilteredLeaderboard = () => {
    const [selectedGender, setSelectedGender] = useState('')

    const [allRecords, setAllRecords] = useState([])
    const [allData, setAllData] = useState([])
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [participantData, setParticipantData] = useState([]);

    const [periodData, setPeriodData] = useState({})

    const filterDataByDateRange = (data, fromDate, toDate) => {
        function formatDate(inputDate) {
            const parts = inputDate.split('-'); // Split the date string by "-"
            if (parts.length === 3) {
              // Ensure there are three parts (year, month, and day)
              const [year, month, day] = parts;
              return `${day}/${month}/${year}`; // Rearrange and join the parts
            }
            // Return the input date if it's not in the expected format
            return inputDate;
          }
    
        if(fromDate.length > 0 && toDate.length > 0){
            const fromDateFormatted = formatDate(fromDate);
            const toDateFormatted = formatDate(toDate);
        
            const filteredData = data.filter(data => {
                const saleDate = data.date
                return saleDate >= fromDateFormatted && saleDate <= toDateFormatted;
            });
            return filteredData;
        }
        
    };

    useEffect(() => {
       const filteredData = filterDataByDateRange (allRecords, fromDate, toDate)
        console.log('man', filteredData)

       const employeeTotals = {}; // Create an object to store totals for each employeeId

       if(filteredData){
        filteredData.forEach((record) => {
            const { employeeId, firstName, lastName, merchandisesold } = record;
            const points = merchandisesold * 0.5;
    
            if (!employeeTotals[employeeId]) {
                // If employeeId is not in the totals object, initialize it
                employeeTotals[employeeId] = {
                firstName: firstName,
                lastName: lastName,
                merchandisesold: merchandisesold,
                points: points,
                }
                
            } else {
                // If employeeId is already in the totals object, update the totals
                employeeTotals[employeeId].totalMerchandisesold += merchandisesold;
                employeeTotals[employeeId].totalPoints += points;
            }
            });
    
            console.log('zaq', employeeTotals)
            const totalsArray = Object.values(employeeTotals);
            setParticipantData(totalsArray)
       }
    }, [toDate]);
    

    const genderHandler = (e) => {
        const selectedValue = e.target.value;
        setSelectedGender(selectedValue);

        const filteredGenderData = allData.filter((data) => data.gender === selectedValue);
        const sortedData = filteredGenderData.sort((a, b) => b.points - a.points);
        setParticipantData(sortedData);
    }
    
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.post(
                    'http://82.180.136.230:3005/fetchallsaphronesalesdata',
                    {
                        token: localStorage.getItem('saphroneAuthToken'),
                    }
                );
    
                if (Array.isArray(res.data)) {
                    setAllRecords(res.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchAllParticipantData = async () => {
            try {
                const res = await axios.post(
                    'http://82.180.136.230:3005/fetchallparticipantperformancerecords',
                    {
                        token: localStorage.getItem('saphroneAuthToken'),
                    }
                );
    
                if (Array.isArray(res.data) && !selectedGender) {
                    // Sort the data by 'points' in descending order
                    const sortedData = res.data.sort((a, b) => b.points - a.points);
                    setParticipantData(sortedData);
                    setAllData(res.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAllData()
        fetchAllParticipantData();
    }, [selectedGender]); 

    return(
       <div>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' className='ld-col d-flex flex-column align-items-center justify-content-center'>
                <h3 style={{textAlign:'center', color:'white'}}>Filter Competition Leaderboard</h3>
                <div className="d-flex flex-column align-items-center" style={{textAlign:'center'}}>
                    <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} onChange={genderHandler} required>
                                <option defaultValue>Filter By Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                    </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
            <div className="mb-3">
            <label htmlFor="fromDate" className="form-label" style={{ marginRight: '5px' }}>
                From
            </label>
            <input
                type="date"
                className="form-control"
                id="fromDate"
                onChange={(e) => setFromDate(e.target.value)}
                required
            />
            </div>
        </div>
        -
        <div style={{ marginLeft: '10px' }}>
            <div className="mb-3">
            <label htmlFor="toDate" className="form-label" style={{ marginRight: '5px' }}>
                To
            </label>
            <input
                type="date"
                className="form-control"
                id="toDate"
                onChange={(e) => setToDate(e.target.value)}
                required
            />
            </div>
        </div>
        </div>
        {/* <button className="btn btn-primary" onClick={filterDataByDateRange} ><FontAwesomeIcon icon={faFilter} fade style={{color: "white"}} />Filter</button> */}
            <SaphroneLeaderboard participantData={participantData}/> 
        </div>
            </Col>

        </Row>
       </div>
    )
}
export default SaffronFilteredLeaderboard