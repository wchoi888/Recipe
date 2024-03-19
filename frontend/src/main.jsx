import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ExternalRecipes from './components/ExternalRecipes/ExternalRecipes';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/register',
        element: <Register />
      }, {
        path: '/search',
        element: <ExternalRecipes />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
