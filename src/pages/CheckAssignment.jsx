import { useState } from "react";
import Layout from "../components/Layout";

function CheckAssignment() {
  const [feedback, setFeedback] = useState("");

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-6">

        <h1 className="text-xl font-bold mb-4">✅ Check Assignment</h1>

        <p className="mb-2">Student File: assignment.pdf</p>

        <textarea
          placeholder="Write feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 dark:bg-slate-700"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Submit Feedback
        </button>

      </div>
    </Layout>
  );
}

export default CheckAssignment;