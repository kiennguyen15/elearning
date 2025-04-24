import { useState } from "react";
import { jsPDF } from "jspdf";
import { format, parseISO } from "date-fns";

export default function ExamHistoryPage() {
  const [history] = useState([
    {
      name: "Nguyen Van Kien",
      courseName: "Comprehensive JavaScript course from basic to advanced",
      score: 17,
      totalQuestions: 20,
      date: "2025-04-25",
    },
    {
      name: "Nguyen Van Kien",
      courseName: "Introduction JavaScript",
      score: 7,
      totalQuestions: 10,
      date: "2025-04-18",
    },
  ]);

  const generatePDF = (exam: any) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Ảnh nền
    doc.addImage("/images/chung_nhan.jpg", "JPEG", 0, 0, 297, 210);

    const centerX = 297 / 2; // = 148.5

    // Title
    doc.setFont("Times", "bold")
      .setFontSize(25)
      .text("CERTIFICATE OF COMPLETION", centerX, 62, { align: "center" });

    // Subtitle
    doc.setFont("Times", "normal")
      .setFontSize(15)
      .text("This is to certify that", centerX, 90, { align: "center" });

    // Recipient Name
    doc.setFont("Times", "bold")
      .setFontSize(20)
      .text(exam.name, centerX, 105, { align: "center" });

    // Main body
    doc.setFont("Times", "normal")
      .setFontSize(15)
      .text(`Successfully obtained certificate in`, centerX, 140, { align: "center" });
    doc.setFont("Times", "bold")
      .setFontSize(18);
    const courseLines = doc.splitTextToSize(`${exam.courseName}`, 200); // 200 là chiều rộng tối đa
    doc.text(courseLines, centerX, 150, { align: "center" });
    // Issuer
    doc.setFont("Times", "italic")
      .setFontSize(12)
      .text("Company Elearning", centerX, 180, { align: "center" });

    doc.save(`${exam.name}_ChungNhan.pdf`);
  };

  return (
    <div className="mt-10 mx-20 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">📝 Lịch sử bài kiểm tra</h2>
      {history.length === 0 ? (
        <p className="text-center text-lg">Chưa có bài kiểm tra nào.</p>
      ) : (
        history.map((exam, index) => {
          const passed = exam.score >= exam.totalQuestions * 0.7;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg mb-6 transition-all hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">{exam.courseName}</h3>
                  <p className="text-lg">
                    Điểm: <span className="font-medium">{exam.score}/{exam.totalQuestions}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày: {format(parseISO(exam.date), "dd/MM/yyyy")}
                  </p>
                  <p className={`text-sm mt-1 ${passed ? "text-green-600" : "text-red-500"}`}>
                    {passed ? "✅ Bạn đã vượt qua!" : "❌ Chưa đạt, hãy thử lại!"}
                  </p>
                </div>

                {passed && (
                  <button
                    onClick={() => generatePDF(exam)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Tải chứng nhận
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
