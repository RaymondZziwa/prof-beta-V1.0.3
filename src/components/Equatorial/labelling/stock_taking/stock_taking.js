import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../side navbar/sidenav'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './stocktaking.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import Select from 'react-select'

const LabellingDepartmentStockTaking = () => {
    const [isStockDataLoading, setIsStockDataLoading] = useState(true)
    const [searchedItem, setSearchedItem] = useState(null)
    const [allData, setAllData] = useState([])
    const [shopStock, setShopStock] = useState([])
    const [inStock, setInStock] = useState([])
    const [outOfStock, setOutOfStock] = useState([])
    const [options, setOptions] = useState([])
    const [runningOutOfStock, setRunningOutOfStock] = useState([])
    const [activeButton, setActiveButton] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(shopStock.length / itemsPerPage)

    useEffect(() => {
        const fetchData = async () => {
          if (isStockDataLoading) {
            const res = await axios.post('http://82.180.136.230:3005/equatoriallabellingstocktaking', {
              token: localStorage.getItem('token')
            })

            if (Array.isArray(res.data)) {
              setIsStockDataLoading(false);
              setAllData(res.data)
              setShopStock(res.data)

              const transformedOptions = res.data.map((item) => ({
                value: item.productId,
                label: `${item.productName}     |       Quantity In Stock: ${item.quantityinstock} Pcs`,
                productData: item
              }))
              setOptions(transformedOptions)
            }
          }
        };
      
        fetchData();
      }, [isStockDataLoading]);

      useEffect(() => {
        if (shopStock) {
          setInStock([]);
          setRunningOutOfStock([])
          setOutOfStock([]);
      
          shopStock.forEach(item => {
            if (item.quantityinstock > 50) {
              setInStock(prevState => [...prevState, item]);
            } else if (item.quantityinstock > 0) {
              setRunningOutOfStock(prevState => [...prevState, item]);
            } else {
              setOutOfStock(prevState => [...prevState, item]);
            }
          });
        }
      }, [shopStock])

      const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName)
      }


      const filterOutOfStock = event => {
        event.preventDefault()
        setCurrentPage(1)
        handleButtonClick('outOfStock')
        const filteredItems = allData.filter((item) => item.quantityinstock === 0);
        setShopStock(filteredItems);
      }

      const filterRunningOutOfStock = event => {
        event.preventDefault()
        setCurrentPage(1)
        handleButtonClick('runningOutOfStock')
        const filteredItems = allData.filter(
          (item) => item.quantityinstock > 0 && item.quantityinstock <= 10
        );
        setShopStock(filteredItems);
      }

      const filterInStock = event => {
        event.preventDefault()
        setCurrentPage(1)
        handleButtonClick('inStock')
        const filteredItems = allData.filter((item) => item.quantityinstock > 10);
        setShopStock(filteredItems);
      }

    return(
        <>
          <Row>
              <Col sm='12' md='12' lg='12' xl='12'>
                  <Navbar />
              </Col>
          </Row>
          <Row className='row justify-content-center' style={{marginTop:'60px'}}>
              <Col className='col-8'>
                  <h1 style={{textAlign:'center'}}>Labelling Department Stock Taking</h1>
                  <button className={`btn-selector ${activeButton === 'runningOutOfStock' ? 'active' : ''}`} style={{margin:'20px', borderRadius:'10px', height:'50px', width:'250px'}} onClick={filterRunningOutOfStock}>Running Out Of Stock</button>
                  <button className={`btn-selector ${activeButton === 'outOfStock' ? 'active' : ''}`} style={{margin:'20px', borderRadius:'10px', height:'50px', width:'250px'}} onClick={filterOutOfStock}>Out Of Stock</button>
                  <button className={`btn-selector ${activeButton === 'inStock' ? 'active' : ''}`} style={{margin:'20px', borderRadius:'10px', height:'50px', width:'250px' }} onClick={filterInStock}>In Stock</button>
              </Col>
          </Row>
          <Row className='row justify-content-center' >
              <Col className='col-10'>
                    <Select
                    value={searchedItem}
                    options={options}
                    isSearchable
                    placeholder="Search an item"
                  /> 
                  <div>
                  <table className="table table-light" style={{textAlign:'center'}}>
                             <thead>
                                <tr>
                                 <th>Id</th>
                                 <th>Item</th>
                                 <th>Quantity</th>
                                 <th>Unit</th>
                                 </tr>
                             </thead>
                             <tbody>
                                    {searchedItem === null || Object.keys(searchedItem).length === 0 ? (
                                        shopStock && shopStock.length > 0 ? (
                                          shopStock
                                            .slice(startIndex, endIndex)
                                            .map((item, index) => {
                                              const globalIndex = startIndex + index + 1; // Calculate the global index

                                              return (
                                                <tr key={item.id}>
                                                  <td>{item.productId}</td>
                                                  <td>{item.productName}</td>
                                                  <td>{item.quantityinstock}</td>
                                                  <td>{item.munits}</td>
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faCircleChevronLeft} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}/>
                        <span style={{ margin: '0 10px', color:'blue' }}>Page {currentPage} of {totalPages}</span>
                            <FontAwesomeIcon icon={faCircleChevronRight} style={{color: 'blue',padding: '10px 20px',border: 'none',borderRadius: '5px',marginLeft: '10px',cursor: 'pointer', fontSize:'40px'}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}/>
                        </div>
                        )}
                  </div>
              </Col>
          </Row>
        </>
    )
}
export default LabellingDepartmentStockTaking