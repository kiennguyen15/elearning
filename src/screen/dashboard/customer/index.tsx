import { faEdit, faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../../utils/api';

interface Student {
    fullname: string;
    phone: string;
    email: string;
    code: string;
    password: string;
    role: any[];
    status: string;
}

export default function QLCustomer() {
    const [students, setStudents] = useState<any[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<Student>({
        fullname: '',
        phone: '',
        email: '',
        code: '',
        password: '',
        role: [],
        status: 'ACTIVE',
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const handleClickShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);
    const fetchCustomers = async () => {
        try {
            const response = await api.get(`users/getUserByQuery?page=${1}&limit=${99999999}&status=ACTIVE`);
            setStudents(response.data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setForm(prev => ({ ...prev, role: [value] })); // Chuyển thành mảng
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const openAddModal = () => {
        setForm({ fullname: '', phone: '', email: '', code: '', password: '', role: [], status: 'ACTIVE' });
        setEditingId(null);
        setIsFormModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as any;
        const customerData: Partial<Student> = {
            fullname: form.fullname.value,
            phone: form.phone.value,
            code: form.code.value,
            password: form.password.value,
        };

        try {
            if (editingId) {
                await api.put(`users/updateMyInfo?id=${editingId}`, customerData);
            } else {
                // Nếu tạo mới, thêm password
                await api.post("users/createUser", {
                    ...customerData
                });
            }
            fetchCustomers();
        } catch (error) {
            console.error("Error saving customer", error);
        }
    };

    const handleDelete = (id: number) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này không?');
        if (confirmed) {
            try {
                api.delete(`users/lockUser?uid=${id}`);
                fetchCustomers();
            } catch (error) {
                console.error("Error deleting customer", error);
            }
        }
    };

    const handleDetail = (student: Student) => {
        setSelectedStudent(student);
        setIsDetailModalOpen(true);
    };
    const getRoleDisplay = (role: string) => {
        switch (role) {
            case 'STUDENT':
                return { label: 'Sinh viên', bg: 'bg-blue-100 text-blue-800' };
            case 'INSTRUCTOR':
                return { label: 'Giảng viên', bg: 'bg-green-100 text-green-800' };
            case 'ADMIN':
                return { label: 'Quản trị viên', bg: 'bg-red-100 text-red-800' };
            default:
                return { label: role, bg: 'bg-gray-100 text-gray-800' };
        }
    };
    return (
        <div className=" mx-auto p-6 space-y-6 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý Sinh viên</h1>
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
                            <th className="p-2 border">STT</th>
                            <th className="p-2 border">Họ tên</th>
                            <th className="p-2 border">SĐT</th>
                            <th className="p-2 border">Phân quyền</th>
                            <th className="p-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, index) => (
                            <tr key={index}>
                                <td className="p-2 border text-center">{index + 1}</td>
                                <td className="p-2 border">{s.fullname}</td>
                                <td className="p-2 border">{s.phone}</td>
                                <td className="p-2 border text-center">
                                    {s.role.map((r: string, idx: number) => {
                                        const { label, bg } = getRoleDisplay(r);
                                        return (
                                            <span
                                                key={idx}
                                                className={`inline-block px-2 py-1 text-sm font-medium rounded ${bg} mr-1`}
                                            >
                                                {label}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td className="p-2 border space-x-4 text-center">
                                    <button onClick={() => handleDetail(s)} className="text-blue-600 hover:text-blue-800">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button
                                        // onClick={() => handleEdit(s)} 
                                        className="text-yellow-600 hover:text-yellow-800">
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
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingId !== null ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}
                        </h2>
                        <input name="fullname" value={form.fullname} onChange={handleInputChange} placeholder="Họ tên" className="w-full border p-2 rounded mb-2" />
                        <input
                            name="phone"
                            value={form?.phone || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                    handleInputChange(e);
                                }
                            }}
                            placeholder="Số điện thoại"
                            className="w-full border p-2 rounded mb-2"
                            inputMode="numeric"
                            maxLength={10}
                        />
                        <input name="email" value={form.email || ''} onChange={handleInputChange} placeholder="Email" className="w-full border p-2 rounded mb-2" />
                        <input name="code" value={form.code} onChange={handleInputChange} placeholder="Mã định danh" className="w-full border p-2 rounded mb-2" />
                        <div className="relative mb-2">
                            <input
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleInputChange}
                                placeholder="Mật khẩu"
                                type={showPassword ? "text" : "password"}
                                className="w-full border p-2 pr-10 rounded outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                                style={{
                                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleClickShowPassword}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                style={{ transition: 'color 0.15s ease' }}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className="w-5 h-5"
                                />
                            </button>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-4 py-2 border rounded text-gray-700">
                                Hủy
                            </button>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            )
            }

            {
                isDetailModalOpen && selectedStudent && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 text-center">Thông tin chi tiết</h2>
                            <div className="space-y-2 text-gray-700">
                                <p><span className="font-semibold">👤 Họ tên:</span> {selectedStudent.fullname}</p>
                                <p><span className="font-semibold">📞 Số điện thoại:</span> {selectedStudent.phone}</p>
                                <p><span className="font-semibold">📧 Phân quyền: </span>
                                    {selectedStudent.role.map((r: string, idx: number) => {
                                        const { label, bg } = getRoleDisplay(r);
                                        return (
                                            <span
                                                key={idx}
                                                className={`inline-block px-2 py-1 text-sm font-medium rounded ${bg} mr-1`}
                                            >
                                                {label}
                                            </span>
                                        );
                                    })}</p>
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
                )
            }

        </div >
    );
}
