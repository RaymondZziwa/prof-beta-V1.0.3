import { Row, Col } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";
import { useState, useEffect, useRef } from 'react'
import axios from "axios";

const ViewBatchRecords = () => {
    const [isExListLoading, setIsExListListLoading] = useState(true)
    const [exList, setExList] = useState([])


    const fetchRecordList = async () => {
        const res = await axios.post('http://82.180.136.230:3005/viewfarmrecords', {
            token: localStorage.getItem("token")
        })
        if (typeof res.data === 'string') {
            setIsExListListLoading(true)
        } else {
            setExList(res.data)
            setIsExListListLoading(false)
            console.log(res.data)
        }
    }

    useEffect(() => {
        fetchRecordList()
    }, [])


    return(
        <>
             <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '50px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Batch No.</th>
                                    <th scope="col">Items</th>
                                    <th scope="col">Stage</th>
                                    <th scope="col">Stage Started On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isExListLoading  ? <tr><td>There is no  Data From Database. Please edit the parameters.</td></tr> :
                                    exList.map(item => (
                                        <tr>
                                            <td>{item.batchno}</td>
                                            <td>
                                                <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Initial Quantity</th>
                                                            <th scope="col">Remaining Quantity</th>
                                                            <th scope="col">Quantity Damaged In Previous Stage</th>
                                                            <th scope="col">Units Of Measurement</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {JSON.parse(item.items).map(itemrecord =>
                                                            <tr>
                                                                <td>{itemrecord.itemName}</td>
                                                                <td>{itemrecord.itemQuantity}</td>
                                                                <td>{itemrecord.itemNewQuantity}</td>
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
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ViewBatchRecords