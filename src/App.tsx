import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider, RouteObject } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';

const AppLayout: React.FC = () => {
  return (
    <>
    <Header/>
      <Outlet />
    </>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element:<Table/>,
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

const App: React.FC = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
