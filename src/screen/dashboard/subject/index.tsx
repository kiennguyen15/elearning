import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';

interface Subject {
    _id?: string;
    cateId: string;
    name: string;
    title: string;
    desc: string;
    objectives: string;
    avatarUrl: string;
    bannerUrl: string;
    purpose: string;
    isActive: boolean;
}

export default function QLSubject() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Subject>({
        cateId: '681b1af5c17fc1c849a4fdf1',
        name: '',
        title: '',
        desc: '',
        objectives: '',
        avatarUrl: '',
        bannerUrl: '',
        purpose: '',
        isActive: true
    });
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const fetchCources = async () => {
        try {
            const response = await api.get(`course/getCourses`);
            setSubjects(response.data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    useEffect(() => {
        fetchCources();
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (editingId) {
                await api.put(`course/updateCourse?id=${editingId}`, form);
            } else {
                await api.post("course/createCourse", form);
            }
            fetchCources();
            setShowForm(false);
        } catch (error) {
            console.error("Error saving subject", error);
        }
    };

    const handleEdit = (subject: Subject, id: string) => {
        setShowForm(true);
        setEditingId(id); // Lưu ID để cập nhật
        setForm({
            cateId: subject.cateId,
            name: subject.name,
            title: subject.title,
            desc: subject.desc,
            objectives: subject.objectives,
            avatarUrl: subject.avatarUrl,
            bannerUrl: subject.bannerUrl,
            purpose: subject.purpose,
            isActive: subject.isActive,
        });
    };
    const handleDelete = (id: string) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa môn này không?');
        if (confirmed) {
            try {
                api.delete(`user_Course/deleteUserInCourse?id=${id}`);
                fetchCources();
            } catch (error) {
                console.error("Error deleting subject", error);
            }
        }
    };


    return (
        <div className="mx-auto p-6 space-y-6 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý Môn học</h1>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingId(null);
                        setForm({
                            cateId: '681b1af5c17fc1c849a4fdf1',
                            name: '',
                            title: '',
                            desc: '',
                            objectives: '',
                            avatarUrl: '',
                            bannerUrl: '',
                            purpose: '',
                            isActive: true
                        });
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
                        <h2 className="text-lg font-semibold mb-4">
                            {editingId !== null ? 'Cập nhật môn học' : 'Thêm môn học mới'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                placeholder="Tên môn học"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleInputChange}
                                placeholder="Tiêu đề"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <textarea
                                name="desc"
                                value={form.desc}
                                onChange={handleInputChange}
                                placeholder="Mô tả"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <textarea
                                name="objectives"
                                value={form.objectives}
                                onChange={handleInputChange}
                                placeholder="Mục tiêu"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <input
                                name="avatarUrl"
                                value={form.avatarUrl}
                                onChange={handleInputChange}
                                placeholder="Ảnh đại diện (URL)"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <input
                                name="bannerUrl"
                                value={form.bannerUrl}
                                onChange={handleInputChange}
                                placeholder="Ảnh banner (URL)"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <textarea
                                name="purpose"
                                value={form.purpose}
                                onChange={handleInputChange}
                                placeholder="Mục đích"
                                className="w-full border p-2 rounded mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 border rounded text-gray-700"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List of Subjects */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Danh sách môn học</h2>
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border text-center">STT</th>
                            <th className="p-2 border">Tên môn</th>
                            <th className="p-2 border">Tiêu đề</th>
                            <th className="p-2 border">Mô tả</th>
                            <th className="p-2 border">Mục tiêu</th>
                            <th className="p-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((s, index) => (
                            <tr key={index}>
                                <td className="p-2 border text-center">{index + 1}</td>
                                <td className="p-2 border">{s.name}</td>
                                <td className="p-2 border">{s.title}</td>
                                <td className="p-2 border">{s.desc}</td>
                                <td className="p-2 border">{s.objectives}</td>
                                {/* <td className="p-2 border">{s.chapters.join(', ')}</td> */}
                                <td className="p-2 border space-x-3 text-center">
                                    <button
                                        onClick={() => handleEdit(s, s._id as string)}
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
        </div >
    );
}
