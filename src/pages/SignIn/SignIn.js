import styles from "./SignIn.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../features/auth/authSlice";
import {useState} from "react";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(login({email: username, password, rememberMe}));
        if(login.fulfilled.match(resultAction)) {
            navigate('/user');
        }
    };

    return (
        <section className={styles.signIn}>
            <FontAwesomeIcon icon={faUserCircle} className={styles.signInIcon} />
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={styles.inputRemember}>
                    <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.signInBtn} disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </section>
    )
};

export default SignIn;