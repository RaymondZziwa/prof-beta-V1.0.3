import Navbar from "../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const EquatorialShopNewItemRegistration = () => {
    const [ itemName, setEquipmentName ] = useState('')
    const [isFetchedProductsLoading , setIsFetchedProductsLoading] = useState(true)
    const [fetchedProducts, setFetchedProducts] = useState([])
    const [ unitPrice, setUnitPrice ] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchedItem, setSearchedItem] = useState(null)
    const [options, setOptions] = useState([])
    const itemsPerPage = 10

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(fetchedProducts.length / itemsPerPage)

    const itemInputHandler = event => {
        event.preventDefault()
        setEquipmentName(event.target.value)
    }

    const unitPriceInputHandler = event => {
        event.preventDefault()
        setUnitPrice(event.target.value)
    }

    const fetchAllItems = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallshopproducts',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedProductsLoading(false)
            setFetchedProducts(res.data)

            const transformedOptions = res.data.map((item) => ({
                value: item.productId,
                label: `${item.productName} `,
                productData: item
              }))
              setOptions(transformedOptions)
        }
    }
    
    useEffect(()=>{
        fetchAllItems()
    },[])

    const deleteItem = async (itemId) => {
        let res = await axios.post('http://82.180.136.230:3005/deleteshopitemdata', {
            token: localStorage.getItem('token'),
            productId: itemId,
        })

        fetchAllItems()
    }

    const registerItemHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registershopinventory', {
            token: localStorage.getItem('token'),
            productName: itemName,
            unitPrice: unitPrice
        })

        fetchAllItems()
    }

    return(
        <div className='container-fluid'>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                <Navbar />
                <div className="col align-self-center">
                    <h1 style={{textAlign:'center', marginTop: '20px'}}>Product Manager</h1>
                    <Form style={{ justifyContent: 'center' }}>
                        <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={itemInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Item Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={unitPriceInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Unit Price ( UGX ) </label>
                            </div>
                            <span><button className="btn btn-outline-primary" onClick={registerItemHandler}>Register Item</button></span>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm='12' md='8' lg='8' xl='8'>
            <Select
                value={searchedItem}
                options={options}
                isSearchable
                placeholder="Search an item"
              /> 
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Item Id</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Unit Price (UGX)</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {!isFetchedProductsLoading ? (
                                <>
                                    {fetchedProducts.slice(startIndex, endIndex).map(item => (
                                    <tr key={item.productId}>
                                        <td>{item.productId}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>
                                        <button onClick={() => deleteItem(item.productId)}>Delete</button>
                                        </td>
                                    </tr>
                                    ))}
                                </>
                                ) : (
                                <>
                                    {searchedItem && searchedItem.length > 0 && (
                                    searchedItem.map((item, index) => (
                                        <tr key={item.productId}>
                                        <td>{item.productId}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>
                                            <button onClick={() => deleteItem(item.productId)}>Delete</button>
                                        </td>
                                        </tr>
                                    ))
                                    )}
                                </>
                                )}


                        </tbody>
                    </table>  
                    {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                    <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                        <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                    </div>
                    )}
            </Col>
        </Row>

    </div>
    )
}

export default EquatorialShopNewItemRegistration