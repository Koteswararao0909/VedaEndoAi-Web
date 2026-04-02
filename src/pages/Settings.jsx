import React, { useState } from 'react';
import { Bell, Moon, Shield, FileText, ArrowRightSquare, Trash2, ChevronRight, User, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../api';

export default function Settings() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isDark = theme === 'dark';

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
            navigate('/login');
        }, 1200);
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            const userToken = localStorage.getItem('userToken');
            const response = await fetch(API_CONFIG.AUTH.DELETE_ACCOUNT, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('userToken');
                localStorage.removeItem('userEmail');
                navigate('/login');
            } else {
                const data = await response.json();
                alert(data.detail || 'Failed to delete account');
            }
        } catch (err) {
            alert('Connection error during account deletion');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black p-4 lg:p-8 space-y-6 pb-32">
            <div className="pt-4 px-2 max-w-4xl">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
            </div>

            <div className="px-2 space-y-6 max-w-4xl">
                {/* Profile Card */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/50 flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
                            <User className="text-slate-400" size={40} fill="currentColor" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Medical Professional</h2>
                            <span className="text-sm text-slate-500">Clinical Specialist</span>
                            <span className="text-xs text-slate-400 mt-1">doctor@vedaendo.com</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold text-sm"
                    >
                        View Professional Profile
                    </button>
                </div>

                {/* App Settings */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white px-2">App Settings</h3>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/50 divide-y divide-slate-100 dark:divide-slate-800">
                        <ToggleRow icon={Moon} iconColor="text-indigo-500" iconBg="bg-indigo-500/10" title="Dark Mode" sub="Switch between themes" isEnabled={isDark} onToggle={toggleTheme} />
                    </div>
                </div>

                {/* Security */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white px-2">Security</h3>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/50 divide-y divide-slate-100 dark:divide-slate-800">
                        <ActionRow icon={Shield} iconColor="text-purple-500" iconBg="bg-purple-500/10" title="Security" sub="App security settings" onClick={() => navigate('/settings/security')} />
                        <ActionRow icon={FileText} iconColor="text-orange-500" iconBg="bg-orange-500/10" title="Terms & Policies" sub="View terms and conditions" />
                    </div>
                </div>

                {/* Account Actions */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white px-2">Account Actions</h3>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/50 p-3 flex flex-col gap-2">
                        <ActionRow
                            icon={ArrowRightSquare}
                            iconColor="text-slate-500"
                            iconBg="bg-slate-500/10"
                            title="Log Out"
                            sub="Sign out of your account"
                            isDanger={false}
                            standalone
                            onClick={() => setShowLogoutModal(true)}
                        />
                        <ActionRow icon={Trash2} iconColor="text-red-500" iconBg="bg-red-500/10" title="Delete Account" sub="Permanently delete your account" isDanger standalone onClick={() => setShowDeleteModal(true)} />
                    </div>
                </div>

                <div className="pt-2 text-center flex flex-col gap-1 pb-4">
                    <span className="text-xs text-slate-400">VedaEndo AI v1.0.0</span>
                    <span className="text-[10px] text-slate-400">© 2024 VedaEndo. All rights reserved.</span>
                </div>
            </div>
            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-[2px] animate-fade-in px-4" onClick={() => setShowLogoutModal(false)}>
                    <div 
                        className="bg-[#f2f2f7] dark:bg-[#1c1c1e] w-full max-w-[320px] rounded-[32px] p-6 shadow-2xl animate-scale-up border border-white/20 dark:border-white/5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center gap-2 mb-6">
                            <h3 className="text-[17px] font-semibold text-black dark:text-white">Log Out</h3>
                            <p className="text-[13px] text-[#8e8e93] text-center">Are you sure you want to log out?</p>
                        </div>
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                disabled={isLoggingOut}
                                className="flex-1 bg-[#e5e5ea] dark:bg-[#2c2c2e] hover:bg-[#d1d1d6] dark:hover:bg-[#3a3a3c] text-black dark:text-white font-semibold py-3 rounded-[20px] transition-colors text-[16px] disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex-1 flex justify-center items-center gap-2 bg-[#e5e5ea] dark:bg-[#2c2c2e] hover:bg-[#d1d1d6] dark:hover:bg-[#3a3a3c] text-[#ff3b30] dark:text-[#ff453a] font-semibold py-3 rounded-[20px] transition-colors text-[16px] disabled:opacity-50"
                            >
                                {isLoggingOut ? <Loader2 className="animate-spin" size={18} /> : null}
                                {isLoggingOut ? 'Logging...' : 'Log Out'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-[2px] animate-fade-in px-4" onClick={() => setShowDeleteModal(false)}>
                    <div 
                        className="bg-[#f2f2f7] dark:bg-[#1c1c1e] w-full max-w-[320px] rounded-[32px] p-6 shadow-2xl animate-scale-up border border-white/20 dark:border-white/5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center gap-2 mb-6 text-center">
                            <h3 className="text-[17px] font-semibold text-black dark:text-white">Delete Account</h3>
                            <p className="text-[13px] text-[#8e8e93] leading-tight">This action cannot be undone. All your data will be permanently deleted.</p>
                        </div>
                        <div className="flex gap-3 w-full">
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                disabled={isDeleting}
                                className="flex-1 bg-[#e5e5ea] dark:bg-[#2c2c2e] hover:bg-[#d1d1d6] dark:hover:bg-[#3a3a3c] text-black dark:text-white font-semibold py-3 rounded-[20px] transition-colors text-[16px] disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="flex-1 flex justify-center items-center gap-2 bg-[#e5e5ea] dark:bg-[#2c2c2e] hover:bg-[#d1d1d6] dark:hover:bg-[#3a3a3c] text-[#ff3b30] dark:text-[#ff453a] font-semibold py-3 rounded-[20px] transition-colors text-[16px] disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 className="animate-spin" size={18} /> : null}
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ToggleRow({ icon: Icon, iconColor, iconBg, title, sub, isEnabled, onToggle }) {
    return (
        <div className="flex items-center justify-between p-4 px-5">
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <Icon size={18} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{title}</span>
                    <span className="text-xs text-slate-500">{sub}</span>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors ${isEnabled ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
        </div>
    );
}

function ActionRow({ icon: Icon, iconColor, iconBg, title, sub, isDanger, standalone, onClick }) {
    return (
        <div onClick={onClick} className={`flex items-center justify-between ${standalone ? 'p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer' : 'p-4 px-5'} ${isDanger && standalone ? 'bg-red-50 dark:bg-red-500/10 hover:bg-red-100' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <Icon size={18} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className={`text-sm font-medium ${isDanger ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{title}</span>
                    <span className="text-xs text-slate-500">{sub}</span>
                </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
        </div>
    );
}
