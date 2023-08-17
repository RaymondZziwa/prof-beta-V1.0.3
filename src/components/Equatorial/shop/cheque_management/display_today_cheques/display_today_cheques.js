const DisplayTodayCheques = () => {
    return(
        <>
            <div style={{float:'right', color:'blue', textDecoration:'underline', cursor:'pointer'}}>
                View All Cheques
            </div>
            <table className="table table-light" style={{ marginTop: '2px' }}>
            <thead>
                <tr>
                    <th scope="col">Cheque Number</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Drawer's Names</th>
                    <th scope="col">Drawer's Contact</th>
                    <th scope="col">Payment Reason</th>
                    <th scope="col">Amount Paid (UGX)</th>
                    <th scope="col">Date Issued</th>
                    <th scope="col">Banking Date</th>
                    <th scope="col">Cheque Issued By</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Cheque Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
            </tbody>
        </table>
        </>
    )
}
export default DisplayTodayCheques