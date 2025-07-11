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
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../provider/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";


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
          path: 'beARider',
          element: <PrivateRoute><BeARider/></PrivateRoute>,
          loader: () => fetch('./coverageArea.json'),
          hydrateFallbackElement: <Loading/>,
        },
        {
          path: 'sendParcel',
          element: <PrivateRoute><SendParcel/></PrivateRoute>,
          loader: () => fetch('./coverageArea.json'),
          hydrateFallbackElement: <Loading/>
        },
        {
          path: 'forbidden',
          Component: Forbidden
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
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'assignRider',
        element: <AdminRoute><AssignRider/></AdminRoute>
      },
      {
        path: 'activeRiders',
        element: <AdminRoute><ActiveRiders/></AdminRoute>
      },
      {
        path: 'pendingRiders',
        element: <AdminRoute><PendingRiders/></AdminRoute>
      },
      {
        path: 'makeAdmin',
        element: <AdminRoute><MakeAdmin/></AdminRoute>
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