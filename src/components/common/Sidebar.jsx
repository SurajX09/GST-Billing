import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0"> 
      <div className="p-4 flex items-center gap-3 border-b">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-md flex items-center justify-center font-bold">GST</div>
        <div>
          <div className="font-semibold">GST Billing</div>
          <div className="text-xs text-gray-500">v0.1</div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">Dashboard</Link>
          </li>
          <li>
            <Link to="/invoice" className="block px-3 py-2 rounded-md hover:bg-gray-100">Create Invoice</Link>
          </li>
          <li>
            <Link to="/customer" className="block px-3 py-2 rounded-md hover:bg-gray-100">Customers</Link>
          </li>
          <li>
            <Link to="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Reports</Link>
          </li>
          <li>
            <Link to="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
