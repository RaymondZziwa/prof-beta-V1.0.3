const DisplayLabellingDailyOutputRecords = ({records}) => {
    return(
        <div style={{marginTop:'60px'}}>
        <table className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity Labelled</th>
                        <th scope="col">Units</th>
                        <th scope="col">Recorded By</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Delivery Note Number</th>
                    </tr>
                </thead>
                <tbody>
                    {!records ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                        records.map(item => (
                            <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.productName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.units}</td>
                                <td>{item.recordedby}</td>
                                <td>{item.notes}</td>
                                <td>{item.deliverynotenumber}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
    </div>
    )
}
export default DisplayLabellingDailyOutputRecords