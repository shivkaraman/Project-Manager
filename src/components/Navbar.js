import { Link } from 'react-router-dom'

// styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  
    const logout = () => {
        console.log("Logout");
    }
    return (
        <nav className="navbar">
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="website logo" />
                    <span>The Dojo</span>
                </li>
                <li> <Link to="/">Login</Link></li>
                <li> <Link to="/signup">Signup</Link></li>
                <li> <button className='btn' onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    )
}

