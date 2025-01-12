import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true); // State untuk loading

    useEffect(() => {
        // Fetch data banjir terbaru dari API
        axios
            .get("http://localhost:5000/api/reports")
            .then((response) => {
                setReports(response.data); // Simpan data ke state
                setLoading(false); // Hentikan loading
            })
            .catch((error) => {
                console.error("Error fetching reports:", error);
                setLoading(false); // Tetap hentikan loading meskipun ada error
            });
    }, []);

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Data Banjir Terbaru</h1>

            {/* Tampilkan loading jika data belum tersedia */}
            {loading ? (
                <p className="text-gray-600">Loading data...</p>
            ) : reports.length > 0 ? (
                <div className="bg-white shadow-md rounded p-4">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                            <tr>
                                <th className="px-6 py-3">Lokasi</th>
                                <th className="px-6 py-3">Status Banjir</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Waktu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{report.lokasi}</td>
                                    <td
                                        className={`px-6 py-4 ${
                                            report.status_banjir === "Tinggi"
                                                ? "text-red-600"
                                                : report.status_banjir === "Sedang"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {report.status_banjir}
                                    </td>
                                    <td className="px-6 py-4">{report.level}</td>
                                    <td className="px-6 py-4">{report.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">Tidak ada data banjir tersedia.</p>
            )}
        </div>
    );
};

export default Settings;
