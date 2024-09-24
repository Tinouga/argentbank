import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/auth/authSlice";
import styles from "./Header.module.scss";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle, faSignOut} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className={styles.header}>
            <Link to={"/"} className={styles.logoNav}>
                <img src={logo} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {!isLoggedIn ? (
                <div>
                    <Link to={"/login"} className={styles.navItem}>
                        <FontAwesomeIcon icon={faUserCircle}/>
                        Sign In
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to={"/profile"} className={styles.navItem}>
                        <FontAwesomeIcon icon={faUserCircle}/>
                        {user.firstName}
                    </Link>
                    <button onClick={handleLogout} className={styles.navItem}>
                        <FontAwesomeIcon icon={faSignOut}/>
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Header;
