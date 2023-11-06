import { Link } from "react-router-dom"
import Logout from "../authentication/logout"
import logo from "../../imgs/logo.png";
import './sidenav.css'
import attention from '../../imgs/attention.png'
import LogInBtn from "../authentication/loginbtn";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top" style={{ marginBottom: '50px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="#"><img src={logo} alt='logo' style={{ height: '20px' }} />{localStorage.getItem("isUserLoggedIn") ? localStorage.getItem('branch') : <><img src={attention} alt="attention" style={{ height: '20px' }}/><span style={{color:'red'}}>Your session is expired.Log In.</span></>} (Beta Release V.1.0)</Link>
        <button id="open" className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Prof Bioresearch - {localStorage.getItem('branch')}</h5>
            <button type="button" id="close" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {localStorage.getItem('branch') === 'namungoona' &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/namungoonadashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageinventory">Manage Inventory</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/saveinventoryrecords">Save Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/placeproductorder">Order Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewinventoryrecords">View Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }

              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'production' && localStorage.getItem('role') === 'manager') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/managerdashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Inventory
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link className="nav-link" to="/manageinventory">Save Production Item</Link></li>
                      <li><Link className="nav-link" to="/saveinventoryrecords">Save Production Inventory Records</Link></li>
                      <li><Link className="nav-link" to="/viewinventoryrecords">View Production Inventory Records</Link></li>
                      <li>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productorders">Approved Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Production Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/requestrawmaterials">Request For Raw Materials</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }

              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'production' && localStorage.getItem('role') === 'custodian') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/custodiandashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/rawmaterialrequests'>Raw Material Requests</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/rawmaterialrequestsrecords">Raw Material Requests Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/placeproductorder">Order Products</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to=''>Production Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productorders">Product Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/orderrecords'>Orders Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/exhibtionmanagement'>Exhibition Management</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/exhibtionrecords'>Exhibition Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }
              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'farm') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/farmmanagerdashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/requestseeds'>Request Seeds</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/managebatch">Manage Batches</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewrecords">View Farm Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }

              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'projects') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/projectsmanagerdashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/requestrawmaterials'>Request Materials</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/materialcalculator">Material Calculator</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pendingprojectsorders">New Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ordersstatus">Orders Status</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }
              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'Shop') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/shopmanagerdashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/pointofsale'>Point Of Sale</Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/pendingprojectsorders">New Orders</Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem("username")}
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {/* <li><Editprofile /></li> */}
                  <li>{localStorage.getItem("isUserLoggedIn") ? <Logout /> : <LogInBtn />}</li>
                  <li>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar