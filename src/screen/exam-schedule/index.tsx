import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { AppContext } from "../../context/AppContext";

// Define the interface for CourseExams
interface CourseExams {
  _id?: string;
  cid?: string;
  title: string;
  percentAnswer: number;
  direct: boolean;
  type: string;
  availableFrom: string;
  availableTo: string;
}

const ExamSchedule = () => {
  const { userInfo } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Allow selectedDate to be Date or null
  const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const [allExams, setAllExams] = useState<CourseExams[]>([]); // Use the CourseExams interface
  const navigate = useNavigate();

  // Fetch all exams from the API
  const fetchAllExams = async () => {
    try {
      const response = await api.get(`course_Exams/getAllExamCourse?page=${1}&limit=${99999999}`);
      const exams = response.data.data.map((exam: any) => ({
        _id: exam._id,
        cid: exam.cid,
        title: exam.title,
        percentAnswer: exam.percentAnswer,
        direct: exam.direct,
        type: exam.type,
        availableFrom: exam.availableFrom,
        availableTo: exam.availableTo,
      }));
      setAllExams(exams);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  useEffect(() => {
    fetchAllExams();
  }, []);

  const examDates = allExams.map((e) => format(new Date(e.availableFrom), "yyyy-MM-dd"));

  const handleNavigate = async (id: string) => {
    try {
      await api.post(`user_Course/addUsersToCourse`, {
        uid: [userInfo._id],
        cid: filteredExams[0].cid
      });

      await api.post(`course_Exams/start-exam`, { ceid: id });

      navigate(`/bai-thi/${id}`);
    } catch (error: any) {
      if (
        error?.response?.data?.code === "EXAM_TIME_OVERDUE"
      ) {
        alert("Đã quá thời gian làm bài kiểm tra");
      } else if (error?.response?.data?.code === "ALREADY_REGISTERED_FOR_THE_EXAM") {
        alert("Sinh viên đã đăng ký thi, vui lòng kiểm tra lại");
      } else {
        console.error("Error starting exam:", error);
      }
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => { // Updated to match Date type
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

  const filteredExams = allExams.filter((e) => format(new Date(e.availableFrom), "yyyy-MM-dd") === format(selectedDate || new Date, "yyyy-MM-dd"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mx-5 my-10">
      {/* Exam list */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          📝 Bài kiểm tra ngày {format(selectedDate || new Date, "dd/MM/yyyy")}
        </h2>
        {filteredExams.length > 0 ? (
          <ul className="space-y-4">
            {filteredExams.map((exam, index) => (
              <li
                key={index}
                className="sm:flex sm:items-start items-center flex-col sm:flex-row gap-4 border p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                {/* <img
                  src={exam.image}
                  alt={exam.title}
                  className="w-14 h-14 object-cover rounded-md"
                /> */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold">{exam.title}</h3>
                  <p className="text-sm text-gray-600">
                    {format(exam.availableFrom, "dd/MM/yyyy")}
                    {/* • {exam.time} • {exam.duration} */}
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate(exam._id as string)}
                  className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 mx-auto w-full sm:w-auto my-2"
                >
                  Tham gia
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Không có bài thi nào trong ngày này.</p>
        )}
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-lg shadow">
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
