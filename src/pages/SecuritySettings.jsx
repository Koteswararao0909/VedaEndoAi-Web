import React from 'react';
import { ArrowLeft, Shield, Key, Mail, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecuritySettings() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f2f2f7] dark:bg-[#0a0f18] p-4 lg:p-8 w-full">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center mb-12 relative">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-blue-500 hover:text-blue-600 transition-colors absolute left-0 z-10"
                    >
                        <ArrowLeft size={22} className="mr-1" />
                        <span className="text-[17px]">Back</span>
                    </button>
                    <h1 className="w-full text-center text-[17px] font-bold text-black dark:text-white">Security</h1>
                </div>

                {/* Hero Icon */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="w-24 h-24 bg-[#e5f0ff] dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <Shield size={44} className="text-blue-500" fill="currentColor" />
                    </div>
                    <p className="text-[15px] text-[#8e8e93] dark:text-gray-400">Update your security credentials</p>
                </div>

                {/* Section */}
                <div className="space-y-3">
                    <h2 className="text-[17px] font-bold text-black dark:text-white px-2">Password & Access</h2>
                    <div className="bg-white dark:bg-[#131b2b] rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                        {/* Change Password row */}
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border-b border-gray-100 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-[#e5f0ff] dark:bg-blue-900/20 flex items-center justify-center">
                                    <Key size={18} className="text-blue-500" fill="currentColor" />
                                </div>
                                <span className="text-[17px] text-black dark:text-white">Change Password</span>
                            </div>
                            <ChevronRight size={20} className="text-[#c7c7cc] dark:text-slate-600" />
                        </div>
                        
                        {/* Change Email row */}
                        <div className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-[#fff0e5] dark:bg-orange-900/20 flex items-center justify-center">
                                    <Mail size={18} className="text-orange-500" fill="currentColor" />
                                </div>
                                <span className="text-[17px] text-black dark:text-white">Change Email</span>
                            </div>
                            <ChevronRight size={20} className="text-[#c7c7cc] dark:text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
