import React, { useState } from 'react';
import { ChevronLeft, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../../APIConfig';

function NewIntake() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        dob: '',
        bmi: '',
        doctor_email: localStorage.getItem('userEmail') || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Logic for BMI is simplified to direct input per screenshot requirement

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const payload = {
                name: formData.name,
                age: parseInt(formData.age) || 0,
                user_email: formData.doctor_email,
                last_visit: new Date().toLocaleDateString(),
                status: 'Active',
                phone_number: formData.phone || "--",
                dob: formData.dob || null,
                bmi: formData.bmi || "--",
                is_online: true,
                is_analyzed: false
            };

            const response = await fetch(API_CONFIG.PATIENTS.CREATE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Patient record initialized successfully!');
                navigate('/registry');
            } else {
                const data = await response.json();
                setError(data.detail || 'Failed to create patient record.');
            }
        } catch (err) {
            setError('Connection to clinical server failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.name && formData.age && formData.phone;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black p-4 lg:p-8 pb-32">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                {/* Header */}
                <div>
                    <button
                        onClick={() => navigate('/registry')}
                        className="text-slate-500 hover:text-[#007AFF] font-semibold text-[15px] flex items-center gap-1 mb-4 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-fit"
                        disabled={isLoading}
                    >
                        <ChevronLeft size={20} /> Back to Registry
                    </button>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Add New Patient</h1>
                    <p className="text-slate-500 mt-2 font-medium">Please enter the correct demographic and clinical information.</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white dark:bg-[#1a1a1a] rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-[#007AFF]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Patient Information</h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">All fields are required for the registry</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Full Name */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-[15px] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]/50 transition-all font-medium"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Age */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Age"
                                    className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-[15px] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]/50 transition-all font-medium"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-[15px] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]/50 transition-all font-medium"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Date of Birth</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-[15px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]/50 transition-all font-medium appearance-none"
                                        disabled={isLoading}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#007AFF]">
                                        <Calendar size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* BMI */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Current BMI</label>
                                <input
                                    type="text"
                                    name="bmi"
                                    value={formData.bmi}
                                    onChange={handleChange}
                                    placeholder="Enter BMI"
                                    className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-[15px] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF]/50 transition-all font-medium"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/registry')}
                                className="px-8 py-3 bg-white dark:bg-[#1C1C1E] border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !isFormValid}
                                className="px-8 py-3 bg-[#007AFF] text-white font-black rounded-xl shadow-lg shadow-[#007AFF]/20 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 hover:bg-blue-600"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'REGISTER PATIENT'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewIntake;
