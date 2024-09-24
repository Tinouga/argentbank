import styles from "./Root.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Outlet, useLocation} from "react-router-dom";


const Root = () => {
    const location = useLocation();
    const darkRoutes = ['/login', '/profile'];
    const isDark = darkRoutes.includes(location.pathname);

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
