import React from "react";

const Dashboard = () => {
    return (
        <div className="h-screen bg-gray-100 p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Dashboard Pemantauan Banjir
            </h1>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold text-gray-700">Total Laporan</h3>
                    <p className="text-2xl font-bold text-blue-600">128</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold text-gray-700">Lokasi Berisiko Tinggi</h3>
                    <p className="text-2xl font-bold text-red-600">10</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold text-gray-700">Status Aman</h3>
                    <p className="text-2xl font-bold text-green-600">85</p>
                </div>
            </div>

            {/* Ringkasan Tabel Data */}
            <div className="bg-white shadow rounded p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Ringkasan Data Lokasi</h3>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                        <tr>
                            <th className="px-4 py-2">Lokasi</th>
                            <th className="px-4 py-2">Status Banjir</th>
                            <th className="px-4 py-2">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">Jakarta</td>
                            <td className="px-4 py-2 text-red-600">Tinggi</td>
                            <td className="px-4 py-2">5</td>
                        </tr>
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-2">Bandung</td>
                            <td className="px-4 py-2 text-yellow-600">Sedang</td>
                            <td className="px-4 py-2">3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
