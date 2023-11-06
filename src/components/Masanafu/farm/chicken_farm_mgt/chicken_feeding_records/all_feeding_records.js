import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AllFeedingRecords = () => {
    const [areRecordsLoading, setAreRecordsLoading] = useState(true)
    const [records, setRecords] = useState()

    const fetchFeedingRecords = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallfeedingrecords', {
            token: localStorage.getItem("token")
        })
        //console.log('fff', res.data)
        if(Array.isArray(res.data)){
            setRecords(res.data)
            setAreRecordsLoading(false)
        }
    }

    useEffect(()=>{
        fetchFeedingRecords()
    },[])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>All Feeding Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Batch Number</th>
                                <th scope="col">Feeds Name</th>
                                <th scope="col">Feeds Quantity</th>
                                <th scope="col">Units Of Measurement</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {areRecordsLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                records.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.batchnumber}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.feedsquantity}</td>
                                        <td>{item.munits}</td>
                                        <td>{item.notes}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default AllFeedingRecords