import { Check, X, Building2, MapPin, Phone, Mail, GraduationCap, Clock, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

function ProfilePanel({ isOpen, onClose }) {
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        name: 'Dr. Sai',
        title: 'Endocrinologist',
        medicalCenter: 'Saveetha',
        hospitalAddress: 'Chennai',
        officePhone: '123',
        email: 'sai@gmail.com',
        medicalSchool: 'Saveetha',
        experience: '3',
        specializations: 'Doctor'
    });

    const handleEditToggle = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>
            <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto animate-slide-in-right border-l border-slate-200 dark:border-slate-800 transition-colors duration-200">

                <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                        <Users size={20} className="text-blue-600 dark:text-blue-400" /> Professional Profile
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                        <div className="px-6 pb-6 relative">
                            <div className="flex justify-between items-end -mt-10 mb-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-md bg-white dark:bg-slate-900">
                                    <img
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={handleEditToggle}
                                    className={`px-4 py-2 text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 ${isEditing
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {isEditing ? <><CheckCircle2 size={16} /> Save Changes</> : 'Edit Profile'}
                                </button>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    {isEditing ? (
                                        <input name="name" value={profileData.name} onChange={handleChange} className="text-xl font-extrabold text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 outline-none focus:border-blue-500 w-full" />
                                    ) : (
                                        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">{profileData.name}</h1>
                                    )}
                                    <span className="shrink-0 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/50 uppercase">
                                        <ShieldCheck size={12} /> Certified
                                    </span>
                                </div>
                                {isEditing ? (
                                    <input name="title" value={profileData.title} onChange={handleChange} className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 outline-none mt-1 focus:border-blue-500 w-full" />
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{profileData.title}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Information */}
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">Professional Information</h3>
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden text-slate-100">

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0">
                                        <Building2 size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Medical Center</h4>
                                        {isEditing ? (
                                            <input name="medicalCenter" value={profileData.medicalCenter} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.medicalCenter}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Hospital Address</h4>
                                        {isEditing ? (
                                            <input name="hospitalAddress" value={profileData.hospitalAddress} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.hospitalAddress}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 flex items-center justify-center shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Office Phone</h4>
                                        {isEditing ? (
                                            <input name="officePhone" value={profileData.officePhone} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.officePhone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 flex items-center justify-center shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Professional Email</h4>
                                        {isEditing ? (
                                            <input name="email" value={profileData.email} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.email}</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Details */}
                        <div>
                            <h3 className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">Professional Details</h3>
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Medical School</h4>
                                        {isEditing ? (
                                            <input name="medicalSchool" value={profileData.medicalSchool} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.medicalSchool}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400 flex items-center justify-center shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Years of Experience</h4>
                                        {isEditing ? (
                                            <input name="experience" type="number" value={profileData.experience} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.experience}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                                        <Users size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Specializations</h4>
                                        {isEditing ? (
                                            <input name="specializations" value={profileData.specializations} onChange={handleChange} className="w-full text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 mt-1 outline-none focus:border-blue-500" />
                                        ) : (
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{profileData.specializations}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePanel;
