const FindActiveClientSubscriptions = () => {
    return(
       <>
        <h3 style={{textAlign:'center'}}>Retrieve Active Client Subscriptions</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} />
                <label for="floatingInput">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} />
                <label for="floatingInput">Middle Name</label>
            </div>
            <div className="form-floating mb-3" >
                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'200px' }} />
                <label for="floatingInput">Last Name</label>
            </div>
            <button className="btn btn-primary" style={{height:'50px'}}>Retrieve</button>
        </div>
       </>
    )
}

export default FindActiveClientSubscriptions