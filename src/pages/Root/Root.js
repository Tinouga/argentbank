import styles from "./Root.module.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Outlet} from "react-router-dom";


const Root = () => (
    <div className={styles.root}>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default Root;
