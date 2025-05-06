import React, { useState } from 'react';

// Giả lập ngân hàng câu hỏi (bạn có thể import từ component khác hoặc lưu global)
const questionBank = [
    ['Câu 1', 'A1', 'A2', 'A3'],
    ['Câu 2', 'B1', 'B2'],
    ['Câu 3', 'C1', 'C2'],
    ['Câu 4', 'D1', 'D2', 'D3'],
    ['Câu 5', 'E1', 'E2'],
    ['Câu 6', 'F1', 'F2'],
    ['Câu 7', 'G1', 'G2'],
    ['Câu 8', 'H1', 'H2'],
    ['Câu 9', 'I1', 'I2'],
    ['Câu 10', 'J1', 'J2'],
];

function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(value => [Math.random(), value] as [number, T])
        .sort((a: [number, T], b: [number, T]) => a[0] - b[0])
        .map(([, value]) => value);
}


export default function QLExams() {
    const [numQuestions, setNumQuestions] = useState(5);
    const [numExams, setNumExams] = useState(3);
    const [examSets, setExamSets] = useState<any[][]>([]);

    const generateExams = () => {
        if (numQuestions > questionBank.length) {
            alert("Số câu hỏi mỗi đề vượt quá ngân hàng câu hỏi.");
            return;
        }

        const exams = Array.from({ length: numExams }, () =>
            shuffleArray(questionBank).slice(0, numQuestions)
        );
        setExamSets(exams);
    };

    return (
        <div className="mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Đề thi</h1>

            <div className="bg-white shadow-md rounded-md p-4 space-y-4">
                <div className="space-y-2">
                    <div>
                        <label className="block font-semibold mb-1">Số câu hỏi mỗi đề:</label>
                        <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                            className="border p-2 rounded-md w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Số lượng bộ đề:</label>
                        <input
                            type="number"
                            value={numExams}
                            onChange={(e) => setNumExams(Number(e.target.value))}
                            className="border p-2 rounded-md w-full"
                        />
                    </div>

                    <button
                        onClick={generateExams}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Tạo đề thi
                    </button>
                </div>
            </div>

            {examSets.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Danh sách bộ đề thi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {examSets.map((exam, i) => (
                            <div key={i} className="bg-white shadow rounded-md p-4 space-y-2">
                                <h3 className="font-semibold text-gray-700">Bộ đề số {i + 1}</h3>
                                <ul className="list-decimal pl-5 space-y-1">
                                    {exam.map((q, j) => (
                                        <li key={j}>
                                            <strong>{q[0]}</strong> – Đáp án: {q.slice(1).join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
