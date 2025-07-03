import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from '../layouts/AuthLayout'
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Home/Coverage/Coverage";
import Loading from '../pages/Shared/Loading/Loading'
import PrivateRoute from "../provider/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'coverage',
            loader: () => fetch('./coverageArea.json'),
            hydrateFallbackElement: <Loading/>,
            Component: Coverage
        },
        {
          path: 'sendParcel',
          element: <PrivateRoute><SendParcel/></PrivateRoute>,
          loader: () => fetch('./coverageArea.json'),
          hydrateFallbackElement: <Loading/>
        }
    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }

    ]
  }
]);