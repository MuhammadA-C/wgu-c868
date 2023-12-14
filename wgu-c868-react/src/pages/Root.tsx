import { Outlet } from "react-router-dom";
import CustomerNavigation from "../components/navigation/CustomerNavigation";

function RootLayout() {
  return (
    <>
      <CustomerNavigation />
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
