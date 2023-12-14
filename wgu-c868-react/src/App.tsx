import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/customer/home/Home";
import { MenuPage as CustomerMenuPage } from "./pages/customer/menu/Menu";
import { MenuPage as OwnerMenuPage } from "./pages/owner/menu/Menu";
import { OrdersPage as CustomerOrdersPage } from "./pages/customer/orders/Orders";
import { OrdersPage as OwnerOrdersPage } from "./pages/owner/orders/Orders";
import CheckOutPage from "./pages/customer/check-out/CheckOut";
import InventoryPage from "./pages/owner/inventory/Inventory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <CustomerMenuPage /> },
      { path: "/orders", element: <CustomerOrdersPage /> },
      { path: "/check-out", element: <CheckOutPage /> },
    ],
  },
  {
    path: "/owner",
    children: [
      { path: "/owner", element: <OwnerOrdersPage /> },
      { path: "/owner/menu", element: <OwnerMenuPage /> },
      { path: "/owner/inventory", element: <InventoryPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
