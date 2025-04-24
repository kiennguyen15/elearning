import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CertificatePage from "../certificate";

const questions = [
  {
    question: "Câu 1: Ai là người đầu tiên đưa ra số đo lượng thông tin?",
    options: ["C.E. Shannon", "V.A. Kachenhicov", "R.V.L. Hartley", "D.V. Ageev"],
    answer: 2,
  },
  {
    question: "Câu 2: Tín hiệu là gì trong lý thuyết thông tin?",
    options: ["Dạng vật chất thể hiện thông tin", "Đơn vị đo của tin", "Đại lượng vật lý biến thiên mang tin cần truyền", "Một dạng sóng điện từ có tần số cố định"],
    answer: 2,
  },
  {
    question: "Câu 3: 'Nguồn tin' trong hệ thống truyền tin có chức năng gì?",
    options: ["Biến tin thành tín hiệu", "Sinh ra thông tin", "Lưu trữ thông tin", "Giải mã thông tin"],
    answer: 1,
  },
  {
    question: "Câu 4: Một đặc điểm của nguồn tin rời rạc là:",
    options: ["Có tập tin vô hạn", "Xác suất xuất hiện các tin luôn bằng nhau", "Có xác suất xuất hiện khác nhau", "Luôn được biểu diễn bằng sóng liên tục"],
    answer: 2,
  },
  {
    question: "Câu 5: Máy phát trong hệ thống truyền tin thực hiện những chức năng gì?",
    options: ["Lưu trữ và giải mã tin", "Ghi và biểu diễn tin", "Mã hóa và điều chế tin", "Thu và xử lý tin"],
    answer: 2,
  },
  {
    question: "Câu 6: 'Khối điều chế' trong máy phát có vai trò gì?",
    options: ["Tách tín hiệu thành các tần số khác nhau", "Biến đổi tin thành tín hiệu cao tần", "Lưu trữ tín hiệu", "Truyền tín hiệu đến máy thu"],
    answer: 1,
  },
  {
    question: "Câu 7: Đường truyền trong hệ thống truyền tin là gì?",
    options: ["Thiết bị mã hóa tin", "Kênh vật lý truyền tín hiệu", "Bộ nhớ trung gian", "Thiết bị biểu diễn thông tin"],
    answer: 1,
  },
  {
    question: "Câu 8: Nhiễu được định nghĩa là gì?",
    options: ["Tất cả các tín hiệu vô ích gây ảnh hưởng xấu đến thu tin", "Bất kỳ tín hiệu nào có biên độ lớn hơn tín hiệu chính", "Một loại méo tín hiệu do thiết bị gây ra", "Tín hiệu có cùng tần số với tín hiệu cần truyền"],
    answer: 0,
  },
  {
    question: "Câu 9: Hệ thống truyền tin số có bao nhiêu khối chức năng chính?",
    options: ["5", "6", "7", "8"],
    answer: 2,
  },
  {
    question: "Câu 10: Một đặc trưng quan trọng của tín hiệu là:",
    options: ["Tần số", "Độ trễ", "Mật độ phổ công suất", "Năng lượng"],
    answer: 3,
  },
  {
    question: "Câu 11: Tin là gì?",
    options: ["Kết quả xử lý thông tin", "Dạng cụ thể của thông tin", "Một loại tín hiệu cao tần", "Dạng nhiễu trong hệ thống"],
    answer: 1,
  },
  {
    question: "Câu 12: Tác nhân nào sau đây không phải là chức năng của 'nhận tin'?",
    options: ["Ghi giữ tin", "Biểu thị tin", "Truyền lại tin", "Xử lý tin"],
    answer: 2,
  },
  {
    question: "Câu 13: Mục tiêu của lý thuyết thông tin là:",
    options: ["Giảm công suất của tín hiệu", "Tăng độ phức tạp hệ thống", "Cân bằng giữa tốc độ và độ tin cậy truyền tin", "Loại bỏ hoàn toàn tín hiệu nhiễu"],
    answer: 2,
  },
  {
    question: "Câu 14: Độ tin cậy của hệ thống truyền tin được đánh giá dựa trên:",
    options: ["Chi phí truyền tin", "BER (bit error rate)", "Tốc độ xử lý dữ liệu", "Nhiệt độ hệ thống"],
    answer: 1,
  },
  {
    question: "Câu 15: 'An toàn' trong truyền tin không bao gồm yếu tố nào sau đây?",
    options: ["Bí mật", "Tính toàn vẹn", "Chi phí", "Xác thực"],
    answer: 2,
  },
  {
    question: "Câu 16: Lý thuyết thông tin phát triển mạnh mẽ nhất vào thời kỳ nào?",
    options: ["Thế kỷ 19", "Đầu thế kỷ 20", "Giữa thế kỷ 20", "Cuối thế kỷ 20"],
    answer: 2,
  },
  {
    question: "Câu 17: Tác giả C.E. Shannon đã đưa ra định lý nổi tiếng về:",
    options: ["Tốc độ truyền tối đa", "Nhiễu trắng", "Điều chế biên độ", "Lưu lượng kênh truyền"],
    answer: 0,
  },
  {
    question: "Câu 18: Mã hoá trong truyền tin có vai trò gì?",
    options: ["Làm giảm độ tin cậy", "Làm tăng khả năng chống nhiễu", "Tăng độ phức tạp kênh", "Loại bỏ đường truyền"],
    answer: 1,
  },
  {
    question: "Câu 19: Một trong những đặc trưng của thông tin là:",
    options: ["Có thể tạo ra từ không gian", "Luôn được mã hóa", "Mang tính khách quan", "Không thể đo lường"],
    answer: 2,
  },
  {
    question: "Câu 20: Yếu tố nào không phải là chỉ tiêu chất lượng của hệ thống truyền tin?",
    options: ["Tính hữu hiệu", "Độ tin cậy", "An toàn", "Nhiệt độ môi trường"],
    answer: 3,
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
