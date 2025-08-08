import React, { useEffect, useState } from "react";
import { protectedApi, publicApi } from '../components/Api';
const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const [name, setName] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await protectedApi.get(`${BackEndUrl}/api/user`);
        const user = response.data.user
        setName(user.name)
      } catch (error) {
        console.log("Error on getUser function ", error)
      }
    };

    getUser();
  }, [])

  const handleLogout = async () => {
    try {
      await publicApi.post(`${BackEndUrl}/api/auth/logout`)
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.log("Error from Logout function ", error)
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome, {name} 👋
        </h1>
        <p className="text-gray-600 mb-6">You are now logged in!</p>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};