import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(value => [Math.random(), value] as [number, T])
        .sort((a: [number, T], b: [number, T]) => a[0] - b[0])
        .map(([, value]) => value);
}

interface CourseExams {
    cid?: string;
    title: string;
    percentAnswer: number;
    direct: boolean;
    type: string;
    availableFrom: string;
    availableTo: string;
}

export default function QLExams() {
    const [numQuestions, setNumQuestions] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showExamQuestion, setShowExamQuestion] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [examQuestions, setExamQuestions] = useState<any[]>([]);

    const [courseExams, setCourseExams] = useState<any[]>([]);
    const [questionBank, setQuestionBank] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [form, setForm] = useState<Partial<CourseExams>>({
        cid: '',
        title: '',
        percentAnswer: 0,
        direct: true,
        type: 'CERTIFICATION_EXAM',
        availableFrom: '',
        availableTo: '',
    });

    const fetchCourseExams = async () => {
        try {
            const response = await api.get(`course_Exams/getAllExamCourse?page=${1}&limit=${99999999}`);
            setCourseExams(response.data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    const fetchQuizzs = async () => {
        try {
            const response = await api.get(`quizzes/getByCondition?page=${1}&limit=${99999999}`);
            setQuestionBank(response.data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    const fetchCourses = async () => {
        try {
            const response = await api.get(`course/getCourses?page=${1}&limit=${99999999}`);
            setCourses(response.data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    useEffect(() => {
        fetchCourseExams();
        fetchQuizzs();
        fetchCourses();
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`course_Exams/update?id=${editingId}`, form);
            } else {
                await api.post("course_Exams/create", form);
            }
        } catch (error) {
            console.error("Error saving subject", error);
        }
        fetchCourseExams();
        setShowForm(false);
        setForm({
            cid: '',
            title: '',
            percentAnswer: 0,
            direct: true,
            type: 'CERTIFICATION_EXAM',
            availableFrom: '',
            availableTo: '',
        });
    }
    const handleEdit = async (id: string) => {
        const exam = courseExams.find(item => item._id === id);
        if (exam) {
            setForm({
                cid: exam.cid,
                title: exam.title,
                percentAnswer: exam.percentAnswer,
                direct: exam.direct,
                type: exam.type,
                availableFrom: exam.availableFrom?.split('T')[0], // YYYY-MM-DD
                availableTo: exam.availableTo,
            });
            setEditingId(id);
            setShowForm(true);
        }
    };
    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xoá đề thi này không?');
        if (!confirmed) return;
        try {
            await api.delete(`course_Exams/delete?id=${id}`);
            fetchCourseExams();
        } catch (error) {
            console.error("Error saving subject", error);
        }
    }
    const handleShowQuestion = (id: string) => {
        setEditingId(id);
        setShowExamQuestion(true);
    };

    useEffect(() => {
        const fetchExamQuestions = async () => {
            if (!editingId) return;

            try {
                const response = await api.get(`exams_Questions/get-by-exam?ceid=${editingId}`);
                setExamQuestions(response.data[0]?.questions || []);
            } catch (error) {
                console.error("Error fetching exam questions:", error);
            }
        };

        if (showExamQuestion && editingId) {
            fetchExamQuestions();
        }
    }, [showExamQuestion, editingId]);

    const handleAddQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingId) {
            alert("Vui lòng chọn đề thi trước khi thêm câu hỏi.");
            return;
        }

        if (numQuestions > questionBank.length) {
            alert("Số câu hỏi vượt quá số lượng trong ngân hàng câu hỏi.");
            return;
        }

        const randomQuestions = shuffleArray(questionBank).slice(0, numQuestions);
        const payload = {
            data: randomQuestions.map(q => ({
                ceid: editingId,
                qid: q._id
            }))
        };

        try {
            await api.post('exams_Questions/create-many', payload);
            fetchCourseExams();
        } catch (error) {
            console.error("Lỗi khi tạo bộ đề", error);
        }

        setShowExamQuestion(false);
    };

    return (
        <div className="mx-auto p-6 space-y-6 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Đề thi</h1>
                <div className='mx-2'>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-2"
                    >
                        Thêm đề thi
                    </button>
                </div>
            </div>

            {courseExams.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Danh sách đề thi</h2>
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border text-center">STT</th>
                                <th className="p-2 border">Môn học</th>
                                <th className="p-2 border">Tiêu đề</th>
                                <th className="p-2 border">% Đạt</th>
                                <th className="p-2 border">Thời gian mở</th>
                                <th className="p-2 border">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseExams.map((s, index) => (
                                <tr key={index}>
                                    <td className="p-2 border text-center">{index + 1}</td>
                                    <td className="p-2 border">{s.InfoCourses[0].name}</td>
                                    <td className="p-2 border">{s.title}</td>
                                    <td className="p-2 border text-center">{s.percentAnswer} %</td>
                                    <td className="p-2 border text-center">
                                        {new Date(s.availableFrom).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="p-2 border space-x-3 text-center">
                                        <button
                                            onClick={() => handleShowQuestion(s._id as string)}
                                            className="text-green-600 hover:text-green-800">
                                            <FontAwesomeIcon icon={faListAlt} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(s._id as string)}
                                            className="text-yellow-600 hover:text-yellow-800">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s._id as string)}
                                            className="text-red-600 hover:text-red-800">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white relative shadow-lg rounded p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-center w-full">Tạo đề thi</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div>
                                    <label className="block font-semibold mb-1">Chọn môn học:</label>
                                    <select
                                        className="border p-2 rounded-md w-full"
                                        onChange={(e) => setForm({ ...form, cid: e.target.value })}
                                        value={form.cid}
                                    >
                                        <option value="">-- Chọn môn học --</option>
                                        {courses.map((course: any) => (
                                            <option key={course._id} value={course._id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Tiêu đề:</label>
                                    <input
                                        type="text"
                                        name='title'
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="border p-2 rounded-md w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Phần trăm đạt/ Tổng số câu: (%)</label>
                                    <input
                                        type="number"
                                        name='percentAnswer'
                                        value={form.percentAnswer}
                                        onChange={(e) => setForm({ ...form, percentAnswer: Number(e.target.value) })}
                                        className="border p-2 rounded-md w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Thời gian mở bài thi:</label>
                                    <input
                                        type="date"
                                        name="availableFrom"
                                        value={form.availableFrom}
                                        onChange={(e) => {
                                            const selectedDate = e.target.value;
                                            const availableToDate = new Date(selectedDate);
                                            availableToDate.setHours(23, 59, 0, 0); // 23:59:00.000
                                            setForm({
                                                ...form,
                                                availableFrom: selectedDate,
                                                availableTo: availableToDate.toISOString(), // convert to ISO string
                                            });
                                        }}
                                        className="border p-2 rounded-md w-full mb-2"
                                    />
                                    <label className='text-red-500 italic '>Thời gian kết thúc mặc định là cuối ngày mở bài</label>
                                </div>

                                <button
                                    type='submit'
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                                >
                                    Tạo đề thi
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            )}
            {showExamQuestion && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white relative shadow-lg rounded p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-center w-full">{examQuestions?.length > 0 ? 'Chi tiết bộ đề thi' : "Thêm bộ đề thi"}</h2>
                            <button
                                onClick={() => setShowExamQuestion(false)}
                                className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {/* Kiểm tra nếu đã tồn tại ceid === editId thì chỉ hiển thị danh sách */}
                        {examQuestions?.length > 0 ? (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Danh sách câu hỏi:</h3>
                                <div className="max-h-64 overflow-y-auto pr-2"> {/* <-- Thêm giới hạn chiều cao và scroll */}
                                    <ul className="list-inside space-y-1">
                                        {examQuestions.map((question, index) => (
                                            <li key={index}>
                                                {index + 1}. {question?.questionText || 'Không có tiêu đề'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <>
                                <form onSubmit={handleAddQuestion}>
                                    <div>
                                        <label className="block font-semibold mb-1">Số câu hỏi mỗi đề:</label>
                                        <input
                                            type="number"
                                            value={numQuestions}
                                            onChange={(e) => setNumQuestions(Number(e.target.value))}
                                            className="border p-2 rounded-md w-full"
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 w-full"
                                    >
                                        Tạo bộ đề
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
