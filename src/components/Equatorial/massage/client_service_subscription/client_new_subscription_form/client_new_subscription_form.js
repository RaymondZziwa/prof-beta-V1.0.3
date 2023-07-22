const ClientNewSubscriptionForm = () => {
    return (
        <div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} />
                        <label for="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} />
                        <label for="floatingInput">Middle Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} />
                        <label for="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} />
                        <label for="floatingInput">Client Contact</label>
                    </div>
                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginBottom:'10px', width:'250px'}} required>
                        <option selected>Service Being Subscribed For</option>
                    </select>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} />
                        <label for="floatingInput">Amount Paid (UGX)</label>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                            <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '130px', width: '250px' }} />
                            <label for="floatingInput">Notes</label>
                        </div>
                    </div>    
                    <button style={{ width: "250px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} >
                        Save Subscription
                    </button>  
        </div>
    )
}

export default ClientNewSubscriptionForm