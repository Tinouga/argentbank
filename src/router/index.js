import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import RequireAuth from "../components/RequireAuth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'login',
                element: <SignIn/>
            },
            {
                path: 'profile',
                element: (
                    <RequireAuth>
                        <Profile/>
                    </RequireAuth>
                ),
            }
        ]
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router}/>
    );
};
