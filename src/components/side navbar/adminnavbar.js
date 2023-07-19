import { Link } from "react-router-dom"
import Editprofile from "../Namungoona/user profile/editprofile"
import Logout from "../authentication/logout"
import logo from "../../imgs/logo.png";
import './sidenav.css'
const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top" style={{ marginBottom: '50px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="#"><img src={logo} alt='logo' style={{ height: '20px' }} />Administrator</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Prof Bioresearch</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/admindashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registerpersonnel">Register Personnel</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewinventoryrecords">View Inventory Records</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem("username")}
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {/* <li><Editprofile /></li> */}
                  <li><Logout /></li>
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

export default AdminNavbar