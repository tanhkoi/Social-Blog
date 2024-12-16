import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) {
      // Gửi dữ liệu lên server hoặc thực hiện hành động khác
      console.log("Email:", email, "Name:", name);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-center">
        CÁC BÀI VIẾT NỔI BẬT BẠN KHÔNG NÊN BỎ LỠ!
      </h2>
      <p className="text-center mb-6">
        Thứ ba hàng tuần, CWTS sẽ gửi bạn email tổng hợp những bài viết
        đáng đọc nhất tuần qua.
      </p>
      <div className="flex justify-center mb-4">
        <img
          src="https://static1.eb-pages.com/uploads/5987363858153472/image.png"
          alt="Spiderum Mascot"
          className="w-24 h-24"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 w-full max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email của bạn
          </label>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 w-full max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên của bạn
          </label>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          ĐĂNG KÝ!
        </button>
      </form>
      {isSubmitted && (
        <p className="mt-4 text-center text-green-600">
          Cảm ơn bạn đã đăng ký!
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
