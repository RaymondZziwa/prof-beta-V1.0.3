const RecordClientSubscriptionUsage = () => {
    return(
        <>
            <h3 style={{textAlign:'center'}}>Record Client Subscription Usage</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} value={new Date().toLocaleDateString()} readOnly/>
                <label for="floatingInput">Date</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} />
                <label for="floatingInput">Subscription Id</label>
            </div>
            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginBottom:'10px', width:'250px'}} required>
                <option selected>Service Offered</option>
            </select>
        </div>
        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }}>Save Usage</button>
        </>
    )
}

export default RecordClientSubscriptionUsage