import { useEffect, useState } from 'react';
import NavBar from '../../../components/Header/NavBar';
import SideBar from '../../../components/Sidebar/SideBar';
import BlogList from '../../../components/Blog/BlogList';

const Homepage = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchBlogs = async () => {
			const token = localStorage.getItem('token');

			try {
				const response = await fetch('http://localhost:8080/api/posts', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setBlogs(data);
				} else {
					const errorData = await response.json();
					console.error('Lỗi khi lấy danh sách blog:', errorData.message);
				}
			} catch (error) {
				console.error('Lỗi kết nối API:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	useEffect(() => {
		const loginSuccess = localStorage.getItem('loginSuccess');
		if (loginSuccess === 'true') {
			setShowMessage(true);
			localStorage.removeItem('loginSuccess');
		}
	}, []);

	const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen bg-[#0E1217]">
				<p className="text-white text-xl">Loading...</p>
			</div>
		);
	}

	return (
		<div className="bg-[#0E1217] min-h-screen text-white">
			<header>
				<NavBar setSearchTerm={setSearchTerm} />
			</header>
			<main>
				<div className="flex">
					<aside className="w-60">
						<SideBar />
					</aside>
					<div className="w-full flex-grow ml-4 p-5 px-10 mt-20">
						{showMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">Login successfully!</div>}
						<BlogList blogs={filteredBlogs} setBlogs={setBlogs} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Homepage;
