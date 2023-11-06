import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../side navbar/sidenav'
import { Row, Col } from "react-bootstrap"

const ExhibitionSalesRecords = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [salesData, setSalesData] = useState([])

    const [exhibitionList, setExhibitionList] = useState([])
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const fetchExhibitionList = async () => {
            let res = await axios.post('http://82.180.136.230:3005/fetchallexhibitionslist', {
              token: localStorage.getItem('token')
            });
        
            if (Array.isArray(res.data)) {
                setExhibitionList(res.data)
            }
          };

        const fetchSalesData = async () => {
          let res = await axios.post('http://82.180.136.230:3005/fetchallexhibitionsales', {
            token: localStorage.getItem('token')
          });
      
          if (Array.isArray(res.data)) {
            setIsLoading(false);
            setSalesData(res.data);
          }
        };
      
        fetchSalesData()
        fetchExhibitionList()
    }, [])

    const handleFilter = (event) => {
        const exhibitionId = parseInt(event.target.value)
        const filterData = salesData.filter((record)=>
            record.exhibitionId === exhibitionId
        )
        setFilteredData(filterData)
    }

    function calculateTotal(key) {
        let total = 0;
        filteredData.forEach(item => {
            total += parseFloat(item[key]);
        });
        return total.toFixed(2); // Format to 2 decimal places, adjust as needed
    }

    return(
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='1' lg='1' xl='1'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                    <h2 style={{textAlign:'center', marginTop:'60px'}}>Exhibiton Sales Records</h2>
                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE;" }} onChange={handleFilter} required>
                        <option selected>Filter By Exhibition Name</option>
                            { (!exhibitionList.length > 0) ? <option>Loading Items From Database</option> :
                                exhibitionList.map(exhibition => (
                                    <option key={exhibition.id} value={exhibition.id}>
                                        {exhibition.exhibitionname} - {exhibition.date}
                                    </option>
                                ))
                            }
                    </select>
                        <table className="table table-light" style={{ marginTop: '20px',textAlign:'center' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th scope="col">Exhibition Name</th>
                                    <th scope="col">Receipt No.</th>
                                    <th scope="col">Sale Date</th>
                                    <th scope="col">Customer Names</th>
                                    <th scope="col">Customer Contact</th>
                                    <th scope="col">Items Sold</th>
                                    <th scope="col">Total Sale Amount</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Additional Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {!isLoading ? (
                                filteredData.length > 0 ? (
                                    filteredData.map(item => (
                                        <tr key={item.receiptNumber}>
                                            <td>{item.exhibitionname}</td>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr>
                                                                <td>{itemordered.name}</td>
                                                                <td>{itemordered.quantity}</td>
                                                                <td>{itemordered.unitCost}</td>
                                                                <td>{itemordered.discount}</td>
                                                                <td>{itemordered.totalCost}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.totalAmount-item.balance}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.additionalinfo}</td>
                                        </tr>
                                    ))
                                ) : (
                                    salesData.map(item => (
                                        <tr key={item.receiptNumber}>
                                            <td>{item.exhibitionname}</td>
                                        <td>{item.receiptNumber}</td>
                                        <td>{item.saleDate}</td>
                                        <td>{item.customerNames}</td>
                                        <td>{item.customerContact}</td>
                                        <td>
                                        <table className="table table-light" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Unit Price (UGX)</th>
                                                        <th scope="col">Discount</th>
                                                        <th scope="col">Total Cost (UGX)</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsSold).map(itemordered =>
                                                        <tr>
                                                                <td>{itemordered.name}</td>
                                                                <td>{itemordered.quantity}</td>
                                                                <td>{itemordered.unitCost}</td>
                                                                <td>{itemordered.discount}</td>
                                                                <td>{itemordered.totalCost}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.totalAmount-item.balance}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.additionalinfo}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan='10'>Loading...</td>
                                </tr>
                            )}

                             {/* Calculate and display totals */}
                                <tr>
                                    <td colSpan="5"></td>
                                    <td>Total: (UGX)</td>
                                    <td>{calculateTotal("totalAmount")}</td>
                                    <td colSpan="3"></td>
                                </tr>
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

export default ExhibitionSalesRecords