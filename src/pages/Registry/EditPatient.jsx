import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import API_CONFIG from '../../APIConfig';

export default function EditPatient() {
    const navigate = useNavigate();
    const location = useLocation();

    // Mock data from state or default
    const patient = location.state?.patient || {};

    const [formData, setFormData] = useState({
        name: patient.name || '',
        medical_id: patient.medical_id || patient.mrn || patient.id || '',
        age: patient.age || '',
        phone_number: patient.phone_number || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!patient.id) {
            navigate(-1);
            return;
        }
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch(API_CONFIG.PATIENTS.UPDATE(patient.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate(-1);
            } else {
                setError('Failed to update patient data');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] p-4 lg:p-8 space-y-8 pb-32">
            {/* Header */}
            <div className="pt-4 px-2 mb-8 max-w-2xl mx-auto">
                <div className="relative flex items-center justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 lg:-ml-6 flex items-center text-blue-500 font-medium active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={24} className="-ml-1" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-[17px] font-bold text-slate-900 dark:text-white">Edit Profile</h1>
                </div>
            </div>

            <div className="px-2 max-w-2xl mx-auto flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-medium text-slate-900 dark:text-white">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] border-none rounded-[14px] p-4 text-[17px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-medium text-slate-900 dark:text-white">Patient ID</label>
                    <input
                        type="text"
                        name="medical_id"
                        value={formData.medical_id}
                        onChange={handleChange}
                        className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] border-none rounded-[14px] p-4 text-[17px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-medium text-slate-900 dark:text-white">Age</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] border-none rounded-[14px] p-4 text-[17px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[15px] font-medium text-slate-900 dark:text-white">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] border-none rounded-[14px] p-4 text-[17px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                    />
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full bg-[#00C7E6] text-white font-bold text-[16px] py-4 rounded-[14px] shadow-[0_4px_14px_rgba(0,199,230,0.3)] active:scale-95 transition-all outline-none flex items-center justify-center gap-2"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : 'SAVE CHANGES'}
                    </button>
                </div>
            </div>
        </div>
    );
}
