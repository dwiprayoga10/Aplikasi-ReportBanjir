import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        lokasi: '',
        status_banjir: '',
        level: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/reports/${editId}`, formData);
                setIsEditing(false);
                setEditId(null);
            } else {
                await axios.post('http://localhost:5000/api/reports', formData);
            }
            setFormData({ lokasi: '', status_banjir: '', level: '' });
            fetchReports();
        } catch (error) {
            console.error('Error submitting report:', error.response?.data || error.message);
        }
    };

    const handleEdit = (report) => {
        setFormData({
            lokasi: report.lokasi,
            status_banjir: report.status_banjir,
            level: report.level,
        });
        setIsEditing(true);
        setEditId(report.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reports/${id}`);
            fetchReports();
        } catch (error) {
            console.error('Error deleting report:', error.response?.data || error.message);
        }
    };

    return (
        <div className="p-6">
    <h2 className="text-xl font-bold mb-6">Manage Reports</h2>
    <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
                type="text"
                name="lokasi"
                placeholder="Lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded"
                required
            />
            <select
                name="status_banjir"
                value={formData.status_banjir}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded"
                required
            >
                <option value="">Status Banjir</option>
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
            </select>
            <input
                type="number"
                name="level"
                placeholder="Level"
                value={formData.level}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded"
                required
            />
        </div>
        <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
        >
            {isEditing ? 'Update Report' : 'Add Report'}
        </button>
    </form>

    {/* Tambahkan div untuk scrollable table */}
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
                <tr>
                    <th className="px-6 py-3">Lokasi</th>
                    <th className="px-6 py-3">Status Banjir</th>
                    <th className="px-6 py-3">Level</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{report.lokasi}</td>
                        <td
                            className={`px-6 py-4 ${
                                report.status_banjir === 'Tinggi'
                                    ? 'text-red-600'
                                    : report.status_banjir === 'Sedang'
                                    ? 'text-yellow-600'
                                    : 'text-green-600'
                            }`}
                        >
                            {report.status_banjir}
                        </td>
                        <td className="px-6 py-4">{report.level}</td>
                        <td className="px-6 py-4 flex space-x-2">
                            <button
                                onClick={() => handleEdit(report)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(report.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default Report;
