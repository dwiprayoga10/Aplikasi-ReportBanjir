import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data dari API
        axios.get('http://localhost:5000/api/reports')
            .then((response) => {
                setReports(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Hapus status login
        navigate('/login'); // Arahkan ke halaman login
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-6">Report Banjir</h1>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    to="/admin/dashboard" 
                                    className="block px-4 py-2 rounded hover:bg-blue-700">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/reports" 
                                    className="block px-4 py-2 rounded hover:bg-blue-700">
                                    Reports
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/settings" 
                                    className="block px-4 py-2 rounded hover:bg-blue-700">
                                    Data Banjir
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 p-6 bg-gray-100">
                <header className="flex justify-between items-center mb-6">
                    {/* "Welcome" di sebelah kiri */}
                    <span className="text-gray-600 text-sm">Welcome, Broo!</span>

                    {/* Tombol Logout di sebelah kanan */}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </header>

                {/* Komponen Outlet untuk render konten anak */}
                <Outlet />

                {/* Bagian untuk menampilkan tabel */}
                <div className="bg-white shadow-md rounded p-4 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Data Banjir Terbaru</h3>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Lokasi</th>
                                <th scope="col" className="px-6 py-3">Status Banjir</th>
                                <th scope="col" className="px-6 py-3">Level</th>
                                <th scope="col" className="px-6 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr 
                                    key={index} 
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{report.lokasi}</td>
                                    <td className={`px-6 py-4 ${report.status_banjir === 'Tinggi' ? 'text-red-600' : report.status_banjir === 'Sedang' ? 'text-yellow-600' : 'text-green-600'}`}>
                                        {report.status_banjir}
                                    </td>
                                    <td className="px-6 py-4">{report.level}</td>
                                    <td className="px-6 py-4">{report.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
