import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ExhibitionRecords = () => {
    const [isExListLoading, setIsExListListLoading] = useState(true)

    const [exList, setExList] = useState()
    const [isExDataLoading, setIsExDataLoading] = useState(true)
    const [selectedExhibitionName, setSelectedExhibitionName] = useState()
    const [exData, setExData] = useState()

    const exhibitionDate = useRef()



    const selectedExibitionInput = event => {
        event.preventDefault()
        setSelectedExhibitionName(event.target.value)
    }

    const fetchExhibitionData = async event => {
        //function to fetch exhibition data 
        event.preventDefault()
        const res = await axios.post('http://82.180.136.230:3005/exhibitiondata', {
            exhibitionName: selectedExhibitionName,
            exhibitionDate: exhibitionDate.current.value,
            token: localStorage.getItem("token")
        })
        if (typeof res.data === 'string') {
            setIsExDataLoading(true)
        } else {
            setIsExDataLoading(false)
            setExData(res.data)
        }


    }


    const fetchExhibitionList = async () => {
        const res = await axios.post('http://82.180.136.230:3005/exhibitionlist', {
            token: localStorage.getItem("token")
        })
        if (typeof res.data === 'string') {
            setIsExListListLoading(true)
        } else {
            setExList(res.data)
            setIsExListListLoading(false)
        }
        

    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchExhibitionList()
        }, 1000)


        return () => clearInterval(interval)
    }, [])


    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <h3 style={{ marginTop: '60px', fontSize: '30px', textAlign: 'center' }}>Retrieve Exhibition Data</h3>
                        <div className="form-floating mb-3">
                            <select class="form-select"
                                name="itemName"
                                aria-label="Default select example"
                                placeholder="Item Name"
                                onChange={selectedExibitionInput}
                                required>
                                <option selected>Filter By Exhibition Name</option>
                                {isExListLoading ? <option>Loading Exhibition Data From Database</option> :
                                    exList.map(exhibition => (
                                        <option>
                                            {exhibition.exhibitionname}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input type='date' className="form-control" id="floatingInput" placeholder="Exhibition Date" style={{ color: "#8CA6FE" }} ref={exhibitionDate}
                                required />
                            <label for="floatingInput">Exhibition Date</label>
                        </div>

                        <button className="btn btn-primary" onClick={fetchExhibitionData}>Retrieve Data</button>
                        <table className="table table-dark" style={{ marginTop: '50px' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Exhibition Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Items Record</th>
                                    <th scope="col">Filled From Branch</th>
                                    <th scope="col">Fllled By Department</th>
                                    <th scope="col">Filled By Role</th>
                                    <th scope="col">Filled By User</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isExDataLoading ? <tr><td>There is no Exhibition Data From Database. Please edit the parameters.</td></tr> :
                                    exData.map(item => (
                                        <tr>
                                            <td>{item.exhibitionname}</td>
                                            <td>{item.date}</td>
                                            <td>
                                                <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Item Name</th>
                                                            <th scope="col">Quantity Taken</th>
                                                            <th scope="col">Quantity Returned</th>
                                                            <th scope="col">Quantity Sold</th>
                                                            <th scope="col">Quantity Unaccounted For</th>
                                                            <th scope="col">Units Of Measurement</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: 'center' }}>
                                                        {JSON.parse(item.itemsrecord).map(itemrecord =>
                                                            <tr>
                                                                <td>{itemrecord.itemName}</td>
                                                                <td>{itemrecord.itemQuantity}</td>
                                                                <td>{itemrecord.itemQuantityReturned}</td>
                                                                <td>{itemrecord.itemQuantitySold}</td>
                                                                <td>{itemrecord.Discrepancies}</td>
                                                                <td>{itemrecord.mUnits}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td>{item.filledfrombranch}</td>
                                            <td>{item.filledbydepartment}</td>
                                            <td>{item.filledbyrole}</td>
                                            <td>{item.filledbyuser}</td>
                                            <td>{item.status}</td>

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

export default ExhibitionRecords