import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TeacherSidebar from "./TeacherSidebar";
import AdminSidebar from "./AdminSidebar";

function Layout({ children }) {
  const role = localStorage.getItem("role");

  return (
    <div className="flex">

      {/* 🔥 Role-based Sidebar */}
      {role === "TEACHER" ? (
        <TeacherSidebar />
      ) : role === "ADMIN" ? (
        <AdminSidebar />
      ) : (
        <Sidebar /> // student
      )}

      <div className="flex-1 flex flex-col min-h-screen">

        <Navbar />

        <div className="p-4">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;