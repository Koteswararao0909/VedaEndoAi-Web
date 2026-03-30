import React from 'react';
import { ChevronLeft, Building2, MapPin, Phone, Mail, GraduationCap, Stethoscope, Users, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfessionalProfile() {
    const navigate = useNavigate();

    // Get user data from localStorage
    const user = {
        full_name: localStorage.getItem('userName') || 'Medical Professional',
        email: localStorage.getItem('userEmail') || '',
        license_number: localStorage.getItem('userLicense') || 'Not Set',
        specialization: localStorage.getItem('userSpecialization') || 'Specialist',
        clinic_name: localStorage.getItem('userClinic') || 'Not Set',
        hospital_address: localStorage.getItem('userAddress') || 'Not Set',
        office_phone: localStorage.getItem('userPhone') || 'Not Set',
        medical_school: localStorage.getItem('userSchool') || 'Not Set',
        years_of_experience: localStorage.getItem('userExperience') || '0',
    };

    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-black text-slate-900 dark:text-white p-4 lg:p-8 space-y-6 pb-32">
            {/* Header */}
            <div className="pt-4 px-2 mb-8 max-w-2xl mx-auto flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#007AFF] dark:text-[#00BFFF] font-medium active:scale-95 transition-transform bg-black/5 dark:bg-[#1a1a1a]/50 px-3 py-1.5 rounded-full"
                >
                    <ChevronLeft size={20} className="-ml-1" />
                    <span>Back</span>
                </button>
                <h1 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-wide">Professional Profile</h1>
                <button
                    onClick={() => navigate('/profile/edit')}
                    className="bg-black/5 dark:bg-[#1a1a1a] text-slate-900 dark:text-slate-300 px-4 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
                >
                    Edit
                </button>
            </div>

            <div className="px-2 max-w-2xl mx-auto space-y-8">

                {/* Profile Header section */}
                <div className="flex flex-col items-center justify-center pt-2">
                    <img
                        src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=200&auto=format&fit=crop"
                        alt="Profile"
                        className="w-[100px] h-[100px] rounded-full object-cover mb-4 border border-slate-200 dark:border-slate-800 shadow-sm"
                    />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.full_name.startsWith('Dr.') ? user.full_name : `Dr. ${user.full_name}`}</h2>
                    <p className="text-slate-500 dark:text-[#8e8e93] text-[17px] mb-2">{user.specialization}</p>
                    <p className="text-slate-500 dark:text-[#48484a] text-[13px] font-medium mb-4">License: {user.license_number}</p>
                    <div className="bg-white dark:bg-[#1C1C1E] border border-green-500/20 dark:border-green-900/30 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="text-[#34C759]" size={14} fill="currentColor" strokeWidth={0} />
                        <span className="text-[#34C759] text-[12px] font-bold tracking-wider">BOARD CERTIFIED</span>
                    </div>
                </div>

                {/* Professional Information */}
                <div className="flex flex-col gap-2 pt-4">
                    <h3 className="text-[13px] font-bold text-slate-500 dark:text-[#8e8e93] tracking-widest pl-4 mb-1 uppercase">Personal Information</h3>
                    <div className="bg-white dark:bg-[#1C1C1E] rounded-[16px] overflow-hidden flex flex-col shadow-sm">
                        <InfoRow
                            icon={Building2}
                            iconBg="bg-fuchsia-100 dark:bg-[#301633]"
                            iconColor="text-fuchsia-600 dark:text-[#E64DF9]"
                            label="Medical Center"
                            value={user.clinic_name}
                            hasBorder
                        />
                        <InfoRow
                            icon={MapPin}
                            iconBg="bg-blue-100 dark:bg-[#11243A]"
                            iconColor="text-blue-500 dark:text-[#3B9AFA]"
                            label="Hospital Address"
                            value={user.hospital_address}
                            hasBorder
                        />
                        <InfoRow
                            icon={Phone}
                            iconBg="bg-green-100 dark:bg-[#16291C]"
                            iconColor="text-green-600 dark:text-[#3ADF63]"
                            label="Office Phone"
                            value={user.office_phone}
                            hasBorder
                        />
                        <InfoRow
                            icon={Mail}
                            iconBg="bg-orange-100 dark:bg-[#322013]"
                            iconColor="text-orange-500 dark:text-[#F29F40]"
                            label="Professional Email"
                            value={user.email}
                        />
                    </div>
                </div>

                {/* Professional Details */}
                <div className="flex flex-col gap-2 pt-2">
                    <h3 className="text-[13px] font-bold text-slate-500 dark:text-[#8e8e93] tracking-widest pl-4 mb-1 uppercase">Professional Details</h3>
                    <div className="bg-white dark:bg-[#1C1C1E] rounded-[16px] overflow-hidden flex flex-col shadow-sm">
                        <InfoRow
                            icon={GraduationCap}
                            iconBg="bg-indigo-100 dark:bg-[#1C1C36]"
                            iconColor="text-indigo-500 dark:text-[#7E78F2]"
                            label="Medical School"
                            value={user.medical_school}
                            hasBorder
                        />
                        <InfoRow
                            icon={Stethoscope}
                            iconBg="bg-teal-100 dark:bg-[#122A2D]"
                            iconColor="text-teal-500 dark:text-[#41C7C1]"
                            label="Years of Experience"
                            value={`${user.years_of_experience} Years`}
                            hasBorder
                        />
                        <InfoRow
                            icon={Users}
                            iconBg="bg-rose-100 dark:bg-[#361625]"
                            iconColor="text-rose-500 dark:text-[#F94D7B]"
                            label="Specialization"
                            value={user.specialization}
                        />
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="pt-4 pb-10 flex text-center justify-center">
                    <p className="text-slate-400 dark:text-[#8e8e93] text-[13px] max-w-[280px] leading-relaxed">
                        Your profile information is visible to patients and other professionals on the platform.
                    </p>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ icon: Icon, iconBg, iconColor, label, value, hasBorder }) {
    return (
        <div className={`flex items-center gap-4 pl-4 py-3 bg-white dark:bg-[#1C1C1E]`}>
            <div className={`w-[28px] h-[28px] rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon size={16} fill="currentColor" strokeWidth={0} className={iconColor} />
            </div>
            <div className={`flex flex-col flex-1 py-1 pr-4 ${hasBorder ? 'border-b border-slate-100 dark:border-[#2C2C2E]' : ''}`}>
                <span className="text-[17px] text-slate-900 dark:text-white font-medium mb-0.5">{label}</span>
                <span className="text-[15px] text-slate-500 dark:text-[#8e8e93]">{value}</span>
            </div>
        </div>
    );
}
