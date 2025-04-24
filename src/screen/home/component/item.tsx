import { Link } from "react-router-dom";

const courses = [
  {
    title: "Học Angular từ Cơ Bản đến Nâng Cao",
    instructor: "Jesse Stevens",
    duration: "32 giờ",
    lectures: "4 bài giảng",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Xây Dựng Website Responsive với HTML5 và CSS3",
    instructor: "John Michael",
    duration: "13 giờ",
    lectures: "32 bài giảng",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Tăng Tốc Lập Trình C# với Visual Studio",
    instructor: "Stella Johnson",
    duration: "18 giờ",
    lectures: "42 bài giảng",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Học JavaScript và Express để Trở Thành Developer Chuyên Nghiệp",
    instructor: "John Michael",
    duration: "13 giờ",
    lectures: "32 bài giảng",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Hiểu và Làm Chủ AngularJS như Một Lập Trình Viên Chuyên Nghiệp",
    instructor: "Stella Johnson",
    duration: "26 giờ",
    lectures: "26 bài giảng",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Thiết Kế Web Responsive với HTML5, CSS3 và Bootstrap",
    instructor: "Monroe Parker",
    duration: "18 giờ",
    lectures: "42 bài giảng",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80",
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
