import { useState } from "react";
import { Link } from "react-router-dom";

// Dữ liệu giả
const course = {
  title: "Khóa Học JavaScript Toàn Diện Từ Cơ Bản Đến Nâng Cao",
  instructor: "Nguyễn Huy Hoàng",
  rating: 4.8,
  enrolled: 1200,
  lastUpdated: "04/2025",
  hours: 3.2,
  students: 12140,
  description:
    "Khóa học cung cấp nền tảng vững chắc về JavaScript, từ những kiến thức cơ bản đến kỹ thuật nâng cao, giúp bạn tự tin xây dựng các ứng dụng web hiện đại...",
  learning: [
    "Cài đặt môi trường lập trình",
    "Thực hành HTML nâng cao",
    "Xây dựng Website Portfolio",
    "Thiết kế giao diện Responsive",
    "Hiểu rõ lập trình HTML",
    "Viết mã HTML hiệu quả",
    "Bắt đầu xây dựng các website đẹp mắt",
  ],
  requirements: [
    "Máy tính bất kỳ: Windows, macOS hoặc Linux",
    "Kiến thức cơ bản về HTML và CSS",
    "Hiểu biết cơ bản/tối thiểu về JavaScript",
  ],
  curriculum: [
    {
      sectionTitle: "Giới thiệu về HTML",
      lectures: [
        { title: "Giới thiệu", duration: "4 phút" },
        { title: "HTML là gì?", duration: "5 phút" },
        { title: "Trang web là gì?", duration: "8 phút" },
        { title: "Tạo trang web đầu tiên", duration: "4 phút", preview: true },
        { title: "Đố vui nhanh", duration: "5 phút" },
      ],
    },
    {
      sectionTitle: "Trang Web Đầu Tiên Của Bạn",
      lectures: [
        { title: "Tạo tệp đầu tiên", duration: "7 phút" },
        { title: "Liên kết CSS", duration: "5 phút" },
        { title: "Thêm hình ảnh", duration: "6 phút", preview: true },
      ],
    },
  ],
};

const CurriculumSection = ({ section }: { section: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 font-semibold bg-gray-100 hover:bg-gray-200"
      >
        {section.sectionTitle}
      </button>
      {open && (
        <ul className="px-4 py-2">
          {section.lectures.map((lec: any, index: any) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2 text-sm"
            >
              <span>
                {lec.title}
                {lec.preview && (
                  <span className="text-blue-600 font-medium ml-2">Xem thử</span>
                )}
              </span>
              <span className="text-gray-500">{lec.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function CourseDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Nội dung chính */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-gray-600">
            Tạo bởi <span className="font-medium">{course.instructor}</span> • Cập nhật lần cuối {course.lastUpdated}
          </p>
          <p className="text-yellow-500 mt-1">
            ⭐ {course.rating} • {course.enrolled} người đã đăng ký
          </p>
        </div>

        {/* Mô tả */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Mô tả khóa học</h2>
          <p className="text-gray-700">{course.description}</p>
        </div>

        {/* Bạn sẽ học được gì */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Bạn sẽ học được gì</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-5">
            {course.learning.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Yêu cầu đầu vào */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Yêu cầu đầu vào</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {course.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Chương trình học */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Nội dung khóa học</h2>
          {course.curriculum.map((section, index) => (
            <CurriculumSection key={index} section={section} />
          ))}
        </div>
      </div>

      {/* Thanh bên */}
      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="text-center">
            <img
              src="https://letdiv.com/wp-content/uploads/2024/04/khoa-hoc-html-css.jpg"
              alt="Xem trước khóa học"
              className="rounded-md mb-4"
            />
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>{course.hours}</strong> Giờ học</p>
            <p><strong>{course.students}</strong> Học viên</p>
            <p>✅ 13 giờ video theo yêu cầu</p>
            <p>✅ Truy cập trọn đời</p>
            <p>✅ 42 tài nguyên có thể tải xuống</p>
            <p>✅ Chứng chỉ hoàn thành</p>
          </div>
          <Link to={"/"}>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold">
              Đăng ký ngay
            </button>
          </Link>
        </div>

        {/* Khóa học liên quan */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Khóa học liên quan</h3>
          <ul className="space-y-1 text-sm text-blue-600 underline">
            <li>Khóa học JavaScript toàn diện từ cơ bản đến nâng cao</li>
            <li>Xây dựng giao diện HTML & CSS phản hồi nhanh</li>
            <li>Thiết kế web với Bootstrap và các kiến thức cơ bản</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

