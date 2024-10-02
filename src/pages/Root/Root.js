import styles from "./Root.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfile} from "../../features/user/userSlice";
import {useEffect} from "react";


const Root = () => {
    const location = useLocation();
    const darkRoutes = ['/login', '/profile'];
    const isDark = darkRoutes.includes(location.pathname);

    // Fetch user profile if user is logged in at startup

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        if(isLoggedIn && !user && !loading && !error) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isLoggedIn, user, loading, error]);

    return (
        <div className={styles.root}>
            <Header/>
            <main className={isDark ? styles["bgDark"] : ""}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Root;
