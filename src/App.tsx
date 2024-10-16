import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider, RouteObject } from "react-router-dom";
import Header from "./partials/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./NotFound";
import Loader from "./components/Loader";
import showLoader from "./utils/context/LoaderContext";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import UseRedirect from "./hooks/useRedirect";

const AppLayout: React.FC = () => {
  const [isLoader, setLoader] = useState<boolean>(false);
  return (
    <>
      <Provider store={store}>
        {/* added context for just only for demo */}
        <showLoader.Provider value={{ isLoader, setLoader }}>
          <UseRedirect />
          {isLoader && <Loader />}
          <Header />
          <Outlet />
        </showLoader.Provider>
      </Provider>
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
        element: <Dashboard />,
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
        path: "/transaction",
        element: <>transaction</>
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
