import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Kiểm tra token và điều hướng nếu đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/");  // Redirect to home page if token exists
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, username, password }), // Cập nhật gửi dữ liệu đúng
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // eslint-disable-next-line no-unused-vars
      const data = await response.json();
      toast.success("Signup successful! Please log in.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Sau khi đăng ký thành công, chuyển hướng tới trang Login
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleSignup}>
                <div className="mb-6">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Name"
                    required
                    value={name}
                  />
                </div>
                <div className="mb-6">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email"
                    required
                    value={email}
                  />
                </div>
                <div className="mb-6">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Username"
                    required
                    value={username}
                  />
                </div>
                <div className="mb-6">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    required
                    value={password}
                  />
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-white transition duration-150 ease-in-out"
                  >
                    Signup
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
