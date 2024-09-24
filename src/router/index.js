import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            }
        ]
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router}/>
    );
};
