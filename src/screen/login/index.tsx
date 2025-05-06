import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  return (
    <div className="flex h-screen">
      {/* Left panel - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-8">
        {/* Logo */}
        <div className="text-4xl font-bold text-gray-800 mb-10">Hệ Thống Elearning<span className="text-indigo-600">.</span></div>

        {/* Form */}
        <form className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tài khoản"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border rounded outline-none pr-10 focus:ring-2 focus:ring-indigo-500"
                style={{
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                }}
                required
              />
              <button
                type="button"
                onClick={handleClickShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                style={{ transition: 'color 0.15s ease' }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-2" />
            <label className="text-sm text-gray-700">Ghi nhớ</label>
          </div>
          <Link to="/">
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 my-3">
              Đăng nhập
            </button>
          </Link>

          <div className="text-right">
            <a href="#" className="text-sm text-red-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>

      {/* Right panel - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://i.pinimg.com/736x/3e/4f/a3/3e4fa3b71209c94a58005ce2869ff5ec.jpg"
          alt="login background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
