import { createBrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "./layouts/App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import PlacePage from "./components/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import SinglePlace from "./pages/SinglePlace";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import ProtectedLayouts from "./layouts/ProtectedLayouts";
import SuccessPage from "./components/success/SuccessPage";
import Error from "./components/Error";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account/place/:id",
        element: <SinglePlace />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/account",
        element: <ProtectedLayouts />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "accomodations",
            element: <PlacePage />,
          },
          {
            path: "accomodations/new",
            element: <PlacesFormPage />,
          },
          {
            path: "accomodations/:id",
            element: <PlacesFormPage />,
          },
          {
            path: "bookings",
            element: <BookingsPage />,
          },
          {
            path: "bookings/:id",
            element: <BookingPage />,
          },
          {
            path: "payment/success",
            element: <SuccessPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
