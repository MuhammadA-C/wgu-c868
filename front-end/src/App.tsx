import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout as CustomerRootLayout } from "./pages/customer/Root";
import { RootLayout as OwnerRootLayout } from "./pages/owner/Root";

import HomePage from "./pages/customer/home/Home";
import { MenuPage as CustomerMenuPage } from "./pages/customer/menu/Menu";
import { MenuPage as OwnerMenuPage } from "./pages/owner/menu/Menu";
import { OrdersPage as CustomerOrdersPage } from "./pages/customer/orders/Orders";
import { OrdersPage as OwnerOrdersPage } from "./pages/owner/orders/Orders";
import CheckOutPage from "./pages/customer/check-out/CheckOut";
import ReportsPage from "./pages/owner/reports/Reports";
import { AddMenuItemPage } from "./pages/owner/add-menu-item/Add-Menu-Item";
import { UpdateMenuItemPage } from "./pages/owner/update-menu-item/Update-Menu-Item";

const router = createBrowserRouter([
  //Sets up all the page routing for the top nav tabs for the application
  {
    //Below are the pages that the customer will have access to
    path: "/",
    element: <CustomerRootLayout />,
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
    element: <OwnerRootLayout />,
    children: [
      { path: "/owner", element: <OwnerOrdersPage /> },
      { path: "/owner/menu", element: <OwnerMenuPage /> },
      { path: "/owner/reports", element: <ReportsPage /> },
      { path: "/owner/menu/add-menu-item", element: <AddMenuItemPage /> },
      { path: "/owner/menu/update-menu-item", element: <UpdateMenuItemPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
