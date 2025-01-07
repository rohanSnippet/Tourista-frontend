import { createBrowserRouter } from "react-router-dom";
import { Main } from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import Signup from "../components/Signup";
import UpdateProfilePage from "../pages/dashboard/UpdateProfilePage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import CartPage from "../pages/Shop/CartPage";
import PackageOverview from "../pages/packageOverview.jsx/PackageOverview";
import ForgotPass from "../components/ForgotPass";
import Login from "../components/Login";
import AddTravellerInfo from "../pages/packageOverview.jsx/AddTravellersInfo";
import Checkout from "../pages/packageOverview.jsx/Checkout";
import SpecialPackages from "../components/SpecialPackages";
import Receipt from "../pages/Receipt";
import AddTour from "../pages/dashboard/admin/AddTour";
import ManageTour from "../pages/dashboard/admin/ManageTour";
import Bookings from "../pages/dashboard/Bookings";
import ContactUS from "../components/ContactUS";
import Terms from "../pages/packageOverview.jsx/Terms";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import AboutUs from "../components/AboutUs";
import CustomerSupport from "../pages/dashboard/admin/CustomerSupport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/menu",
        element: (
          <PrivateRouter>
            {" "}
            <Menu />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfilePage />,
      },
      {
        path: "/package-overview",
        element: <PackageOverview />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/add-travellers",
        element: (
          <PrivateRouter>
            <AddTravellerInfo />
          </PrivateRouter>
        ),
      },
      {
        path: "/receipt",
        element: (
          <PrivateRouter>
            <Receipt />
          </PrivateRouter>
        ),
      },
      {
        path: "/bookings",
        element: (
          <PrivateRouter>
            <Bookings />
          </PrivateRouter>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRouter>
            <Checkout />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/special-package",
    element: <SpecialPackages />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <ForgotPass />,
  },
  {
    path: "/contact",
    element: <ContactUS />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-tour",
        element: <AddTour />,
      },
      {
        path: "manage-tour",
        element: <ManageTour />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "customer-support",
        element: <CustomerSupport />,
      },
    ],
  },
]);

export default router;
