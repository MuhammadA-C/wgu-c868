import { Link } from "react-router-dom";
import "./navigation.css";

function CustomerNavigation() {
  return (
    <header>
      <h1>Name of Site</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/check-out">Check Out</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => (window.location.href = "/owner")}>
        Customer
      </button>
    </header>
  );
}

export default CustomerNavigation;
