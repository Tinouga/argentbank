import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const RequireAuth = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if(!isLoggedIn) {
        // redirect to login page if user isn't authenticated,
        return <Navigate to="/login" replace />;
    }

    // user is authenticated, render the child components
    return children;
};

export default RequireAuth;
