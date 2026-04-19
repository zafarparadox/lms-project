import Layout from "../components/Layout";

function TeacherAssignment() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">

        <h1 className="text-xl font-bold mb-4">📄 Upload Assignment</h1>

        <input type="file" className="mb-4" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Upload
        </button>

      </div>
    </Layout>
  );
}

export default TeacherAssignment;