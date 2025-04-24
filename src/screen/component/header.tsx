import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCheck,
  faUser,
  faUsers,
  faBell,
  faEnvelope,
  faArrowAltCircleLeft,
  faMedal
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Search bar */}
      <div className="flex items-center space-x-3 text-gray-500 text-xl">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Search everything..."
          className="outline-none text-sm w-64 placeholder-gray-400"
        />
      </div>
      <div className="flex items-center space-x-6 text-lg cursor-pointer">
        <FontAwesomeIcon icon={faUsers} />
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faEnvelope} />
        {/* User actions */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-gray-700">Kiên</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium">Kiên</p>
                <p className="text-sm text-gray-500">vankien2002@gmail.com</p>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => {navigate("/"); setOpen(false)}}>
                  <span className="text-yellow-600 mr-3"><FontAwesomeIcon icon={faUser} /></span> Thông tin cá nhân
                </li>
                <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => {navigate("/lich-su-thi"); setOpen(false)}}>
                  <span className="text-yellow-500 mr-3"><FontAwesomeIcon icon={faMedal} /></span> Chứng nhận
                </li>
                <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => {navigate("/"); setOpen(false)}}>
                  <span className="text-gray-500 mr-3"><FontAwesomeIcon icon={faUsers} /></span> Lớp học
                </li>
              </ul>
              <div className="border-t">
                <li className="px-4 py-2 flex items-center text-red-600 hover:bg-red-50 cursor-pointer text-sm" onClick={() => {navigate("/login"); setOpen(false)}}>
                  <span className="mr-3"> <FontAwesomeIcon icon={faArrowAltCircleLeft} /></span> Đăng Xuất
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
