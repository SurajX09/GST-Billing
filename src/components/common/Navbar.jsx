// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-md flex items-center justify-center font-bold">GST</div>
          <nav className="flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/invoice" className="hover:text-blue-600">Invoices</Link>
            <Link to="/customer" className="hover:text-blue-600">Customers</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input placeholder="Search invoices..." className="hidden sm:inline-block border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-gray-800">Help</button>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">S</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
