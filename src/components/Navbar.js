import { Link } from 'react-router-dom'

// styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'
import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'

export default function Navbar() {
    const { isPending, logout } = useLogout() 
    const { user } = useAuthContext()
    return (
        <nav className="navbar">
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="website logo" />
                    <span>The Dojo</span>
                </li>
                {!user && (
                    <>
                        <li> <Link to="/">Login</Link></li>
                        <li> <Link to="/signup">Signup</Link></li>
                    </>
                )}
                {user && (
                    <li> 
                        {isPending &&  <button className='btn' disabled>Loading</button>}
                        {!isPending &&<button className='btn' onClick={logout}>Logout</button>}
                    </li>
                )}
            </ul>
        </nav>
    )
}

