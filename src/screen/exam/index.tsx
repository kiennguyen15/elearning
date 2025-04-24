import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CertificatePage from "../certificate";

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Markdown Language", "Hyperloop Machine Language"],
    answer: 0,
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    options: ["<break>", "<br>", "<lb>"],
    answer: 1,
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size"],
    answer: 2,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<javascript>", "<script>"],
    answer: 2,
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
    answer: 0,
  },
  {
    question: "Which HTML element is used to define a hyperlink?",
    options: ["<link>", "<a>", "<href>"],
    answer: 0,
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["number", "string", "both"],
    answer: 0,
  },
  {
    question: "How do you create a comment in JavaScript?",
    options: ["// This is a comment", "<!-- This is a comment -->", "# This is a comment"],
    answer: 0,
  },
  {
    question: "Which HTML element is used to display an image?",
    options: ["<img>", "<image>", "<src>"],
    answer: 0,
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["background-color", "color", "bg-color"],
    answer: 0,
  },
  {
    question: "Which of the following is used to select an HTML element by its class in CSS?",
    options: [".classname", "#idname", "<classname>"],
    answer: 0,
  },
  {
    question: "How can you make a numbered list in HTML?",
    options: ["<ul>", "<ol>", "<li>"],
    answer: 0,
  },
  {
    question: "What does the 'box-sizing' property in CSS control?",
    options: ["Content box size", "Padding and border inside box", "Layout of a box"],
    answer: 0,
  },
  {
    question: "What does 'let' do in JavaScript?",
    options: ["Creates a variable", "Creates a constant", "Defines a function"],
    answer: 0,
  },
  {
    question: "Which method is used to find an element by its id in JavaScript?",
    options: ["getElementById", "getById", "querySelector"],
    answer: 0,
  },
  {
    question: "Which property is used to change the font of an element in CSS?",
    options: ["font-family", "font-style", "text-font"],
    answer: 0,
  },
  {
    question: "Which tag is used to define a table in HTML?",
    options: ["<table>", "<tbl>", "<td>"],
    answer: 0,
  },
  {
    question: "How do you call a function in JavaScript?",
    options: ["function_name()", "call function_name", "execute function_name"],
    answer: 0,
  },
  {
    question: "Which HTML element is used to create a form?",
    options: ["<form>", "<input>", "<submit>"],
    answer: 0,
  },
  {
    question: "What is the correct syntax to create a variable in JavaScript?",
    options: ["var variableName", "variable variableName", "let variableName"],
    answer: 0,
  },
];


const ExamPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 phút = 1800 giây
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  const handleSelect = (qIndex: any, optIndex: any) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit(); // Gọi hàm nộp bài khi hết giờ
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const score = answers.reduce((acc, ans, i) => {
    return ans === questions[i].answer ? acc + 1 : acc;
  }, 0);

  if (submitted) {
    if (submitted) {
      return (
        <div className="text-center my-10 min-h-screen">
          {/* <h2 className="text-2xl font-bold">🎉 Chúc mừng bạn đã hoàn thành bài thi!</h2>
          <p className="mt-4 text-lg">
            Số điểm của bạn là: {score}/{questions.length}
          </p> */}
          <CertificatePage score={score} totalQuestions={questions.length} />
          <button
            onClick={() => navigate('/lich-su-thi')}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Xem lịch sử thi
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex gap-6 my-10 mx-20">
      {/* Left: Questions */}
      <div className="w-8/12 bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold mb-4">📝 Bài thi</h2>
        {questions.map((q, i) => (
          <div key={i} className="border-b pb-4">
            <p className="font-semibold mb-2">
              {i + 1}. {q.question}
            </p>
            <ul className="space-y-2">
              {q.options.map((opt, idx) => (
                <li key={idx}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={answers[i] === idx}
                      onChange={() => handleSelect(i, idx)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right: Grid + Submit */}
      <div className="w-4/12 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between sticky top-20 h-fit">
        <div>
          <div className="mb-6 text-center text-lg font-semibold text-red-600">
            ⏰ Thời gian còn lại: {formatTime(timeLeft)}
          </div>
          <h2 className="text-xl font-bold mb-4">📦 Trạng thái câu hỏi</h2>
          <div className="grid grid-cols-5 gap-3">
            {questions.map((_, i) => {
              const selected = answers[i];
              const label = selected !== null ? String.fromCharCode(65 + selected) : (i + 1);
              return (
                <div
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border cursor-default
        ${selected !== null
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-10 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
