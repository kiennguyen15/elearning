import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface Student {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export default function QLCustomer() {
    const [students, setStudents] = useState<Student[]>([]);
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openAddModal = () => {
        setForm({ name: '', phone: '', email: '' });
        setEditingId(null);
        setIsFormModalOpen(true);
    };

    const handleSubmit = () => {
        if (editingId !== null) {
            setStudents(prev =>
                prev.map(s => (s.id === editingId ? { ...s, ...form } : s))
            );
        } else {
            setStudents(prev => [...prev, { id: Date.now(), ...form }]);
        }
        setForm({ name: '', phone: '', email: '' });
        setEditingId(null);
        setIsFormModalOpen(false);
    };

    const handleEdit = (student: Student) => {
        setForm({ name: student.name, phone: student.phone, email: student.email });
        setEditingId(student.id);
        setIsFormModalOpen(true);
    };

    const handleDelete = (id: number) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');
        if (confirmed) {
            setStudents(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleDetail = (student: Student) => {
        setSelectedStudent(student);
        setIsDetailModalOpen(true);
    };

    return (
        <div className=" mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý Tài khoản Sinh viên</h1>
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Thêm sinh viên
                </button>
            </div>

            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Danh sách sinh viên</h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Họ tên</th>
                            <th className="p-2 border">SĐT</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.id}>
                                <td className="p-2 border">{s.name}</td>
                                <td className="p-2 border">{s.phone}</td>
                                <td className="p-2 border">{s.email}</td>
                                <td className="p-2 border space-x-3 text-center">
                                    <button onClick={() => handleDetail(s)} className="text-blue-600 hover:text-blue-800">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
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

            {/* Form Modal */}
            {isFormModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingId !== null ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}
                        </h2>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="Họ tên"
                            className="w-full border p-2 rounded mb-2"
                        />
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            placeholder="Số điện thoại"
                            className="w-full border p-2 rounded mb-2"
                        />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full border p-2 rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsFormModalOpen(false)}
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

            {isDetailModalOpen && selectedStudent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Thông tin chi tiết</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-semibold">👤 Họ tên:</span> {selectedStudent.name}</p>
                            <p><span className="font-semibold">📞 Số điện thoại:</span> {selectedStudent.phone}</p>
                            <p><span className="font-semibold">📧 Email:</span> {selectedStudent.email}</p>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
