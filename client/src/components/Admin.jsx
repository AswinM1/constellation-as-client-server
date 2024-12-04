import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Admin() {
  const [val, setVal] = useState([]);

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/');
        setVal(response.data); // Assuming response contains data in a 'data' field
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Add a new item via API
  

  // Delete an item via API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/${id}`);
      setVal(val.filter((item) => item.id !== id)); // Remove item from state after deleting
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <ul>
          <li><a href="#" className="block py-2 px-4 hover:bg-blue-600 rounded">Dashboard</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-blue-600 rounded">Users</a></li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        {/* Add New User Button */}
       

        {/* Table to display data */}
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Password</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {val.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.email}</td>
                <td className="border border-gray-300 p-2">{item.pass}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
