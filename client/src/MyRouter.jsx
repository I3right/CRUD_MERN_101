import { createBrowserRouter,RouterProvider} from "react-router-dom";

import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import { getUser } from "./services/authorize";

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog/:slug",
    element: <SingleComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/blog/edit/:slug",
    element: <EditComponent />,
  },
  {
    path: "/create",
    element: <FormComponent />,
  },
]);

// const adminRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/blog/:slug",
//     element: <SingleComponent />,
//   },
//   {
//     path: "/blog/edit/:slug",
//     element: <EditComponent />,
//   },
//   {
//     path: "/create",
//     element: <FormComponent />,
//   },
// ]);

const MyRouter = () => {
  return (
    <RouterProvider router={userRouter} />
  );
};

export default MyRouter;
