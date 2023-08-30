import {Row, Col} from 'react-bootstrap'
import '../Dashboard/leaderboard.css'
import bkg from '../../../imgs/bkg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import SaphroneNavbar from '../nav_bar/saphrone_navbar'
import './user_profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { tokenMgtActions } from '../store/store'

const CompleteUserProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [contact1, setContact1] = useState('')
    const [contact2, setContact2] = useState('')
    const [address, setAddress] = useState('')
    const [branch, setBranch] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [serverMsg, setServerMsg] = useState('')

    const [isDisabled, setIsDisabled] = useState(true)
    const fileInputRef = useRef()
    const history = useHistory()
    const dispatch = useDispatch()


    const userData = useSelector((state)=>state.tokenmgt.userData)

    useEffect(()=>{
        const  areFieldsEmpty = () => {
            // Check if any of the fields are empty
            if (
                !contact1.trim() ||
                !contact2.trim() ||
                !address.trim() ||
                !branch.trim()
            ) {
                setIsDisabled(true)
            }
    
            setIsDisabled(false)
        }
        areFieldsEmpty()
    },[contact1, contact2, address, branch])
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)// Get the first selected file
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
    }


    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    }

    const saveProfileDataHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'))
        formData.append('employeeId', userData.employeeId)
        formData.append('file', selectedFile)
        formData.append('contact1', contact1)
        formData.append('contact2', contact2)
        formData.append('address', address.toUpperCase().trim())
        formData.append('branch', branch.toUpperCase().trim())

        try {
            const res = await axios.post('http://82.180.136.230:3005/completeparticipantprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.data.status === 200){
                history.replace('/profbioresearchsaphronecompetitionauth')
            }  else{
                setServerMsg(res.data.msg)
            }
        } catch (error) {
           console.error('Error:', error);
        }
    }


    return(
        <div style={{backgroundImage:`url(${bkg})`, backgroundSize:'cover', height:'125vh'}}>
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                 {isOpen === true ? <FontAwesomeIcon icon={faX} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/> : <FontAwesomeIcon icon={faBars} style={{color: "#ffffff", fontSize:'40px', float:'right', margin:'10px', cursor:'pointer'}} onClick={toggleNavbar}/>}
                 <div>
                     <SaphroneNavbar isOpen={isOpen} />
                 </div>
             </Col>
        </Row>
        
         <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                 <h3 style={{textAlign:'center', color:'white'}}>Complete Your User Profile</h3>
                 <Row>
                    <Col sm='12' md='4' lg='4' xl='4' style={{textAlign:'center'}}>
                    <div className="profile-picture">
                        {selectedImage ? <img src={selectedImage} alt="Selected Profile" style={{borderRadius:'100%', height:'230px'}} /> : <FontAwesomeIcon icon={faUser}  style={{borderRadius:'100%', height:'230px', color:'white'}} />}
                        <div className="overlay">
                            <div className="change-profile">
                                <FontAwesomeIcon icon={faCamera} style={{color: "grey", cursor:'pointer', fontSize:'50px'}} onClick={() => fileInputRef.current.click()}/>
                                <input
                                    type="file"
                                    name='file'
                                    accept="image/png, image/gif, image/jpeg"
                                    capture="user"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>
                    </div>
                    {userData ? (
                        <div>
                            <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Name:</span>{userData.firstName} {userData.lastName}</p>
                            <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Username:@</span> {userData.username}</p>
                            <p style={{textAlign:'center',color:'white'}}><span style={{color:'gold'}}>Gender:</span> {userData.gender}</p>
                        </div>
                    ) : (
                        <p style={{textAlign:'center',color:'white'}}>Loading user data...</p>
                    )}
                    </Col>
                    <Col sm='12' md='4' lg='4' xl='4' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {serverMsg.length > 0 && <p style={{ margin: '5px',wordWrap:'break-word', width:'358px', textAlign:'center' }} className="alert alert-danger" role="alert">{serverMsg}</p>}
                        <p style={{color:'white'}}>*Ensure to fill in all the fields*</p>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setContact1(e.target.value)} required/>
                                <label for="floatingPassword">Contact 1</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setContact2(e.target.value)} required/>
                                <label for="floatingPassword">Contact 2</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating" id='saphroneAuthInput'>
                                <input className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setAddress(e.target.value)} required/>
                                <label for="floatingPassword">Address</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <select className="form-select" id='select' aria-label="Default select example" style={{ height: "60px", color: 'rgb(1, 1, 87)' }} onChange={(e)=> setBranch(e.target.value)} required>
                                <option defaultValue>Branch</option>
                                <option value="Masanafu">Masanafu</option>
                                <option value="Namungoona">Namungoona</option>
                                <option value="Equatorial">Equatorial</option>
                                <option value="Buwama">Buwama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button style={{ width: "100%", border: "none", color: "white", height: "45px", background: '-webkit-linear-gradient(right, #003366, #004080, #0059b3, #0073e6)' }} disabled={isDisabled} onClick={saveProfileDataHandler}>SAVE PROFILE DATA</button>
                        </div>
                    </Col>
                 </Row>
             </Col>
         </Row>
        </div>
     )
}
export default CompleteUserProfile