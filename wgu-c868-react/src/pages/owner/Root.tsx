import { Outlet } from "react-router-dom";
import OwnerNavigation from "../../components/navigation/OwnerNavigation";

function RootLayout() {
  return (
    <>
      <OwnerNavigation />
      <Outlet></Outlet>
    </>
  );
}

export { RootLayout };
