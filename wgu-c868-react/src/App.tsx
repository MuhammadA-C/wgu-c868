import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/customer/home/Home";
import { MenuPage as CustomerMenuPage } from "./pages/customer/menu/Menu";
import { MenuPage as OwnerMenuPage } from "./pages/owner/menu/Menu";
import { OrdersPage as CustomerOrdersPage } from "./pages/customer/orders/Orders";
import { OrdersPage as OwnerOrdersPage } from "./pages/owner/orders/Orders";
import CheckOutPage from "./pages/customer/check-out/CheckOut";
import InventoryPage from "./pages/owner/inventory/Inventory";
import ReportsPage from "./pages/owner/reports/Reports";

const router = createBrowserRouter([
  //Sets up all the page routing for the top nav tabs for the application
  {
    //Below are the pages that the customer will have access to
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
    //Below are the pages that the resturant owner will have access to
    path: "/owner",
    children: [
      { path: "/owner", element: <OwnerOrdersPage /> },
      { path: "/owner/menu", element: <OwnerMenuPage /> },
      { path: "/owner/reports", element: <ReportsPage /> },
      { path: "/owner/inventory", element: <InventoryPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
