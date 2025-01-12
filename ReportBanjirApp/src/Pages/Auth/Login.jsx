import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulasi pengecekan login (validasi email dan password dari localStorage)
        const storedUser = JSON.parse(localStorage.getItem('user')); // Ambil data user yang terdaftar

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            console.log('Login berhasil');
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true'); // Menyimpan status login
            navigate('/admin/dashboard'); // Mengarahkan ke dashboard setelah login
        } else {
            alert('Email atau password salah!');
        }
    };

    const goToRegister = () => {
        navigate('/register'); // Arahkan pengguna ke halaman register
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-500">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p className="text-sm text-white">
                        Belum punya akun?{' '}
                        <button
                            onClick={goToRegister}
                            className="text-blue-200 hover:underline"
                        >
                            Daftar di sini
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
