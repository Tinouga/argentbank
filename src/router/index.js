import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);

export default function Router() {
    return (
        <RouterProvider router={router}/>
    );
};
