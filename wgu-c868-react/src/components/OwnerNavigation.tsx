import "./navigation.css";

function OwnerNavigation() {
  return (
    <header>
      <div>
        <h1>Name of Site</h1>
      </div>
      <nav>
        <ul>
          <li>Orders</li>
          <li>Menu</li>
          <li>Reports</li>
          <li>Inventory</li>
        </ul>
      </nav>
      <div>
        <button>Owner</button>
      </div>
    </header>
  );
}

export default OwnerNavigation;
