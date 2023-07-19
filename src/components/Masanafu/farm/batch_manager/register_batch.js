import { useState } from "react"
import axios from "axios"

const StartBatchProcess = () => {
    const [batchNo, setBatchNo] = useState('')
    const [isBatchDataLoading, setIsBatchDataLoading] = useState(true)
    const [batchData, setBatchData] = useState([])
    const [fetchErr, setFetchErr] = useState('')
    const [status, setStatus] = useState('')
    const [stage, setStage] = useState('')

    const stageHandler = event => {
        event.preventDefault()
        setStage(event.target.value)
    }

    const batchNoHandler = event => {
        event.preventDefault()
        setBatchNo(event.target.value)
    }

    const fetchBatchData = async event => {
        event.preventDefault()
        console.log('sent')
        let res = await axios.post('http://82.180.136.230:3005/fetchbatchdata',{
            token: localStorage.getItem('token'),
            batchNo: batchNo.trim()
        })
        if(typeof res.data === "string"){
            setFetchErr('No records found.')
        }else{
            setBatchData(res.data)
            setIsBatchDataLoading(false)
        }
    }

    const startProcess = async event => {
        event.preventDefault()
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
        let res = await axios.post('http://82.180.136.230:3005/registerbatch',{
            token: localStorage.getItem('token'),
            batchNo: batchNo,
            items: batchData[0].itemsrequested,
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
                                                            <th scope="col">Quantity Used</th>
                                                            <th scope="col">Units Of Measurement</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {JSON.parse(item.itemsrequested).map(itemrecord =>
                                                            <tr>
                                                                <td>{itemrecord.itemName}</td>
                                                                <td>{itemrecord.itemQuantity}</td>
                                                                <td>{itemrecord.mUnits}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody> 
                        </table>
                        <div className="form-floating mb-3">
                        <select className="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }}  onChange={stageHandler} required>
                        <option defaultValue>Choose status</option>
                            <option value='incubator'>Incubator</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{ textAlign: 'center' }}>
                        <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={startProcess}>REGISTER</button>
                    </div>
        </>
    )
}

export default StartBatchProcess