const DisplayReceiptPaymentRecords = ({receiptRecords}) => {
    return(
        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Receipt Number</th>
                                    <th scope="col">Payment Date</th>
                                    <th scope="col">Amount Paid (UGX)</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Transaction Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                { receiptRecords ?receiptRecords.map(item => (
                                    <tr key={item.receiptNumber}>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.paymentdate}</td>
                                        <td>{item.amountPaid}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.paymentMethod}</td>
                                        <td>{item.transactionId}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan='9'>Loading...</td></tr>}
                            </tbody>
                        </table>
    )
}
export default DisplayReceiptPaymentRecords