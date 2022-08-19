import './Navbar.scss'
import Logo from '../../assets/img/argentBankLogo.png'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={'/'}>
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {props.isConnected ? <div>
                <Link className="main-nav-item" to='/user.html'>
                    <i className="fa fa-user-circle"></i>
                    Tony
                </Link>
                <Link className="main-nav-item" to='/index.html'>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div> : <div>
                <Link className="main-nav-item" to={'/login'}>
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>

            </div>}
        </nav>
    )
}


export default Navbar