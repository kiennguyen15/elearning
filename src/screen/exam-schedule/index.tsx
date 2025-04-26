import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import { Link } from "react-router-dom";

const examData = [
  {
    title: "Lý thuyết thông tin",
    date: new Date("2025-04-25"),
    time: "10:00 AM",
    duration: "30 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Khóa Học JavaScript Toàn Diện Từ Cơ Bản Đến Nâng Cao",
    date: new Date("2025-04-30"),
    time: "2:00 PM",
    duration: "45 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "ReactJS Cơ Bản Quiz",
    date: new Date("2025-04-17"),
    time: "9:00 AM",
    duration: "40 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "NodeJS và Express Kiểm Tra Giữa Kỳ",
    date: new Date("2025-04-17"),
    time: "1:30 PM",
    duration: "50 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Kiểm Tra SQL và Database Design",
    date: new Date("2025-04-17"),
    time: "11:00 AM",
    duration: "45 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Bài Tập Lớn Java OOP",
    date: new Date("2025-04-30"),
    time: "3:00 PM",
    duration: "60 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Bài tập LTTT",
    date: new Date("2025-04-25"),
    time: "10:00 AM",
    duration: "30 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Lý thuyết thông tin ",
    date: new Date("2025-04-06"),
    time: "9:00 AM",
    duration: "35 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Kỳ Thi Python Cho Người Mới Bắt Đầu",
    date: new Date("2025-04-12"),
    time: "8:00 AM",
    duration: "50 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Bài Kiểm Tra Final TypeScript",
    date: new Date("2025-04-14"),
    time: "2:00 PM",
    duration: "40 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Lập Trình Web Fullstack Kiểm Tra Cuối Khóa",
    date: new Date("2025-04-01"),
    time: "3:30 PM",
    duration: "60 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
  {
    title: "Thiết Kế Giao Diện UI/UX Quiz",
    date: new Date("2025-04-12"),
    time: "4:00 PM",
    duration: "35 phút",
    image: "https://gocnhocuachi.com/wp-content/uploads/2023/04/html-css.png",
  },
];

const ExamSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const examDates = examData.map((e) => format(e.date, "yyyy-MM-dd"));

  const tileClassName = ({ date, view }: { date: any; view: any }) => {
    const formatted = format(date, "yyyy-MM-dd");
    if (view === "month" && examDates.includes(formatted)) {
      return "text-black font-semibold";
    }
    return "";
  };

  const tileContent = ({ date, view }: { date: any; view: any }) => {
    const formatted = format(date, "yyyy-MM-dd");
    const isExamDate = view === "month" && examDates.includes(formatted);

    return (
      <div className="flex justify-center items-center h-4">
        {isExamDate && (
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        )}
      </div>
    );
  };

  const filteredExams = examData.filter((exam) =>
    isSameDay(exam.date, selectedDate)
  );

  return (
    <div className="flex gap-6 mt-10 mx-20 my-10">
      {/* Exam list */}
      <div className="w-8/12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          📝 Bài kiểm tra ngày {format(selectedDate, "dd/MM/yyyy")}
        </h2>
        {filteredExams.length > 0 ? (
          <ul className="space-y-4">
            {filteredExams.map((exam, index) => (
              <li
                key={index}
                className="flex items-start gap-4 border p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={exam.image}
                  alt={exam.title}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{exam.title}</h3>
                  <p className="text-sm text-gray-600">
                    {format(exam.date, "dd/MM/yyyy")} • {exam.time} • {exam.duration}
                  </p>
                </div>
                <Link to={"/bai-thi"}>
                  <button className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700">
                    Tham gia
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Không có bài thi nào trong ngày này.</p>
        )}
      </div>

      {/* Calendar */}
      <div className="w-4/12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">📆 Lịch kiểm tra</h2>
        <Calendar
          onChange={setSelectedDate as any}
          value={selectedDate}
          tileClassName={tileClassName as any}
          tileContent={tileContent as any}
          calendarType="gregory"
          formatShortWeekday={(_, date) => WEEKDAYS[date.getDay()]}
          className="!border-none !w-full rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
};

export default ExamSchedule;
