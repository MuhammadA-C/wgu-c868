import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerNavigation from "./components/navigation/CustomerNavigation";
import RootLayout from "./pages/Root";
import HomePage from "./pages/customer/home/Home";
import MenuPage from "./pages/customer/menu/Menu";
import OrdersPage from "./pages/customer/orders/Orders";
import CheckOutPage from "./pages/customer/check-out/CheckOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/check-out", element: <CheckOutPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
