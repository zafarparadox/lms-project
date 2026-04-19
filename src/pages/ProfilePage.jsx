import { useState } from "react";
import Layout from "../components/Layout";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Md Zafrullah",
    email: "zafrullah@email.com",
    role: "Student",
    phone: "9876543210",
    address: "Patna, Bihar",
    courses: ["HTML", "Networking"],
    image: "https://via.placeholder.com/150",
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          👤 My Profile
        </h1>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border">

          {!isEditing ? (
            <>
              {/* TOP SECTION */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                <img
                  src={user.image}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border shadow"
                />

                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                    {user.role}
                  </span>
                </div>

              </div>

              {/* DETAILS */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">

                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">📞 Phone</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user.phone}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">📍 Address</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user.address}
                  </p>
                </div>

              </div>

              {/* COURSES */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
                  📚 Enrolled Courses
                </h3>

                <div className="flex flex-wrap gap-2">
                  {user.courses.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
              >
                ✏️ Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* EDIT MODE */}
              <div className="space-y-4">

                <input type="file" onChange={handleImageChange} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded-lg bg-white text-gray-800 dark:bg-slate-700 dark:text-white"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-2 border rounded-lg bg-white text-gray-800 dark:bg-slate-700 dark:text-white"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full p-2 border rounded-lg bg-white text-gray-800 dark:bg-slate-700 dark:text-white"
                />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full p-2 border rounded-lg bg-white text-gray-800 dark:bg-slate-700 dark:text-white"
                />

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                  >
                    ✅ Save Changes
                  </button>

                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow"
                  >
                    ❌ Cancel
                  </button>

                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;