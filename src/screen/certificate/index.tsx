import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
const CertificatePage = ({ score, totalQuestions }: { score: number, totalQuestions: number }) => {
  const passingScore = totalQuestions * 0.7;
  const [certificateIssued, setCertificateIssued] = useState(true);

  const handleIssueCertificate = () => {
    if (score >= passingScore) {
      setCertificateIssued(true);
    }
  };

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
      .text(exam.name || "Nguyen Van Kien", centerX, 105, { align: "center" });

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

    doc.save(`${exam.name ? exam.name : "Nguyen Van Kien"}_ChungNhan.pdf`);
  };



  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">
        🎉 Chúc mừng! Bạn đã đạt {score}/{totalQuestions} điểm.
      </h2>

      {score >= passingScore ? (
        <>
          {certificateIssued && (
            <div className="mt-8">
              <h3 className="text-xl font-bold">🎓 Đã cấp chứng nhận!</h3>
              <p className="mb-6">Dưới đây là bản xem trước chứng nhận. Bạn có thể tải về.</p>

              <div className="mb-8 mx-auto w-fit border rounded-lg shadow-lg">
                <div
                  className="relative w-[600px] h-[400px]"
                  style={{
                    backgroundImage: `url('https://png.pngtree.com/background/20210706/original/pngtree-red-border-certificate-background-material-picture-image_155377.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Chứng Nhận Hoàn Thành</h1>
                    <p className="text-sm mb-1">Chứng nhận rằng</p>
                    <h2 className="text-lg font-semibold text-blue-700 mb-1">Nguyễn Văn Kiên</h2>
                    <p className="text-sm mb-3">
                      đã hoàn thành bài kiểm tra với số điểm{" "}
                      <strong>{score}/{totalQuestions}</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Ngày: {new Date().toLocaleDateString("vi-VN")}
                    </p>
                    <p className="mt-4 text-xs italic">Chữ ký Giảng viên</p>
                  </div>
                </div>
              </div>

              <button
                onClick={generatePDF}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Tải Chứng Nhận (PDF)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="mt-4 text-lg text-red-600">
          Rất tiếc, bạn chưa đạt yêu cầu. Hãy cố gắng lần sau nhé!
        </p>
      )}
    </div>
  );
};

export default CertificatePage;
