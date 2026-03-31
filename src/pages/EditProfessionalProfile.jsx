import React, { useState } from 'react';
import { Camera, User, Mail, FileText, Stethoscope, Building2, Navigation, Phone, GraduationCap, Clock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../api';

export default function EditProfessionalProfile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        full_name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        license_number: localStorage.getItem('userLicense') || '',
        specialization: localStorage.getItem('userSpecialization') || '',
        clinic_name: localStorage.getItem('userClinic') || '',
        hospital_address: localStorage.getItem('userAddress') || '',
        mobile_number: localStorage.getItem('userPhone') || '',
        medical_school: localStorage.getItem('userSchool') || '',
        years_of_experience: localStorage.getItem('userExperience') || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const userToken = localStorage.getItem('userToken');
            const response = await fetch(API_CONFIG.AUTH.UPDATE_PROFILE, {
                method: 'POST', // Based on main.py @app.route("/api/auth/update-profile", methods=["POST"])
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Update Local Storage
                localStorage.setItem('userName', formData.full_name);
                localStorage.setItem('userLicense', formData.license_number);
                localStorage.setItem('userSpecialization', formData.specialization);
                localStorage.setItem('userClinic', formData.clinic_name);
                localStorage.setItem('userAddress', formData.hospital_address);
                localStorage.setItem('userPhone', formData.mobile_number);
                localStorage.setItem('userSchool', formData.medical_school);
                localStorage.setItem('userExperience', formData.years_of_experience);

                setSuccess(true);
                setTimeout(() => navigate('/profile'), 1500);
            } else {
                setError(data.detail || 'Profile update failed.');
            }
        } catch (err) {
            setError('Connection to medical server failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#030712] pb-32">
            {/* Header */}
            <div className="pt-6 px-4 flex items-center justify-between mb-8 max-w-2xl mx-auto bg-[#F2F2F7]/80 dark:bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-10 py-4">
                <button
                    disabled={isLoading}
                    onClick={() => navigate(-1)}
                    className="bg-white dark:bg-[#1C1C1E] text-slate-900 dark:text-white px-5 py-2 rounded-full font-bold shadow-sm active:scale-95 transition-all text-[15px] disabled:opacity-50"
                >
                    Cancel
                </button>
                <h1 className="text-[17px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Edit Credentials</h1>
                <button
                    disabled={isLoading}
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-black shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-[15px] flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
                </button>
            </div>

            <div className="px-4 max-w-2xl mx-auto space-y-6">

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                        <CheckCircle2 size={20} />
                        <span>Profile updated successfully!</span>
                    </div>
                )}

                {/* Photo Section */}
                <div className="flex flex-col items-center justify-center py-4 bg-white dark:bg-[#1C1C1E] rounded-[32px] shadow-sm mb-2">
                    <div className="relative">
                        <div className="w-[100px] h-[100px] rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 font-black text-3xl border-4 border-white dark:border-slate-800">
                            {formData.full_name?.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-[32px] h-[32px] bg-[#007AFF] text-white rounded-full flex items-center justify-center border-[3px] border-white dark:border-slate-800">
                            <Camera size={14} fill="currentColor" strokeWidth={0} />
                        </div>
                    </div>
                    <button className="text-[#007AFF] text-[13px] font-bold mt-4 active:opacity-70 transition-opacity uppercase tracking-widest">
                        Digital Identification
                    </button>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[13px] font-black text-[#8e8e93] mb-3 px-4 uppercase tracking-widest">Digital Identity</h3>
                        <div className="bg-white dark:bg-[#1C1C1E] rounded-[28px] overflow-hidden flex flex-col shadow-sm border border-slate-100 dark:border-slate-800">
                            <InputField icon={User} name="full_name" value={formData.full_name} onChange={handleChange} hasBorder />
                            <InputField icon={Mail} name="email" value={formData.email} disabled hasBorder />
                            <InputField icon={FileText} name="license_number" value={formData.license_number} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[13px] font-black text-[#8e8e93] mb-3 px-4 uppercase tracking-widest">Clinical Authority</h3>
                        <div className="bg-white dark:bg-[#1C1C1E] rounded-[28px] overflow-hidden flex flex-col shadow-sm border border-slate-100 dark:border-slate-800">
                            <InputField 
                                icon={Stethoscope} 
                                name="specialization" 
                                value={formData.specialization} 
                                onChange={handleChange} 
                                type="select"
                                options={["Radiologist", "Pathologist", "Gynecologist"]}
                                hasBorder 
                            />
                            <InputField icon={Building2} name="clinic_name" value={formData.clinic_name} onChange={handleChange} hasBorder />
                            <InputField icon={Navigation} name="hospital_address" value={formData.hospital_address} onChange={handleChange} hasBorder />
                            <InputField icon={Phone} name="mobile_number" value={formData.mobile_number} iconColor="text-[#34C759]" onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[13px] font-black text-[#8e8e93] mb-3 px-4 uppercase tracking-widest">Registry & Tenure</h3>
                        <div className="bg-white dark:bg-[#1C1C1E] rounded-[28px] overflow-hidden flex flex-col shadow-sm border border-slate-100 dark:border-slate-800">
                            <InputField icon={GraduationCap} name="medical_school" value={formData.medical_school} onChange={handleChange} hasBorder />
                            <InputField icon={Clock} name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ icon: Icon, iconColor = "text-[#007AFF]", value, name, onChange, hasBorder, disabled, type = "text", options = [] }) {
    return (
        <div className={`flex items-center gap-4 pl-6 py-5 bg-white dark:bg-[#1C1C1E] ${hasBorder ? 'border-b border-[#F2F2F7] dark:border-[#2C2C2E]' : ''} ${disabled ? 'opacity-60' : ''}`}>
            <Icon size={20} className={iconColor} strokeWidth={3} />
            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="flex-1 bg-transparent border-none text-[17px] font-bold text-slate-900 dark:text-white outline-none pr-10 appearance-none"
                >
                    <option value="" disabled>Select Specialization</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="flex-1 bg-transparent border-none text-[17px] font-bold text-slate-900 dark:text-white outline-none pr-4 placeholder:text-slate-300"
                />
            )}
        </div>
    );
}
