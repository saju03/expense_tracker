import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider, RouteObject } from "react-router-dom";
import "./App.css";
import Header from "./partials/Header";
import Table from "./components/Table";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./NotFound";
import Loader from "./components/Loader";
import showLoader from "./utils/context/loaderContex";

const AppLayout: React.FC = () => {
  const [isLoader, setLoader] = useState<boolean>(false);
  return (
    <>
      <showLoader.Provider value={{ isLoader, setLoader }}>
        {isLoader && <Loader />}
        <Header />
        <Outlet />
      </showLoader.Provider>
    </>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Table />,
      },
      {
        path: "/login",

        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "*", // Catch-all route for 404
        element: <NotFound />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

const App: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
