const DisplayActiveClientSubscription = () => {
    return(
        <>
            <h3 style={{textAlign:'center'}}>Display Active Client Subscriptions</h3>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Subscription Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Client Names</th>
                                    <th scope="col">Client Contact</th>
                                    <th scope="col">Service Subscribed For</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {!isLoading ? salesData.map(item => (
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
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>} */}
                            </tbody>
                        </table>
        </>
    )
}

export default DisplayActiveClientSubscription