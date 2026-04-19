import { useState } from "react";
import Layout from "../components/Layout";

function TeacherVideo() {
  const [link, setLink] = useState("");

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">

        <h1 className="text-xl font-bold mb-4">🎥 Upload Video</h1>

        <input
          placeholder="YouTube Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 dark:bg-slate-700"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Upload
        </button>

      </div>
    </Layout>
  );
}

export default TeacherVideo;