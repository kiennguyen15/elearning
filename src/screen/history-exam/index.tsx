import { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { format, parseISO } from "date-fns";
import api from "../../utils/api";
import { AppContext } from "../../context/AppContext";

export default function ExamHistoryPage() {
  const { userInfo } = useContext(AppContext);
  const [examResult, setExamResult] = useState<any[]>([]);
  console.log(examResult);

  const fetchData = async () => {
    try {
      // Fetch exam results
      const examResponse = await api.get(`/exam_Results/getExamResults?page=1&limit=99999999`);
      const allExamResults = examResponse.data.data;
      const filteredExamResults = allExamResults.filter(
        (result: any) => result.uid === userInfo._id
      );

      if (filteredExamResults.length === 0) {
        setExamResult([]);
        return;
      }

      // Fetch course exams
      const courseResponse = await api.get(`course_Exams/getAllExamCourse?page=1&limit=99999999`);
      const allCourses = courseResponse.data.data;

      // Gắn tên course vào từng exam result
      const enrichedResults = filteredExamResults.map((exam: any) => {
        const course = allCourses.find((c: any) => c._id === exam.ceid);
        return {
          ...exam,
          courseName: course ? course.name : "Không tìm thấy khóa học",
        };
      });

      setExamResult(enrichedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {examResult.length === 0 ? (
        <p className="text-center text-lg">Chưa có bài kiểm tra nào.</p>
      ) : (
        examResult.map((exam, index) => {
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg mb-6 transition-all hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700">{exam?.InfoCoursesExam?.title}</h3>
                  <p className="text-lg">
                    Điểm: <span className="font-medium">{exam.score}/{exam.gradedAnswers.length}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày: {format(parseISO(exam.createdAt), "dd/MM/yyyy")}
                  </p>
                  <p className={`text-sm mt-1 ${exam.status === "PASSED" ? "text-green-600" : "text-red-500"}`}>
                    {exam.status === "PASSED" ? "✅ Bạn đã vượt qua!" : "❌ Chưa đạt, hãy thử lại!"}
                  </p>
                </div>

                {exam.status === "PASSED" && (
                  <button
                    onClick={() => generatePDF(exam)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
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
