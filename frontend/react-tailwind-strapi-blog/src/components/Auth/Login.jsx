import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	// Check if user is already logged in
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/'); // Redirect to home page if token exists
		}
	}, [navigate]);

	// Handle traditional login
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);
			// console.log(data.profilePicture);
			//  if (data.profilePicture!=null) {
			 	localStorage.setItem('profilePicture', data.profilePicture);
			//  }

			toast.success('Login successful!', {
				position: 'top-right',
				autoClose: 3000,
			});

			navigate('/');
		} catch (err) {
			setError(err.message);
			toast.error(err.message, {
				position: 'top-right',
				autoClose: 3000,
			});
		}
	};

	// Handle Google Login
	const handleGoogleLogin = (credentialResponse) => {
		const token = credentialResponse.credential;

		// Send Google token to backend
		fetch('http://localhost:8080/api/auth/google', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Google login failed');
				}
				return response.json();
			})
			.then((data) => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('username', data.username);
				if (data.profilePicture) {
					localStorage.setItem('profilePicture', data.profilePicture);
				}

				toast.success('Google login successful!', {
					position: 'top-right',
					autoClose: 3000,
				});

				navigate('/');
			})
			.catch((error) => {
				toast.error(error.message, {
					position: 'top-right',
					autoClose: 3000,
				});
			});
	};

	return (
		<div>
			<section className="h-screen">
				<div className="px-6 h-full text-gray-800">
					<div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
						<div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
							<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample" />
						</div>
						<div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
							<form onSubmit={handleLogin}>
								<div className="mb-6">
									<input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Username" required value={username} />
								</div>
								<div className="mb-6">
									<input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" required value={password} />
								</div>
								<div className="text-center lg:text-left">
									<button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out">
										Login
									</button>
									<p className="text-sm font-semibold mt-2 pt-1 mb-0">
										Don’t have an account?{' '}
										<Link to="/register" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out">
											SignUp
										</Link>
									</p>
								</div>
							</form>
							<div className="mt-4">
								<GoogleLogin
									onSuccess={handleGoogleLogin}
									onError={() => {
										toast.error('Google login failed!', {
											position: 'top-right',
											autoClose: 3000,
										});
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
