import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'

const BuwamaLivestockFeedsStockTaking = () => {
    const [inStock, setInStock] = useState([])
    const [outOfStock, setOutOfStock] = useState([])
    const [runningOutOfStock, setRunningOutOfStock] = useState([])
    const [data, setData] = useState([])

    const fetchAllStoreRecords =  async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchbuwamastoredata',{
            token:localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            const livestockStokeTaking = res.data.filter((data)=>
                data.category === 'FEEDS'
            )
            setData(livestockStokeTaking)
        }
    }

    useEffect(()=>{
        fetchAllStoreRecords()
    }, [])

    useEffect(() => {
        if (data) {
          setInStock([]);
          setRunningOutOfStock([]);
          setOutOfStock([]);
      
          data.forEach(item => {
            if (item.quantityinstock > 50) {
              setInStock(prevState => [...prevState, item]);
            } else if (item.quantityinstock > 0) {
              setRunningOutOfStock(prevState => [...prevState, item]);
            } else {
              setOutOfStock(prevState => [...prevState, item]);
            }
          });
        }
    }, [data])
    return(
        <Row>
        <Col sm='12' md='2' lg='2' xl='2'>
            <Navbar />
        </Col>
        <div className="col align-self-center" style={{marginTop:'60px'}}>
            <h1 style={{textAlign:'center'}}>Buwama Livestock Feeds Stock Taking</h1>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h3 style={{textAlign:'center', color:'green'}}>In Stock</h3>
                    <table className="table table-light">
                        <thead>
                            <tr>
                            <th>Item Id</th>
                            <th>Item Name</th>
                            <th>Quantity In Stock</th>
                            <th>Unit Of Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inStock.length > 0 ? inStock.map((item => (
                            <tr>
                                <td>{item.productId}</td>
                                <td>{item.name}</td>
                                <td>{item.quantityinstock}</td>
                                <td>{item.munits}</td>
                            </tr>))) : <tr><td colSpan="4" style={{textAlign:'center'}}>There are no items matching this criteria.</td></tr>}
                        </tbody>
                    </table>
                </Col>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h3 style={{textAlign:'center', color:'#52CC7A'}}>Running Out Of  Stock</h3>
                    <table className="table table-light">
                        <thead>
                            <tr>
                            <th>Item Id</th>
                            <th>Item Name</th>
                            <th>Quantity In Stock</th>
                            <th>Unit Of Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                        {runningOutOfStock.length > 0 ? runningOutOfStock.map((item => (
                            <tr>
                                <td>{item.productId}</td>
                                <td>{item.name}</td>
                                <td>{item.quantityinstock}</td>
                                <td>{item.munits}</td>
                            </tr>))) : <tr><td colSpan="4" style={{textAlign:'center'}}>There are no items matching this criteria.</td></tr>}
                        </tbody>
                    </table>
                </Col>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h3 style={{textAlign:'center', color:'red'}}>Out Of Stock</h3>
                    <table className="table table-light">
                        <thead>
                            <tr>
                            <th>Item Id</th>
                            <th>Item Name</th>
                            <th>Quantity In Stock</th>
                            <th>Unit Of Measurement</th>
                            </tr>
                        </thead>
                        <tbody>
                        {outOfStock.length > 0 ? outOfStock.map((item => (
                            <tr>
                                <td>{item.productId}</td>
                                <td>{item.name}</td>
                                <td>{item.quantityinstock}</td>
                                <td>{item.munits}</td>
                            </tr>))) : <tr><td colSpan="4" style={{textAlign:'center'}}>There are no items matching this criteria.</td></tr>}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
        <Col sm='12' md='2' lg='2' xl='2'></Col>
    </Row>
    )
}
 export default BuwamaLivestockFeedsStockTaking