import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function QuizPage() {

  const quizData = {
    html: [
      { question: "What is HTML?", options: ["Language", "Markup", "DB", "Server"], answer: 1 },
      { question: "HTML tag?", options: ["<div>", "<sql>", "<db>", "<net>"], answer: 0 },
      { question: "Head tag used for?", options: ["Body", "Metadata", "Design", "None"], answer: 1 },
      { question: "Paragraph tag?", options: ["<p>", "<h1>", "<div>", "<span>"], answer: 0 },
      { question: "Image tag?", options: ["<img>", "<pic>", "<image>", "<src>"], answer: 0 },
      { question: "Link tag?", options: ["<a>", "<link>", "<url>", "<ref>"], answer: 0 },
      { question: "List tag?", options: ["<ul>", "<li>", "<ol>", "All"], answer: 3 },
      { question: "Form tag?", options: ["<form>", "<input>", "<label>", "All"], answer: 3 },
      { question: "Table tag?", options: ["<table>", "<tr>", "<td>", "All"], answer: 3 },
      { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Hyper Tool", "High Text", "None"], answer: 0 },
    ],

    networking: [
      { question: "What is IP?", options: ["Address", "Protocol", "Device", "None"], answer: 0 },
      { question: "OSI layers?", options: ["5", "6", "7", "8"], answer: 2 },
      { question: "TCP is?", options: ["Connection-oriented", "Connectionless", "Both", "None"], answer: 0 },
      { question: "UDP is?", options: ["Fast", "Reliable", "Connectionless", "None"], answer: 2 },
      { question: "HTTP works on?", options: ["Port 80", "Port 21", "Port 25", "Port 110"], answer: 0 },
      { question: "FTP is?", options: ["File Transfer", "Fast Transfer", "Data Tool", "None"], answer: 0 },
      { question: "DNS is?", options: ["Name System", "Domain Name System", "Network Tool", "None"], answer: 1 },
      { question: "MAC address is?", options: ["Physical address", "IP", "Logical", "None"], answer: 0 },
      { question: "Router does?", options: ["Routing", "Switching", "Broadcast", "None"], answer: 0 },
      { question: "LAN stands for?", options: ["Local Area Network", "Large Network", "Line Network", "None"], answer: 0 },
    ],
  };

  const [course, setCourse] = useState("html");
  const [questions, setQuestions] = useState(quizData["html"]);

  const totalTime = 600;

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setQuestions(quizData[course]);
    setAnswers(Array(quizData[course].length).fill(null));
    setCurrentQ(0);
    setTimeLeft(totalTime);
    setSubmitted(false);
    setStarted(false);
  }, [course]);

  useEffect(() => {
    if (!started || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted]);

  const handleSelect = (index) => {
    const updated = [...answers];
    updated[currentQ] = index;
    setAnswers(updated);
  };

  const handleNext = () => setCurrentQ((prev) => prev + 1);
  const handlePrev = () => setCurrentQ((prev) => prev - 1);
  const handleSubmit = () => setSubmitted(true);

  const score = answers.reduce(
    (acc, ans, i) => (ans === questions[i].answer ? acc + 1 : acc),
    0
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* COURSE SWITCH */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setCourse("html")}
            className={`px-4 py-2 rounded ${
              course === "html" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            HTML Quiz
          </button>

          <button
            onClick={() => setCourse("networking")}
            className={`px-4 py-2 rounded ${
              course === "networking" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Networking Quiz
          </button>
        </div>

        {/* START */}
        {!started && !submitted && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center">
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* QUIZ */}
        {started && !submitted && (
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl">

            <h2 className="mb-4 font-semibold">
              Q{currentQ + 1}. {questions[currentQ].question}
            </h2>

            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`block w-full text-left p-2 mb-2 rounded ${
                  answers[currentQ] === i
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-slate-700 dark:text-white"
                }`}
              >
                {opt}
              </button>
            ))}

            <div className="flex justify-between mt-4">
              <button onClick={handlePrev} disabled={currentQ === 0}>
                Prev
              </button>

              {currentQ === questions.length - 1 ? (
                <button onClick={handleSubmit}>Submit</button>
              ) : (
                <button onClick={handleNext}>Next</button>
              )}
            </div>

          </div>
        )}

        {/* RESULT */}
        {submitted && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl text-center">

            <h2 className="mb-3 font-bold">Result</h2>
            <p className="text-lg">
              Score: {score} / {questions.length}
            </p>

            <button
              onClick={() =>
                setCourse(course === "html" ? "networking" : "html")
              }
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Next Quiz ➡
            </button>

          </div>
        )}

      </div>
    </Layout>
  );
}

export default QuizPage;