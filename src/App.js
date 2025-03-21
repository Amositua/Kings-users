import React from "react";
import UserTable from "./components/userTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className=" mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <UserTable />
      </div>
    </div>
  );
}

export default App;
