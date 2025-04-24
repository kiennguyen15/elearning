import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faChalkboardTeacher,
  faClipboardCheck,
  faCertificate,
  faSignOutAlt,
  faUserGraduate,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="sticky top-0 w-64 bg-[#1c1c2e] text-white h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8 cursor-pointer" onClick={() => navigate("/")}>
          E-Learning<span className="text-gray-400">.</span>
        </div>

        <nav className="space-y-6">
          <Link to="/">
            <div className="flex items-center px-4 py-3 bg-[#2a2a3d] rounded-md cursor-pointer hover:bg-[#33334a] transition">
              {/* Icon wrapper với width cố định */}
              <span className="w-6 flex justify-center">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="ml-4 font-semibold">Trang chủ</span>
            </div>
          </Link>

          <div>
            <div className="text-xs text-gray-400 mb-4">HỌC TẬP</div>
            <ul className="space-y-3">
              <Link to="/lop-hoc">
                <li className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition">
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </span>
                  <span className="ml-4">Lớp học</span>
                </li>
              </Link>
              <Link to="/">
                <li className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition">
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </span>
                  <span className="ml-4">Bài kiểm tra</span>
                </li>
              </Link>
              <Link to="/lich-su-thi">
                <li className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition">
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faCertificate} />
                  </span>
                  <span className="ml-4">Chứng nhận</span>
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <div className="text-xs text-gray-400 mb-4">THỐNG KÊ & CÁ NHÂN</div>
            <ul className="space-y-3">
              <Link to="/">
                <li className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition">
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faUserGraduate} />
                  </span>
                  <span className="ml-4">Tiến độ học</span>
                </li>
              </Link>
              <Link to="/">
                <li className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition">
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faChartBar} />
                  </span>
                  <span className="ml-4">Thống kê</span>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
