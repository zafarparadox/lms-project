import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AssignmentPage from "./pages/AssignmentPage";
import ProfilePage from "./pages/ProfilePage";
import QuizPage from "./pages/QuizPage";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourse from "./pages/TeacherCourse";
import TeacherVideo from "./pages/TeacherVideo";
import TeacherAssignment from "./pages/TeacherAssignment";
import CheckAssignment from "./pages/CheckAssignment";
import TeacherQuiz from "./pages/TeacherQuiz";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUser"; // ✅ YOUR FILE NAME
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCourses from "./pages/AdminCourses";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/admin-courses" element={<AdminCourses />} />
        {/* STUDENT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course-detail"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <CourseDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <AssignmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* TEACHER */}
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-course"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <TeacherCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-video"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <TeacherVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-assignment"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <TeacherAssignment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/check-assignment"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <CheckAssignment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher-quiz"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <TeacherQuiz />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;