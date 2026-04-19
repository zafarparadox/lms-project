import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const approve = async (id) => {
    await API.put(`/admin/approve/${id}`);
    fetchUsers();
  };

  const deactivate = async (id) => {
    await API.put(`/admin/deactivate/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 min-h-screen flex flex-col">

      <h2 className="text-xl font-bold mb-4 text-center">
        User Management Panel
      </h2>

      {/* TABLE */}
      <div className="flex-grow overflow-x-auto">
        <table className="w-full border text-center">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id} className="border">
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td>{u.course || "-"}</td>
                  <td>{u.semester || "-"}</td>

                  <td className="space-x-2">

                    {u.status === "PENDING" && (
                      <button
                        onClick={() => approve(u.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}

                    {u.status === "ACTIVE" && u.role !== "ADMIN" && (
                      <button
                        onClick={() => deactivate(u.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Deactivate
                      </button>
                    )}

                    {u.status === "INACTIVE" && (
                      <button
                        onClick={() => approve(u.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Reactivate
                      </button>
                    )}

                    {u.role === "ADMIN" && (
                      <span className="text-gray-500">Protected</span>
                    )}

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 BACK BUTTON (BOTTOM CENTER) */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ← Back to Dashboard
        </button>
      </div>

    </div>
  );
}

export default AdminUsers;