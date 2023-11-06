const IndividualSubscriptionUsageModal = ({ filteredRecords }) => {
    return(
        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
        <thead style={{ textAlign: 'center' }}>
            <tr>
                <th scope="col">Subscription Id</th>
                <th scope="col">Date</th>
                <th scope="col">Service Offered</th>
                <th scope="col">Amount Spent (UGX)</th>
            </tr>
        </thead>
        <tbody>
            {filteredRecords ? filteredRecords.map(item => (
                <tr key={item.subscriptionId}>
                    <td>{item.subscriptionId}</td>
                    <td>{item.serviceDate}</td>
                    <td>{item.productName}</td>
                    <td>{item.amountSpent}</td>
                </tr>
            )) 
             : <tr><td colSpan='4'>No data...</td></tr>}
        </tbody>
    </table>
    )
}
export default IndividualSubscriptionUsageModal