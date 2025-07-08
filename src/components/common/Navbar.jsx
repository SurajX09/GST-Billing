// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/invoice">Create Invoice</Link>
      <Link to="/customer">Customers</Link>
    </nav>
  );
};

export default Navbar;
