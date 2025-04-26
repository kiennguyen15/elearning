import { Link } from "react-router-dom";

const courses = [
  {
    title: "Chương 1. Những vấn để chung và  khái niệm cơ bản",
    instructor: "",
    duration: "32 giờ",
    lectures: "4 bài giảng",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmrGAs47hPpD1NobCYAMA797nXErKYRP1mw&s",
  },
  {
    title: "Chương 2. Tín hiệu và nhiễu",
    instructor: "",
    duration: "13 giờ",
    lectures: "32 bài giảng",
    image: "https://thptchuyensonla.edu.vn/wp-content/uploads/2020/06/nganh-it-o-viet-nam-wallpaper.jpg",
  },
  {
    title: "Chương 3. Cơ sở lý thuyết thông tin thống kê",
    instructor: "",
    duration: "18 giờ",
    lectures: "42 bài giảng",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmrGAs47hPpD1NobCYAMA797nXErKYRP1mw&s",
  },
  {
    title: "Chương 4. Cơ sở lý thuyết mã hoá",
    instructor: "",
    duration: "13 giờ",
    lectures: "32 bài giảng",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Oqyti_vOHzKVeucxlX4jsPwwT1bDWn0zcA&s",
  },
  {
    title: "Chương 5: Lý thuyết thu tối ưu",
    instructor: "Stella Johnson",
    duration: "26 giờ",
    lectures: "26 bài giảng",
    image: "https://funix.edu.vn/wp-content/uploads/2022/04/data-charts-man-601834022.jpg",
  },
  {
    title: "Chương 6. Mật mã",
    instructor: "",
    duration: "18 giờ",
    lectures: "42 bài giảng",
    image: "https://ant.ncc.asia/wp-content/uploads/2023/06/image-143.png",
  },
];

const CourseCard = ({ course }: { course: any }) => (
  <div className="rounded-xl shadow-sm overflow-hidden border bg-white">
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-[160px] object-cover"
    />
    <div className="p-3">
      <h3 className="font-medium text-base mb-1 leading-snug line-clamp-2">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.duration} • {course.lectures}</p>
      <p className="text-sm text-gray-600">{course.instructor}</p>
      <Link to={`/chi-tiet-khoa-hoc`}>
        <p className="text-indigo-600 font-semibold mt-1 cursor-pointer text-right">Tham gia</p>
      </Link>
    </div>
  </div>
);


const ListCourses = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Danh sách khóa học</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  </div>
);

export default ListCourses;
