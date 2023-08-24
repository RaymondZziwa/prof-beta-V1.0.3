import { Link } from 'react-router-dom'
import bkg from '../../../imgs/confetti.jpg'
import { useState } from "react";
import './auth.css'
import SaphroneLoginForm from './saphrone_login';
import SaphroneSignUp from './saphrone_signup';

const SaphroneCompetitionAuth = () => {
    const [loginStatus, setloginStatus] = useState('')
    const [activeTab, setActiveTab] = useState('login')

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }



    return(
        <div className="row" style={{backgroundImage:`url(${bkg})`,}}>
            <div className="col-md-6 offset-md-3 d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
                <div className="mb-3" style={{background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9))', borderRadius:'10px'}}>
                     <div className="title-text">
                        <div className={`titlelogin ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}>Login</div>
                        <div className={`titlesignup ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabClick('signup')}>Signup</div>
                     </div>
                     
                     {loginStatus && <span style={{ marginTop: '2px' }} className="alert alert-danger" role="alert">{loginStatus}</span>}
                     {activeTab === 'login' && 
                        <SaphroneLoginForm handleTabClick={handleTabClick}/>
                     }
                     {activeTab === 'signup' && 
                        <SaphroneSignUp handleTabClick={handleTabClick}/>
                     }
                     <Link to="/Login" style={{textDecoration:'none'}}>
                            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "2px", color: "#3E5AA7", cursor:'pointer' }}>Click Here To Log into Company System</p>
                     </Link> 
                </div>
            </div>
        </div>
    )
}
export default SaphroneCompetitionAuth