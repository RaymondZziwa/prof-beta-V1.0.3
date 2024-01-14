import Navbar from "../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons"

const RegisterShopInventory = () => {
    const [ equipmentName, setEquipmentName ] = useState('')
    const [isFetchedProductsLoading , setIsFetchedProductsLoading] = useState(true)
    const [fetchedProducts, setFetchedProducts] = useState([])
    const [options, setOptions] = useState([])
    const [searchedItem, setSearchedItem] = useState(null)
    const [ unitPrice, setUnitPrice ] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8

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
    
    const deleteItem = async event => {
        event.preventDefault()
        const productId = event.target.id;
        try {
            let res = await axios.post('http://82.180.136.230:3005/deleteshopitemdata', {
                token: localStorage.getItem('token'),
                productId: productId
            });
            await fetchAllMaterials();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const editItem = async event => {
        event.preventDefault()
        const productId = event.target.id;
        try {
            let res = await axios.post('http://82.180.136.230:3005/updateshopproductdata', {
                token: localStorage.getItem('token'),
                productId: productId
            });
            await fetchAllMaterials();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    }


    const fetchAllMaterials = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallshopproducts',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedProductsLoading(false)
            setFetchedProducts(res.data)

            const transformedOptions = res.data.map((item) => ({
                value: item.productId,
                label: `${item.productName}`
              }))
            setOptions(transformedOptions)
        }
    }

    useEffect(()=>{
        fetchAllMaterials()
    },[])

    const registerMaterialHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/registershopinventory', {
            token: localStorage.getItem('token'),
            productName: equipmentName.toUpperCase(),
            unitPrice: unitPrice
        })

        fetchAllMaterials()
    }
    
    return(
        <div className='container-fluid'>
        <Row>
            <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                <Navbar />
                <div className="col align-self-center">
                    <Form style={{ justifyContent: 'center', marginTop: '20px' }}>
                        <div className="mb-3">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={itemInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Product Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={unitPriceInputHandler} style={{ color: "#8CA6FE" }} />
                                <label for="floatingInput">Unit Price ( UGX ) </label>
                            </div>
                            <span><button className="btn btn-outline-primary" onClick={registerMaterialHandler}>Add Item</button></span>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
        <Row>
        <Select
                value={searchedItem}
                options={options}
                isSearchable
                placeholder="Search an item"
              /> 
            <Col sm='12' md='8' lg='8' xl='8'>
                    <table className="table table-light" style={{marginTop:'10px'}}>
                        <thead>
                            <tr>
                                <th scope="col">Product Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Unit Price (UGX)</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetchedProductsLoading ? <tr><td>Loading Data From Database</td></tr> :
                                searchedItem === null || Object.keys(searchedItem).length === 0 ? (
                                    fetchedProducts && fetchedProducts.length > 0 ? (
                                        fetchedProducts
                                        .slice(startIndex, endIndex)
                                        .map((item, index) => {
                                          const globalIndex = startIndex + index + 1; // Calculate the global index

                                          return (
                                            <tr key={item.id}>
                                              <td>{item.productId}</td>
                                              <td>{item.productName}</td>
                                              <td>{item.unitPrice}</td>
                                              <td>
                                             {/* <button id={item.productId} onClick={editItem}>Edit</button> */}
                                              <button id={item.productId} onClick={deleteItem}>Delete</button>
                                              </td>
                                            </tr>
                                          );
                                        })
                                    ) : (
                                      <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>
                                          There are no items matching this criteria.
                                        </td>
                                      </tr>
                                    )
                                  ) : (
                                    searchedItem && searchedItem.length > 0 ? (
                                      searchedItem.map((item, index) => (
                                        <tr key={item.id}>
                                          <td>{item.productData.productId}</td>
                                          <td>{item.productData.productName}</td>
                                          <td>{item.productData.quantityinstock}</td>
                                          <td>{item.productData.munits}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>
                                          No items found for the search criteria.
                                        </td>
                                      </tr>
                                    )
                                  )}
                        </tbody>
                    </table>  
                    {totalPages > 1 && (
                    <>
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', fontSize:'20px' }}>
                            Go to end <FontAwesomeIcon icon={faArrowAltCircleRight} style={{cursor:'pointer'}} onClick={() => setCurrentPage(totalPages)}/>
                        </div>
                    </>
                    )}
            </Col>
        </Row>

    </div>
    )
}

export default RegisterShopInventory