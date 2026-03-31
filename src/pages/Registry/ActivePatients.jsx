import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, User, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../api';

export default function ActivePatients() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const userEmail = localStorage.getItem('userEmail');
    const userToken = localStorage.getItem('userToken');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(API_CONFIG.PATIENTS.LIST(userEmail), {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setPatients(data);
                } else {
                    setError('Unable to load clinical records');
                }
            } catch (err) {
                setError('Clinical server connection failed');
            } finally {
                setIsLoading(false);
            }
        };

        if (userEmail) {
            fetchPatients();
        } else {
            navigate('/login');
        }
    }, [userEmail, navigate]);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.medical_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 lg:p-8 space-y-6 pb-32">
            {/* Header */}
            <div className="pt-4 px-2 mb-8 max-w-4xl mx-auto">
                <div className="relative flex items-center justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 lg:-ml-6 flex items-center text-blue-500 font-medium active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={24} className="-ml-1" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-[17px] font-bold text-slate-900 dark:text-white">Active Patients</h1>
                </div>
            </div>

            <div className="px-2 max-w-4xl mx-auto space-y-6 lg:ml-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search active patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-[#1a1a1a] border-none rounded-xl py-3.5 pl-11 pr-4 text-[15px] outline-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                    />
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 className="animate-spin mb-3" size={32} />
                            <p className="font-bold">Syncing clinical data...</p>
                        </div>
                    ) : filteredPatients.length > 0 ? (
                        filteredPatients.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => navigate(`/registry/patient/${p.id}`, { state: { patient: p } })}
                                className="bg-white dark:bg-[#1a1a1a] rounded-[24px] p-5 flex items-center justify-between shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-blue-500/30 transition-all hover:scale-[1.01] active:scale-95 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-[56px] h-[56px] rounded-2xl bg-[#E5F1FF] dark:bg-blue-900/20 flex items-center justify-center text-[#007AFF] group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <User size={32} fill="currentColor" strokeWidth={0} />
                                        </div>
                                        {p.is_online && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#34C759] rounded-full border-4 border-white dark:border-[#1a1a1a]"></div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-black text-[18px] text-slate-900 dark:text-white mb-0.5 tracking-tight">{p.name}</h3>
                                        <p className="text-[13px] font-bold text-slate-400">Patient ID: {p.medical_id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                                        <span className={`text-[12px] font-black px-3 py-1 rounded-full ${p.is_analyzed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {p.is_analyzed ? 'ANALYZED' : 'PENDING'}
                                        </span>
                                    </div>
                                    <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={24} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-white dark:bg-[#1a1a1a] rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 font-bold">No active clinical records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
