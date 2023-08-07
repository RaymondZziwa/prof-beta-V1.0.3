import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Navbar from '../../../side navbar/sidenav'
import axios from "axios"

const RecieveExhibitionIncome = () => {
    const [exDate, setExDate] = useState('')
    const [exId, setExName] = useState(null)
    const [amountRecieved, setAmountRecieved] = useState('')
    const [deliveredBy, setDeliveredBy] = useState('')

    const [exData, setExData] = useState([])
    const [status, setStatus] = useState('')
    const [data, setIncomeData] = useState([])

    const fetchExData = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallexhibitiondata',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setExData(res.data)
        }
    }

    useEffect(()=> {
        const fetchAllExhibitionIncomeData = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallexhibitionincomedata',{
                token: localStorage.getItem('token')
            })
            if(Array.isArray(res.data)){
                setIncomeData(res.data)
            }
        }
        
        fetchExData()
        fetchAllExhibitionIncomeData()
    },[])

    useEffect(()=> {
        if(exId){
            console.log('ed', exData)
            const filteredData = exData.filter((item)=>
                item.id === parseInt(exId)
            )

            setExDate(filteredData[0].date)
        }
    },[exId, exData])

    useEffect(() => {
        if (status) {
          const timer = setTimeout(() => {
            setStatus(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [status]);

    const submitHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveexhibitionincomerecord',{
            token: localStorage.getItem('token'),
            date: new Date().toLocaleString(),
            exId: exId,
            amountRecieved: amountRecieved,
            deliveredBy: deliveredBy,
            recievedBy: localStorage.getItem('username')
        })
        .then(() => setStatus({ type: 'success' }))
        .catch((err) => setStatus({ type: 'error', err }))
    }

    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
        <Row>
        <Col sm='12' md='4' lg='4' xl='4'>
            <h3 style={{textAlign:'center'}}>Record Exhibition Income</h3>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  value={new Date().toLocaleString()} readOnly/>
                <label for="floatingInput">Date</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} value={exDate ? exDate : ''} readOnly/>
                <label for="floatingInput">Exhibition Date</label>
            </div>
            <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE", marginBottom:'10px' }} onChange={(e)=> setExName(e.target.value)} required>
                    <option selected>Item Name</option>
                        { !exData ? <option>Loading Items From Database</option> :
                            exData.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.exhibitionname} - {item.date}
                                </option>
                            ))
                        }
            </select>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setAmountRecieved(e.target.value)}/>
                <label for="floatingInput">Amount Recieved (UGX)</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  onChange={(e)=> setDeliveredBy(e.target.value)}/>
                <label for="floatingInput">Delivered By</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }}  value={localStorage.getItem('username')} readOnly/>
                <label for="floatingInput">Recieved By</label>
            </div>
            <button style={{ width: "88%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '5px' }} onClick={submitHandler}>
                Save
             </button>
        </Col>
        <Col sm='12' md='7' lg='7' xl='7'>
            <h3 style={{textAlign:'center'}}>Exhibition Income Records</h3>
            <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                          <thead style={{ textAlign: 'center' }}>
                              <tr>
                                  <th scope="col">Exhibition Date</th>
                                  <th scope="col">Exhibition Name</th>
                                  <th scope="col">Amount Recieved (UGX)</th>
                                  <th scope="col">Delivered By</th>
                              </tr>
                          </thead>
                          <tbody>
                          
                          {data ? (
                            data.map((item, index) => (
                              <tr key={index + 1}>
                                <td>{item.date}</td>
                                <td>{item.exhibitionname}</td>
                                <td>{item.amountRecieved}</td>
                                <td>{item.DeliveredBy}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4}>Loading...</td>
                            </tr>
                          )}
                          </tbody>
          </table>
        </Col>
    </Row>
        </div>
        <Col sm='12' md='1' lg='1' xl='1'>
        </Col>
    </Row>
    )
}

export default RecieveExhibitionIncome