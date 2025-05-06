import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface Subject {
    id: number;
    name: string;
    teacher: string;
    studentCount: number;
    chapters: string[];
}

export default function QLSubject() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', teacher: '', studentCount: '', chapters: '' });
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { name, teacher, studentCount, chapters } = form;
        const parsedChapters = chapters.split(',').map(chapter => chapter.trim());

        if (editingId !== null) {
            setSubjects(prev =>
                prev.map(s => (s.id === editingId ? { ...s, name, teacher, studentCount: parseInt(studentCount), chapters: parsedChapters } : s))
            );
        } else {
            setSubjects(prev => [
                ...prev,
                {
                    id: Date.now(),
                    name,
                    teacher,
                    studentCount: parseInt(studentCount),
                    chapters: parsedChapters
                }
            ]);
        }
        setForm({ name: '', teacher: '', studentCount: '', chapters: '' });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (subject: Subject) => {
        setForm({
            name: subject.name,
            teacher: subject.teacher,
            studentCount: subject.studentCount.toString(),
            chapters: subject.chapters.join(', ')
        });
        setEditingId(subject.id);
        setShowForm(true);
    };
    const handleDelete = (id: number) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa môn này không?');
        if (confirmed) {
            setSubjects(prev => prev.filter(s => s.id !== id));
        }
    };


    return (
        <div className="mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý Môn học</h1>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingId(null);
                        setForm({ name: '', teacher: '', studentCount: '', chapters: '' });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Thêm môn học
                </button>
            </div>

            {/* Form Popup */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white shadow-lg rounded p-6 w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">{editingId !== null ? 'Cập nhật môn học' : 'Thêm môn học mới'}</h2>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Tên môn học"
                            className="w-full border p-2 rounded mb-4"
                        />
                        <input
                            name="teacher"
                            value={form.teacher}
                            onChange={handleInputChange}
                            placeholder="Giáo viên"
                            className="w-full border p-2 rounded mb-4"
                        />
                        <input
                            name="studentCount"
                            value={form.studentCount}
                            onChange={handleInputChange}
                            placeholder="Số lượng sinh viên"
                            className="w-full border p-2 rounded mb-4"
                            type="number"
                        />
                        <textarea
                            name="chapters"
                            value={form.chapters}
                            onChange={handleInputChange}
                            placeholder="Các chương (cách nhau bằng dấu phẩy)"
                            className="w-full border p-2 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 border rounded text-gray-700"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* List of Subjects */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Danh sách môn học</h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Tên môn</th>
                            <th className="p-2 border">Giáo viên</th>
                            <th className="p-2 border">Số lượng sinh viên</th>
                            <th className="p-2 border">Chương</th>
                            <th className="p-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(s => (
                            <tr key={s.id}>
                                <td className="p-2 border">{s.name}</td>
                                <td className="p-2 border">{s.teacher}</td>
                                <td className="p-2 border">{s.studentCount}</td>
                                <td className="p-2 border">{s.chapters.join(', ')}</td>
                                <td className="p-2 border space-x-3 text-center">
                                    <button onClick={() => handleEdit(s)} className="text-yellow-600 hover:text-yellow-800">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
