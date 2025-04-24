import { useNavigate } from "react-router-dom";

const classes = [
    {
        title: 'Quản trị hệ thống mạng Windows Server MCSA',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
    {
        title: 'Chuyên gia mạng quốc tế CCNA Routing and Switching (phần mở rộng)',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
    {
        title: 'Chuyên gia mạng quốc tế CCNA Routing and Switching',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
    {
        title: 'Quản trị hệ thống mạng Windows Server MCSA',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
    {
        title: 'Chuyên gia mạng quốc tế CCNA Routing and Switching (phần mở rộng)',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
    {
        title: 'Chuyên gia mạng quốc tế CCNA Routing and Switching',
        progress: 0,
        image: 'https://d303ny97lru840.cloudfront.net/k-5cac6776ce4b14365029fdae/20190615-tungnk06150619/1513158860_mcsa_windows_serve.jpg',
    },
];

const ClassesPage = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6 min-h-screen container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Các lớp học đã tham gia</h1>
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
