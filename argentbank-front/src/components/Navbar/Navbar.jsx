import "./Navbar.scss";
import Logo from "../../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import {
  storeToken,
  tokenSliceInitialState,
  resetStateToken,
} from "../../redux/slice/TokenSlice";
import {
  storeUser,
  userSliceInitialState,
  resetState,
} from "../../redux/slice/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.value);
  const logOut = () => {
    dispatch(resetStateToken());
    dispatch(resetState());
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {userName ? (
        <div>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {userName.firstName}
          </Link>
          <Link className="main-nav-item" to="/" onClick={logOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to={"/login"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
