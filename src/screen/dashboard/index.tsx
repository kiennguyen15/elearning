import React, { useEffect, useState } from 'react';

interface ExamResult {
  subject: string;
  totalExams: number;
  averageScore: number;
  passed: number;
  failed: number;
}

export default function Dashboard() {
  const [totalExams, setTotalExams] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const examData: ExamResult[] = [
      {
        subject: 'Lý thuyết thông tin',
        totalExams: 60,
        averageScore: 7.2,
        passed: 48,
        failed: 12,
      },
      {
        subject: 'Lập trình ứng dụng',
        totalExams: 55,
        averageScore: 6.5,
        passed: 42,
        failed: 13,
      },
      {
        subject: 'Lập trình di động',
        totalExams: 50,
        averageScore: 7.8,
        passed: 45,
        failed: 5,
      },
    ];

    setExamResults(examData);
    setTotalExams(examData.reduce((acc, cur) => acc + cur.totalExams, 0));
    setTotalStudents(120);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Trang Chủ Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Tổng Bài Thi</h3>
          <p className="text-3xl font-bold text-blue-600">{totalExams}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Tổng Sinh Viên</h3>
          <p className="text-3xl font-bold text-green-600">{totalStudents}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Số liệu thống kê</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Môn học</th>
              <th className="py-3 px-5 text-center">Số bài thi</th>
              <th className="py-3 px-5 text-center">Điểm TB</th>
              <th className="py-3 px-5 text-center">Đạt</th>
              <th className="py-3 px-5 text-center">Không đạt</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((result, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="py-3 px-5">{result.subject}</td>
                <td className="py-3 px-5 text-center">{result.totalExams}</td>
                <td className="py-3 px-5 text-center">{result.averageScore}</td>
                <td className="py-3 px-5 text-center text-green-600 font-semibold">{result.passed}</td>
                <td className="py-3 px-5 text-center text-red-500 font-semibold">{result.failed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
