import { useState, useEffect } from "react"
import moment from 'moment'

const DisplayAllRecords = ({records}) => {
    const [selectedDay, setSelectedDay] = useState()
    const [filteredRecords, setFilteredRecords] = useState([])

    useEffect(()=>{
        const formattedDate = moment(selectedDay).format('DD/MM/YYYY')

       if (formattedDate && records) {
            const filteredIncomeRecords = records.filter((record) => {
                const submissionDate = moment(record.submissionDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
                return submissionDate === formattedDate;
            });
            setFilteredRecords(filteredIncomeRecords )
       }

    },[selectedDay, records])

    const selectedDateHandler = (event) => {
        event.preventDefault()
        setSelectedDay(event.target.value)
    }
    return(
        <>
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <label htmlFor="date-select" style={{color:'black'}}>Filter By The Day:</label>
            <input type="date" id="date-select" className="form-control" style={{ width: '300px' }} onChange={selectedDateHandler}/>
        </div>
        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                                <thead style={{ textAlign: 'center' }}>
                                    <tr>
                                        <th scope="col">Submission Id</th>
                                        <th scope="col">Submission Date</th>
                                        <th scope="col">Amount From Massage (UGX)</th>
                                        <th scope="col">Amount From Products (UGX)</th>
                                        <th scope="col">Submitted By</th>
                                        <th scope="col">Recieved By</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRecords && filteredRecords.length > 0 ? (
                                        filteredRecords.map((item) => (
                                        <tr key={item.submissionId}>
                                            <td>{item.submissionId}</td>
                                            <td>{item.submissionDate}</td>
                                            <td>{item.massageamount}</td>
                                            <td>{item.productamount}</td>
                                            <td>{item.submittedBy}</td>
                                            <td>{item.receivedby}</td>
                                            <td>{item.submissionstatus}</td>
                                        </tr>
                                        ))
                                    ) : records && records.length > 0 ? (
                                        records.map((item) => (
                                        <tr key={item.submissionId}>
                                            <td>{item.submissionId}</td>
                                            <td>{item.submissionDate}</td>
                                            <td>{item.massageamount}</td>
                                            <td>{item.productamount}</td>
                                            <td>{item.submittedBy}</td>
                                            <td>{item.receivedby}</td>
                                            <td>{item.submissionstatus}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan='7'>No pending submissions....</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
        </>
    )
}

export default DisplayAllRecords