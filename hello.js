import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Change this to adjust number of users per page

  // Fetch users from backend
 useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get("https://kings-backend-4diu.onrender.com/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  fetchUsers();
}, []);




  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    [user.firstName, user.lastName, user.email, user.country]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete user function
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://kings-backend-4diu.onrender.com/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Registered Users</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, or Country..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      {loading ? (
  <div className="flex justify-center my-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  </div>
) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-500 text-white">
            <tr>
            <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Country</th>
              <th className="py-2 px-4 border">State</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">ID Type</th>
              <th className="py-2 px-4 border">ID File</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="text-center border-t">
                    <td className="py-2 px-4 border">{user.firstName} {user.lastName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.phone}</td>
                  <td className="py-2 px-4 border">{user.gender}</td>
                  <td className="py-2 px-4 border">{user.country}</td>
                  <td className="py-2 px-4 border">{user.state}</td>
                  <td className="py-2 px-4 border">{user.city}</td>
                  <td className="py-2 px-4 border">{user.address}</td>
                  <td className="py-2 px-4 border">{user.idType}</td>
                  <td className="py-2 px-4 border">
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
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>)}

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex justify-center mt-5">
          {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
