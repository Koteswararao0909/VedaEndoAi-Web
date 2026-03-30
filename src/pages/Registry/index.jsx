import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../APIConfig';

export default function Registry() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchPatients = async () => {
            if (!userEmail) { navigate('/login'); return; }
            try {
                const response = await fetch(API_CONFIG.PATIENTS.LIST(userEmail));
                const data = await response.json();
                if (response.ok) setPatients(data);
                else setError('Failed to load patient records');
            } catch (err) {
                setError('Connection to clinical server lost');
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatients();
    }, [userEmail, navigate]);

    const filteredPatients = patients.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.medical_id?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeletePatient = async (id) => {
        try {
            const response = await fetch(API_CONFIG.PATIENTS.DELETE(id), {
                method: 'DELETE',
            });
            if (response.ok) {
                setPatients(patients.filter(p => p.id !== id));
                setSelectedPatient(null);
            } else {
                setError('Failed to delete patient');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black p-4 lg:p-8 space-y-6 pb-32">
            <div className="pt-4 px-2 max-w-4xl">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Clinical Registry</h1>
            </div>

            <div className="px-2 flex gap-4 max-w-4xl">
                <button
                    onClick={() => navigate('/registry/new')}
                    className="flex-1 py-3.5 bg-blue-500 text-white font-bold rounded-xl text-sm transition-transform active:scale-95"
                >
                    New Intake
                </button>
                <button
                    onClick={() => navigate('/registry/active')}
                    className="flex-1 py-3.5 bg-blue-50 dark:bg-blue-900/10 text-blue-500 font-bold rounded-xl text-sm border border-blue-500 transition-transform active:scale-95"
                >
                    Active Patients
                </button>
            </div>

            <div className="px-2 max-w-4xl">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-slate-400" size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search patient records..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-xl py-4 pl-12 pr-4 text-sm text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="px-2 flex flex-col gap-3 max-w-4xl">
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin mb-3" size={32} />
                        <p className="font-bold">Syncing clinical data...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                ) : filteredPatients.length === 0 ? (
                    <div className="py-20 text-center bg-white dark:bg-[#1a1a1a] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-500 font-bold">No patient records found.</p>
                    </div>
                ) : (
                    filteredPatients.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedPatient(p)}
                            className="bg-slate-50 dark:bg-[#1a1a1a] p-4 rounded-xl flex flex-col gap-2 shadow-sm border border-transparent dark:border-slate-800 cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-900 dark:text-white text-[15px]">{p.name}</span>
                                <span className="text-sm font-medium text-slate-500">{p.medical_id}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-slate-500">
                                <span>Age: {p.age || '--'}</span>
                                <span>Reg: {p.created_at ? new Date(p.created_at).toLocaleDateString() : '--'}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Patient Options Modal */}
            {selectedPatient && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm animate-fade-in px-4"
                    onClick={() => setSelectedPatient(null)}
                >
                    <div
                        className="bg-[#F2F2F7] dark:bg-[#1C1C1E] w-[270px] rounded-[24px] overflow-hidden shadow-2xl animate-scale-in"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="pt-6 pb-2 text-center">
                            <h3 className="text-[15px] font-medium text-black dark:text-white">Patient Options</h3>
                        </div>

                        <div className="px-4 pb-4 flex flex-col gap-2 mt-2">
                            <button
                                onClick={() => {
                                    navigate(`/registry/edit/${selectedPatient.id}`, { state: { patient: selectedPatient } });
                                    setSelectedPatient(null);
                                }}
                                className="w-full py-3 bg-[#E5E5EA] dark:bg-slate-700/50 rounded-[14px] text-[16px] font-medium text-black dark:text-white active:bg-slate-300 dark:active:bg-slate-600 transition-colors"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => handleDeletePatient(selectedPatient.id)}
                                className="w-full py-3 bg-[#E5E5EA] dark:bg-slate-700/50 rounded-[14px] text-[16px] font-medium text-[#FF3B30] active:bg-slate-300 dark:active:bg-slate-600 transition-colors"
                            >
                                Delete Patient
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
