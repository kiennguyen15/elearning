import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Sản phẩm */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold text-black">Elearning</div>
          <div className="text-sm text-gray-500">Hệ thống học trực tuyến</div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Sản phẩm</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Khóa học</a></li>
              <li><a href="#" className="hover:underline">Bài viết</a></li>
              <li><a href="#" className="hover:underline">Liên hệ</a></li>
            </ul>
          </div>
        </div>

        {/* Chính sách */}
        <div>
          <h4 className="font-semibold mb-2">Chính sách chung & hỗ trợ</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Bài viết</a></li>
            <li><a href="#" className="hover:underline">Điều khoản dịch vụ</a></li>
            <li><a href="#" className="hover:underline">Chính sách bảo mật thông tin</a></li>
          </ul>
        </div>

        {/* Nhận cập nhật & liên hệ */}
        <div className="w-full md:max-w-xs">
          <h4 className="font-semibold mb-2">Nhận cập nhật mới nhất</h4>
          <div className="flex items-center mt-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition whitespace-nowrap">
              Đăng ký 
            </button>
          </div>

          <div className="mt-4 text-sm">
            <p className="mb-1">Liên hệ chúng tôi:</p>
            <div className="flex items-center gap-2">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-lg">
                <i className="fab fa-facebook" />
              </a>
              <span className="text-gray-700 font-medium">Đường dây nóng: <span className="text-pink-600">01223456789</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t pt-4">
        <p>
          Bản quyền © <span className="font-semibold text-blue-600">Elearning</span> | Bảo lưu mọi quyền
        </p>
        <p>
          Nền tảng đào tạo, học tập và phát triển nội dung phân tán{" "}
          <span className="text-blue-600 font-medium">Elearning</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
