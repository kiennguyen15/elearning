import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CertificatePage from "../certificate";
import api from "../../utils/api";
import { AppContext } from "../../context/AppContext";


const ExamPage = () => {
  const id = useParams().id;
  const { userInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const [questionExam, setQuestionExam] = useState<any[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [examResult, setExamResult] = useState<any[]>([]);
  console.log(examResult);
  
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 phút = 1800 giây
  const fetchQuestionExams = async () => {
    try {
      const response = await api.get(`exams_Questions/get-by-exam?ceid=${id}`);
      const questions = response.data[0]?.questions || [];
      setQuestionExam(questions);
      setAnswers(new Array(questions.length).fill(null));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const fetchExamResults = async () => {
    try {
      const response = await api.get(`/exam_Results/getExamResults?page=1&limit=99999999`);
      const allResults = response.data.data;

      const filteredResults = allResults.filter(
        (result: any) => result.uid === userInfo._id && result.ceid === id
      );

      setExamResult(filteredResults);
    } catch (error) {
      console.error("Error fetching exam results:", error);
    }
  };
  useEffect(() => {
    fetchQuestionExams();
    fetchExamResults();
  }, []);
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

  const handleSubmit = async () => {
    try {
      const questionsWithAnswers = questionExam.map((q, index) => {
        const selectedOptionIndex = answers[index];

        return {
          _id: q._id,
          answer: selectedOptionIndex !== null
            ? q.options[selectedOptionIndex].value
            : "",
        };
      });

      await api.put(`course_Exams/submit`, {
        ceid: id,
        questions: questionsWithAnswers,
      });

      setSubmitted(true);
      fetchExamResults();
    } catch (error) {
      console.error("Error submit exam:", error);
    }
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


  if (submitted) {
    const result = examResult[0]; // Vì bạn đã lọc theo user và ceid
    const score = result?.score || 0;
    const status = result?.status || "FAILED";

    return (
      <div className="text-center my-10 min-h-screen">
        <h2 className="text-2xl font-bold">🎉 Bạn đã hoàn thành bài thi!</h2>
        <p className="mt-4 text-lg">
          Số điểm của bạn là: <span className="font-bold">{score}</span>
        </p>
        <p className="mt-2 text-lg">
          Trạng thái:{" "}
          <span
            className={`font-bold ${status === "PASSED" ? "text-green-600" : "text-red-600"
              }`}
          >
            {status === "PASSED" ? "Đạt" : "Chưa đạt"}
          </span>
        </p>

        {status === "PASSED" && (
          <div className="mt-6">
            <CertificatePage score={score} totalQuestions={questionExam.length} />
          </div>
        )}

        <button
          onClick={() => navigate("/lich-su-thi")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Xem lịch sử thi
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-6 my-10 mx-20">
      {/* Left: Questions */}
      <div className="w-8/12 bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold mb-4">📝 Bài thi</h2>
        {questionExam.map((q, i) => (
          <div key={i} className="border-b pb-4">
            <p className="font-semibold mb-2">
              {i + 1}. {q.questionText}
            </p>
            <ul className="space-y-2">
              {q.options.map((opt: any, idx: any) => (
                <li key={idx}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={answers[i] === idx}
                      onChange={() => handleSelect(i, idx)}
                    />
                    {opt.label}
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
            {questionExam.map((_, i) => {
              const selected = answers[i];
              const label = selected !== null ? String.fromCharCode(65 + selected) : i + 1;
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
