const Footer =()=>{

    return (
        <footer className="bg-neutral-900 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo + Icon */}
                <div className="space-y-4">
                    <img src="/img/logo.png" alt="Personal Logo" className="h-10"/>
                    <p className="text-3xl font-semibold text-gray-400">AStream</p>
                </div>

                {/* Về tôi */}
                <div>
                    <h3 className="font-semibold mb-2">Về tôi</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#about" className="hover:underline">Giới thiệu</a></li>
                        <li><a href="#skills" className="hover:underline">Kỹ năng</a></li>
                        <li><a href="#projects" className="hover:underline">Dự án</a></li>
                        <li><a href="#contact" className="hover:underline">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Dịch vụ */}
                <div>
                    <h3 className="font-semibold mb-2">Dịch vụ</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#webdev" className="hover:underline">Thiết kế Web</a></li>
                        <li><a href="#uiux" className="hover:underline">UI/UX Design</a></li>
                        <li><a href="#freelance" className="hover:underline">Làm việc tự do</a></li>
                        <li><a href="#consulting" className="hover:underline">Tư vấn kỹ thuật</a></li>
                    </ul>
                </div>

                {/* Chính sách + liên hệ */}
                <div>
                    <h3 className="font-semibold mb-2">Thông tin</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#terms" className="hover:underline">Chính sách bảo mật</a></li>
                        <li><a href="#faq" className="hover:underline">Câu hỏi thường gặp</a></li>
                        <li className="flex items-center gap-2 mt-4">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M22 16.92v3.09c0 .61-.37 1.17-.94 1.38a18.34 18.34 0 01-8.06.61 18.12 18.12 0 01-6.46-2.59 18.43 18.43 0 01-5.39-5.39A18.12 18.12 0 011.02 8a18.34 18.34 0 01.61-8.06c.21-.57.77-.94 1.38-.94h3.09a1.5 1.5 0 011.49 1.13l.72 2.89a1.5 1.5 0 01-.41 1.47L6.59 6.59a15.05 15.05 0 006.82 6.82l1.1-1.1a1.5 1.5 0 011.47-.41l2.89.72A1.5 1.5 0 0122 16.92z"/>
                            </svg>
                            <span>0123 456 789</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span>emailcuaban@example.com</span>
                        </li>
                        <li className="mt-4 flex gap-4 text-lg">
                            <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-sky-400"><i className="fab fa-twitter"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Dự án cá nhân bởi <strong>Trần Văn Thắng</strong>. All rights reserved.
            </div>
        </footer>

    )

}
export default Footer;