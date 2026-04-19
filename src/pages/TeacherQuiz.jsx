import { useState } from "react";
import Layout from "../components/Layout";

function TeacherQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answer = Number(value);
    setQuestions(updated);
  };

  const handleSave = () => {
    const quiz = { title, questions };

    console.log("Saved Quiz:", quiz);

    // localStorage (temporary)
    localStorage.setItem("teacherQuiz", JSON.stringify(quiz));

    alert("Quiz Saved!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6">

        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          🧑‍🏫 Create Quiz
        </h1>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Enter Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-800 dark:bg-slate-700 dark:text-white"
        />

        {/* QUESTIONS */}
        {questions.map((q, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl mb-4 shadow">

            <input
              type="text"
              placeholder={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(i, e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />

            {/* OPTIONS */}
            {q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Option ${j + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(i, j, e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
            ))}

            {/* CORRECT ANSWER */}
            <select
              value={q.answer}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value={0}>Correct: Option 1</option>
              <option value={1}>Correct: Option 2</option>
              <option value={2}>Correct: Option 3</option>
              <option value={3}>Correct: Option 4</option>
            </select>

          </div>
        ))}

        {/* BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            ➕ Add Question
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            💾 Save Quiz
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default TeacherQuiz;