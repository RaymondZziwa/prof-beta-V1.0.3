import { useState } from "react"
import axios from "axios"

const UpdateBatchStatus = () => {
    const [batchNo, setBatchNo] = useState('')
    const [isBatchDataLoading, setIsBatchDataLoading] = useState(true)
    const [batchData, setBatchData] = useState([])
    const [fetchErr, setFetchErr] = useState('')
    const [status, setStatus] = useState('')
    const [stage, setStage] = useState('')

    
    const [itemsPostRequested, setItemsPostRequested] = useState([{ itemName: '', itemQuantity: '',itemNewQuantity: '', Damages:'', mUnits: '' },])

    const stageHandler = event => {
        event.preventDefault()
        setStage(event.target.value)
    }

    const handlePostInput = (index, event) => {
        let values = [...itemsPostRequested];
        values[index][event.target.name] = event.target.value;
        setItemsPostRequested(values)
        console.log(index)
    }

    const batchNoHandler = event => {
        event.preventDefault()
        setBatchNo(event.target.value)
    }

    const fetchBatchData = async event => {
        event.preventDefault()
        console.log('sent')
        
        let res = await axios.post('http://82.180.136.230:3005/fetchdatafromfarm',{
            token: localStorage.getItem('token'),
            batchNo: batchNo.trim()
        })
        console.log('btc' , res.data)

        if(typeof res.data === "string"){
            setFetchErr('No records found.')
        }else{
            const items = res.data.map(item => {
                const parsed = JSON.parse(item.items);
                return parsed;
            });
            setItemsPostRequested(items.flat())
            setBatchData(res.data)
            setIsBatchDataLoading(false)
        }
    }

    const updateProcess = async event => {
        event.preventDefault()
        itemsPostRequested.map((item) => {
            item.Damages = parseFloat(item.itemQuantity) - parseFloat(item.itemNewQuantity)
        })
         function pad(num) {
             var s = "" + num;
             if (num < 10) {
                 s = "0" + num;
             }
             return s;
         }
         const tdate = new Date()
         const month = pad(tdate.getMonth() + 1)
         const dd = pad(tdate.getDate())
         const date = `${tdate.getFullYear()}-${month}-${dd}`

            

         console.log(JSON.stringify(itemsPostRequested))

         let res = await axios.post('http://82.180.136.230:3005/savebatchstage',{
             token: localStorage.getItem('token'),
             batchNumber: batchNo,
             items: JSON.stringify(itemsPostRequested),
             stage: stage,
             date: date
         }).then(() => setStatus({ type: 'success' }))
         .catch((err) => setStatus({ type: 'error', err }))
    }
    
    return(
     <>
            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Operation Successful</span>}
            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</span>}
            <div className="form-floating mb-3">
                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={batchNoHandler} required />
                <label for="floatingInput">Batch Number</label>
                <button style={{marginTop:'10px'}} className="btn btn-primary" onClick={fetchBatchData}>Retrieve Batch Data</button>
            </div>

            <table className="table table-dark" style={{ marginTop: '50px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Batch Number</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Current Stage</th>
                                    <th scope="col">Stage Start Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isBatchDataLoading ? <tr><td>{fetchErr}</td></tr> :
                                    batchData.map(item => (
                                        <tr>
                                            <td>{item.batchno}</td>
                                            <td>
                                                <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Initial Quantity</th>
                                                            <th scope="col">New Quantity</th>
                                                            <th scope="col">Damages</th>
                                                            <th scope="col">Units Of Measurement</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {JSON.parse(item.items).map((itemrecord, index)=>
                                                            <tr key={index}>
                                                                <td>
                                                                    <div>
                                                                            <input class="form-select"
                                                                                name="itemName"
                                                                                aria-label="Default select example"
                                                                                placeholder="Item Name"
                                                                                style={{ width:'180px' }}
                                                                                onChange={event => handlePostInput(index, event)}
                                                                                value={itemrecord.itemName}
                                                                                readOnly
                                                                            required />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input className="form-control"
                                                                                name="itemQuantity"
                                                                                aria-label="Default select example"
                                                                                placeholder="Item Qty"
                                                                                style={{ width:'50px' }}
                                                                                onChange={event => handlePostInput(index, event)}
                                                                                value={itemrecord.itemQuantity}
                                                                                readOnly
                                                                        required />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <input
                                                                            className="form-control"
                                                                            id="floatingInput"
                                                                            name="itemNewQuantity"
                                                                            placeholder="New Qty"
                                                                            style={{ color: "#8CA6FE", width:'100px' }}
                                                                            defaultValue={item.itemNewQuantity}
                                                                            onChange={event => { handlePostInput(index, event) }}
                                                                            required />
                                                                    </div>
                                                                </td>
                                                                <td>{itemrecord.Damages}</td>
                                                                <td>{itemrecord.mUnits}</td>
                                                            </tr>
                                                        )} 
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td>{item.stage}</td>
                                            <td>{item.stagestartedon}</td>
                                        </tr>
                                    ))
                                }
                            </tbody> 
                        </table>
                        <div className="form-floating mb-3">
                        <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }}  onChange={stageHandler} required>
                        <option defaultValue>Choose new stage</option>
                        <option value='nursery'>incubator</option>
                            <option value='nursery'>nursery</option>
                            <option value='sent to general store'>sent to store</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{ textAlign: 'center' }}>
                        <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={updateProcess}>UPDATE</button>
                    </div>
        </>
    )
}

export default UpdateBatchStatus