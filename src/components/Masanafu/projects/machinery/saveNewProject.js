import Navbar from "../../../side navbar/sidenav"
import { Row, Col, Form } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"

const SaveNewProject = () => {
    const [ projectName, setProjectName ] = useState('')
    const [isFetchedProjectsLoading, setIsFetchedProjectsLoading] = useState(true)
    const [fetchedProjects, setFetchedProjects] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 8

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = (startIndex + itemsPerPage)

    const totalPages = Math.ceil(fetchedProjects.length / itemsPerPage)

    const itemInputHandler = event => {
        event.preventDefault()
        setProjectName(event.target.value)
    }


    const fetchAllMaterials = async () => {
        let res = await axios.post('http://82.180.136.230:3005/fetchallprojects',{
            token: localStorage.getItem('token')
        })

        if(Array.isArray(res.data)){
            setIsFetchedProjectsLoading(false)
            setFetchedProjects(res.data)
        }
    }

    useEffect(()=>{
        fetchAllMaterials()
    },[])

    const registerMaterialHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/saveproject', {
            token: localStorage.getItem('token'),
            equipmentName: projectName
        })

        fetchAllMaterials()
    }

    return(
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12' style={{ marginTop: '50px' }}>
                    <Navbar />
                    <div className="col align-self-center">
                        <h1 style={{textAlign:'center',marginTop:'30px'}}>SAVE PROJECT</h1>
                        <Form style={{ justifyContent: 'center', marginTop: '10px' }}>
                            <div className="mb-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" min="0" placeholder="Quantity" onChange={itemInputHandler} style={{ color: "#8CA6FE" }} />
                                    <label for="floatingInput">Equipment Name</label>
                                </div>
                                <span><button className="btn btn-outline-primary" onClick={registerMaterialHandler}>Add Item</button></span>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-light">
                            <thead>
                                <tr>
                                    <th scope="col">Project Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetchedProjectsLoading ? <tr><td>Loading Data From Database</td></tr> :
                                    fetchedProjects.slice(startIndex, endIndex).map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                        </tr>
                                    ))}
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

export default SaveNewProject