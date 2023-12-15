import { Link } from "react-router-dom";
import "./navigation.css";

function OwnerNavigation() {
  return (
    <header>
      <h1>Name of Site</h1>
      <nav>
        <ul>
          <li>
            <Link to="/owner">Orders</Link>
          </li>
          <li>
            <Link to="/owner/menu">Menu</Link>
          </li>
          <li>
            <Link to="/owner/reports">Reports</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => (window.location.href = "/")}>Owner</button>
    </header>
  );
}

export default OwnerNavigation;
