import { useState } from "react";
import { Link } from "react-router-dom";

// Dữ liệu giả
const course = {
  title: "Khóa Học lý thuyết thông tin Từ Cơ Bản Đến Nâng Cao",
  instructor: "G S.T S. Nguyễn Bình",
  rating: 4.8,
  enrolled: 1200,
  lastUpdated: "04/2025",
  hours: 3.2,
  students: 12140,
  description:
    "Khóa học Lý thuyết Thông tin cung cấp kiến thức nền tảng về cách đo lường, mã hóa và truyền tải thông tin trong các hệ thống truyền thông. Bạn sẽ hiểu rõ các khái niệm như entropy, nguồn tin, nhiễu, kênh truyền, cùng với các kỹ thuật mã hóa và giải mã để đảm bảo hiệu quả và độ tin cậy của việc truyền tin. Khóa học cũng là cơ sở quan trọng cho các lĩnh vực như viễn thông, bảo mật, trí tuệ nhân tạo và xử lý tín hiệu.",
  learning: [
    "Khái niệm cơ bản về thông tin",
    "Cấu trúc hệ thống truyền tin",
    "Mô hình nguồn tin rời rạc",
    "Mã hóa nguồn và kênh",
    "Khả năng truyền tin tối ưu",
    "Hiểu rõ bản chất và lượng hóa thông tin",
    "Nắm được cấu trúc và nguyên lý hoạt động của hệ thống truyền tin",
  ],
  requirements: [
    "Máy tính bất kỳ: Windows, macOS hoặc Linux",
    "Kiến thức cơ bản ",
    "Hiểu biết cơ bản/tối thiểu về Lý thuyết thông tintin",
  ],
  curriculum: [
    {
      sectionTitle: "Giới thiệu về LTTTLTTT",
      lectures: [
        { title: "Giới thiệu", duration: "4 phút" },
        { title: "LTTT là gì?", duration: "5 phút" },
        { title: "Trang web và các bài giảigiải?", duration: "8 phút" },
        { title: "Làm bài tập", duration: "4 phút", preview: true },
        { title: "Đố vui nhanh", duration: "5 phút" },
      ],
    },
    {
      sectionTitle: "Các chương bạn cần học ",
      lectures: [
        { title: "Chương 1. Những vấn để chung và những khái niệm cơ bản", duration: "t" },
        { title: "Chương 2. Tín hiệu và nhiễu", duration: "" },
        { title: "Chương 3. Cơ sở lý thuyết thông tin thống kê", duration: "" },
        { title: "Chương 4. Cơ sở lý thuyết mã hoá " , duration: "" },
        { title: "Chương 5: Lý thuyết thu tối ưu", duration: "" },
        { title: "Chương 6. Mật mã " , duration: ""},
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
              src="https://qtuupload.s3.ap-southeast-1.amazonaws.com/2024/11/nganh-cong-nghe-thong-tin-khoi-nao-768x512.png"
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
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

