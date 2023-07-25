import { useReducer, useState, useEffect } from "react"
import axios from "axios"

const initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    clientContact: '',
    amountPaid: '',
    notes:''
}

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
          return { ...state, [action.field]: action.value };
          case 'RESET_FORM':
            return initialState
        default:
          return state;
    }
}

const ClientNewSubscriptionForm = () => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
    }
    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status])
      
    const submitHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveclientsubscription',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            data: state
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))

        dispatch({ type: 'RESET_FORM'});
    }

    return (
        <div>       
                {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
                {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} value={state.firstName} name="firstName" onChange={handleChange}/>
                        <label for="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} value={state.middleName} name="middleName" onChange={handleChange}/>
                        <label for="floatingInput">Middle Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} value={state.lastName} name="lastName" onChange={handleChange}/>
                        <label for="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} value={state.clientContact} name="clientContact" onChange={handleChange}/>
                        <label for="floatingInput">Client Contact</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" style={{ color: "#8CA6FE", width:'250px' }} value={state.amountPaid} name="amountPaid" onChange={handleChange}/>
                        <label for="floatingInput">Amount Paid (UGX)</label>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                            <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '130px', width: '250px' }} name="notes" value={state.notes} onChange={handleChange}/>
                            <label for="floatingInput">Notes</label>
                        </div>
                    </div>    
                    <button style={{ width: "250px", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={submitHandler}>
                        Save Subscription
                    </button>  
        </div>
    )
}

export default ClientNewSubscriptionForm