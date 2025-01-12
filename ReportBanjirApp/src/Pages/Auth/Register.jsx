import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password dan konfirmasi password tidak cocok!',
            });
            return;
        }

        const newUser = { email, password };
        localStorage.setItem('user', JSON.stringify(newUser)); // Simpan data user ke localStorage

        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Kamu berhasil mendaftar akun!',
        }).then(() => {
            navigate('/login'); // Setelah menutup SweetAlert, arahkan pengguna ke halaman login
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-500">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Daftar Akun</h2>
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
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Konfirmasi Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Daftar
                </button>
            </form>
        </div>
    );
};

export default Register;
