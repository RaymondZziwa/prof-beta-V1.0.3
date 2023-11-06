import { useState } from 'react'

const DisplayRecords = ({records}) => {

    //const [selectedSupplyId, setSelectedSupplyId] = useState(null)
    const [filteredRecords, setFilteredRecords] = useState([])
    const [dept, setDept] = useState('')

    const dataFilterHandler = event => {
        event.preventDefault()
        if(dept){
            const filteredSubscriptionData = records.filter(
                (data) => data.departmentreleasedto === dept
              );
              setFilteredRecords(filteredSubscriptionData)
        }
    }
    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="mb-3">
                <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={(event)=> setDept(event.target.value)}>
                    <option defaultValue>Filter By Department</option>
                    <option value="Shop">Main Shop</option>
                    <option value="Labelling">Labelling Department</option>
                    <option value="Projects">Projects Department</option>
                    <option value="Massage">Massage Department</option>
                </select>
            </div>
            <button className="btn btn-primary" style={{height:'50px'}} onClick={dataFilterHandler}>Retrieve</button>
        </div>
                    <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                                <thead style={{ textAlign: 'center' }}>
                                    <tr>
                                        <th scope="col">Release Id</th>
                                        <th scope="col">Release Date</th>
                                        <th scope="col">Item Released</th>
                                        <th scope="col">Quantity Released</th>
                                        <th scope="col">Units</th>
                                        <th scope="col">Department Released To</th>
                                        <th scope="col">Recieved By</th>
                                        <th scope="col">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRecords && filteredRecords.length > 0 ? (
                                        filteredRecords.map((item) => (
                                            <tr key={item.supplyId}>
                                            <td>{item.releaseId}</td>
                                            <td>{item.releasedate}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantityreleased}</td>
                                            <td>{item.units}</td>
                                            <td>{item.departmentreleasedto}</td>
                                            <td>{item.recievedby}</td>
                                            <td>{item.notes}</td>
                                        </tr>
                                        ))
                                    ) : records && records.length > 0 ? (
                                        records.map((item) => (
                                        <tr key={item.releaseId}>
                                            <td>{item.releaseId}</td>
                                            <td>{item.releasedate}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantityreleased}</td>
                                            <td>{item.units}</td>
                                            <td>{item.departmentreleasedto}</td>
                                            <td>{item.recievedby}</td>
                                            <td>{item.notes}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='15'>No data....</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            {/* Modal */}
        </>
    )
}

export default DisplayRecords