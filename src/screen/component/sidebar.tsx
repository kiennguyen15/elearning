import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChalkboardTeacher,
  faClipboardCheck,
  faCertificate,
  faUserGraduate,
  faChartBar,
  faFileAlt,
  faBookOpen,
  faUsers,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Đóng khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Hàm điều hướng kèm đóng sidebar
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-[#1c1c2e] text-white p-6 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:sticky lg:flex lg:flex-col lg:h-screen`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className="text-2xl font-bold mb-8 cursor-pointer"
            onClick={() => handleNavigate('/')}
          >
            E-Learning<span className="text-gray-400">.</span>
          </div>

          <nav className="space-y-6">
            <div
              onClick={() => handleNavigate('/')}
              className="flex items-center px-4 py-3 bg-[#2a2a3d] rounded-md cursor-pointer hover:bg-[#33334a] transition"
            >
              <span className="w-6 flex justify-center">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="ml-4 font-semibold">Trang chủ</span>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-4">HỌC TẬP</div>
              <ul className="space-y-3">
                <li
                  onClick={() => handleNavigate('/lop-hoc')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </span>
                  <span className="ml-4">Lớp học</span>
                </li>
                <li
                  onClick={() => handleNavigate('/')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </span>
                  <span className="ml-4">Bài kiểm tra</span>
                </li>
                <li
                  onClick={() => handleNavigate('/lich-su-thi')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faCertificate} />
                  </span>
                  <span className="ml-4">Chứng nhận</span>
                </li>
                <li
                  onClick={() => handleNavigate('/')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faUserGraduate} />
                  </span>
                  <span className="ml-4">Tiến độ học</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-4 mt-6">QUẢN LÝ HỆ THỐNG</div>
              <ul className="space-y-3">
                <li
                  onClick={() => handleNavigate('dashboard/exams')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faFileAlt} />
                  </span>
                  <span className="ml-4">Quản lý đề thi</span>
                </li>
                <li
                  onClick={() => handleNavigate('dashboard/bank-question')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </span>
                  <span className="ml-4">Ngân hàng câu hỏi</span>
                </li>
                <li
                  onClick={() => handleNavigate('dashboard/customer')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span className="ml-4">Quản lý sinh viên</span>
                </li>
                <li
                  onClick={() => handleNavigate('dashboard/subject')}
                  className="flex items-center px-2 py-1 cursor-pointer hover:text-gray-300 transition"
                >
                  <span className="w-6 flex justify-center">
                    <FontAwesomeIcon icon={faFlask} />
                  </span>
                  <span className="ml-4">Quản lý môn học</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
