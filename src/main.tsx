import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import './index.css';

import Home from './pages/home/Home';
import Error from './pages/error/Error';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Onboard from './pages/onboard/Onboard';
import Platform from './pages/platform/Platform';
import PlatformRole from './pages/platform/PlatformRole';
import Project from './pages/platform/project/Project';
import UI from './pages/ui/UI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/ui',
    element: <UI />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/onboard',
    element: <Onboard />
  },
  {
    path: '/platform',
    element: <Platform />,
    children: [
      {
        path: '',
        element: <PlatformRole />
      },
      {
        path: 'project/:id',
        element: <Project />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
