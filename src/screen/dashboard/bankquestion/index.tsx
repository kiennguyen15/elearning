import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

export default function QLBankQuestion() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);
  const [bulkQuestions, setBulkQuestions] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]); // 👈 mới thêm

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const addAnswerField = () => {
    setAnswers([...answers, '']);
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // const reader = new FileReader();
    // reader.onload = (evt) => {
    //   const data = new Uint8Array(evt.target?.result as ArrayBuffer);
    //   const workbook = XLSX.read(data, { type: 'array' });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    //   const importedQuestions = parsed.slice(1); // skip header
    //   setBulkQuestions(importedQuestions);
    //   setAllQuestions(prev => [...prev, ...importedQuestions]); // 👈 thêm vào danh sách chung
    // };
    // reader.readAsArrayBuffer(file);
  };

  const handleManualSubmit = () => {
    if (!question.trim()) return;

    const newEntry = [question, ...answers.filter(ans => ans.trim() !== '')];
    setAllQuestions(prev => [...prev, newEntry]);
    setQuestion('');
    setAnswers(['', '']);
  };

  return (
    <div className="mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Quản lý Ngân hàng Câu hỏi</h1>

      {/* Tạo câu hỏi thủ công */}
      <div className="bg-white shadow-md rounded-md p-4 space-y-4 ">
        <h2 className="text-lg font-semibold">Tạo câu hỏi thủ công</h2>
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          placeholder="Nhập nội dung câu hỏi"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="space-y-2">
          {answers.map((ans, index) => (
            <input
              key={index}
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder={`Đáp án ${index + 1}`}
              value={ans}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ))}
        </div>
        <button
          onClick={addAnswerField}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          + Thêm đáp án
        </button>
        <button
          onClick={handleManualSubmit}
          className="ml-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Lưu câu hỏi
        </button>
      </div>

      {/* Nhập câu hỏi từ file Excel */}
      <div className="bg-white shadow-md rounded-md p-4 space-y-4">
        <h2 className="text-lg font-semibold">Nhập hàng loạt từ Excel</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className="border p-2 rounded-md"
        />
        {bulkQuestions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Danh sách câu hỏi đã nhập từ Excel:</h3>
            <ul className="list-disc pl-5 space-y-1 max-h-60 overflow-y-auto">
              {bulkQuestions.map((row, idx) => (
                <li key={idx}>
                  <strong>{row[0]}</strong> – Đáp án: {row.slice(1).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hiển thị tất cả câu hỏi đã thêm */}
      {allQuestions.length > 0 && (
        <div className="bg-white shadow-md rounded-md p-4 space-y-4">
          <h2 className="text-lg font-semibold">Tất cả câu hỏi đã thêm</h2>
          <ul className="list-decimal pl-5 space-y-1 max-h-80 overflow-y-auto">
            {allQuestions.map((row, idx) => (
              <li key={idx}>
                <strong>{row[0]}</strong> – Đáp án: {row.slice(1).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
