import { Link } from "react-router"
import "../style/navbar.css"

const Navbar : React.FC = () => {
    return <div className="navbar">
       <ul className="navbarContainer">
        <li>
            <Link to="/home" className="link">Home</Link>
        </li>
        <li>
            <Link to="/countrylist" className="link">Country List</Link>
        </li>
        <li>
            <Link to="/about" className="link">About Us</Link>
        </li>
       </ul>
    </div>
}
export default Navbar