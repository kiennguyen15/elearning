import { useNavigate } from "react-router-dom";

const classes = [
    {
        title: 'Chương 1. Những vấn để chung và những khái niệm cơ bản',
        progress: 0,
        image: 'https://tuyensinh.uit.edu.vn/sites/default/files/uploads/images/201803/31-12-2017-cong-bo-10-su-kien-cong-nghe-thong-tin-truyen-thong-tieu-bieu-nam-2017-22904cea-details.jpg',
    },
    {
        title: 'Chương 2. Tín hiệu và nhiễu',
        progress: 0,
        image: 'https://thptchuyensonla.edu.vn/wp-content/uploads/2020/06/nganh-it-o-viet-nam-wallpaper.jpg',
    },
    {
        title: 'Chương 3. Cơ sở lý thuyết thông tin thống kê',
        progress: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmrGAs47hPpD1NobCYAMA797nXErKYRP1mw&s',
    },
    {
        title: 'Chương 4. Cơ sở lý thuyết mã hoá',
        progress: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Oqyti_vOHzKVeucxlX4jsPwwT1bDWn0zcA&s',
    },
    {
        title: 'Chương 5: Lý thuyết thu tối ưu',
        progress: 0,
        image: 'https://funix.edu.vn/wp-content/uploads/2022/04/data-charts-man-601834022.jpg',
    },
    {
        title: 'Chương 6. Mật mã',
        progress: 0,
        image: 'https://ant.ncc.asia/wp-content/uploads/2023/06/image-143.png',
    },
];

const ClassesPage = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6 min-h-screen container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Các lớp Lý thuyết thông tin đã tham gia</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((cls, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-4 cursor-pointer" onClick={() => navigate(`/chi-tiet-khoa-hoc`)}>
                        <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold">{cls.title}</h2>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-1">Tiến độ của bạn</p>
                            <div className="w-full bg-gray-200 h-3 rounded-full">
                                <div
                                    className="bg-blue-600 h-3 rounded-full"
                                    style={{ width: `${cls.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-sm mt-1">{cls.progress}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;
