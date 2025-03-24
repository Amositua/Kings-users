import React, { useEffect, useState, useMemo } from "react";
import { getUsers, updateUserStatus, deleteUser } from "../api/userApi";

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Set how many users per page

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Start loading
    const data = await getUsers();
    setUsers(data);
    setLoading(false); // Stop loading
  };

  const handleStatusUpdate = async (userId, status) => {
    await updateUserStatus(userId, status);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      fetchUsers();
    }
  };

  // Filter users based on search input
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">User List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or country..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* User Table */}
      {loading ? (<div className="flex justify-center my-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  </div>) : (
   <div className="overflow-x-auto bg-white shadow-md rounded-lg">
   <table className="w-full border-collapse">
     <thead>
       <tr className="bg-gray-100 text-sm">
         <th className="px-4 py-2">First Name</th>
         <th className="px-4 py-2">Last Name</th>
         <th className="px-4 py-2">Email</th>
         <th className="px-4 py-2">Gender</th>
         <th className="px-4 py-2">Phone</th>
         <th className="px-4 py-2">Country</th>
         <th className="px-4 py-2">State</th>
         <th className="px-4 py-2">City</th>
         <th className="px-4 py-2">Address</th>
         <th className="px-4 py-2">ID Type</th>
         <th className="px-4 py-2">ID File</th>
         <th className="px-4 py-2">Status</th>
         <th className="px-4 py-2">Actions</th>
         <th className="px-4 py-2">Delete</th>
       </tr>
     </thead>
     <tbody>
       {currentUsers.map((user) => (
         <tr key={user._id} className="border-b text-xs">
           <td className="px-4 py-3">{user.firstName}</td>
           <td className="px-4 py-3">{user.lastName}</td>
           <td className="px-4 py-3">{user.email}</td>
           <td className="px-4 py-3">{user.gender}</td>
           <td className="px-4 py-3">+{user.phone}</td>
           <td className="px-4 py-3">{user.country}</td>
           <td className="px-4 py-3">{user.state}</td>
           <td className="px-4 py-3">{user.city}</td>
           <td className="px-4 py-3">{user.address}</td>
           <td className="px-4 py-3">{user.idType}</td>
           <td className="px-4 py-3">
           {user.idFileUrl ? (
                 user.idFileUrl.endsWith(".pdf") ? (
                   <a
                     href={`https://kings-backend-4diu.onrender.com${user.idFileUrl}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-500 underline"
                   >
                     View PDF
                   </a>
                 ) : (
                   <a
                   href={`https://kings-backend-4diu.onrender.com${user.idFileUrl}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-500 underline"
                 >
                 <img
                     src={`https://kings-backend-4diu.onrender.com${user.idFileUrl}`}
                     alt="ID File"
                     className="h-16 mx-auto rounded-lg shadow"
                   />
                 </a>
                   
                 )
               ) : (
                 "No File"
               )}
           </td>
           <td className="px-4 py-3">
             <span
               className={`px-2 py-1 text-xs font-bold rounded ${
                 user.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
               }`}
             >
               {user.status}
             </span>
           </td>
           <td className="px-4 py-3">
             <button
               className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
               onClick={() => handleStatusUpdate(user._id, "approved")}
             >
               Approve
             </button>
             <button
               className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-700"
               onClick={() => handleStatusUpdate(user._id, "rejected")}
             >
               Reject
             </button>
           </td>
           <td className="px-4 py-3">
             <button
               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
               onClick={() => handleDeleteUser(user._id)}
             >
               Delete
             </button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>) }
      

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
