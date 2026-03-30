import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Home, Activity, Users, Settings as SettingsIcon } from 'lucide-react';

function Sidebar() {
    const location = useLocation();

    // Exact Tabs from LiquidTabBar.swift
    const tabs = [
        { id: '/home', label: 'Home', icon: Home },
        { id: '/analysis', label: 'Analysis', icon: Activity },
        { id: '/registry', label: 'Registry', icon: Users },
        { id: '/settings', label: 'Settings', icon: SettingsIcon }
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-64 h-full bg-white dark:bg-[#1a1a1a] flex-col border-r border-slate-100 dark:border-slate-800 p-6 shadow-xl dark:shadow-none z-50">
                <div className="flex items-center gap-3 mb-10">
                    <img src="/favicon.png" alt="VedaEndo AI" className="w-10 h-10 rounded-xl object-contain" />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">VedaEndo AI</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {tabs.map(tab => {
                        const isActive = location.pathname.startsWith(tab.id);
                        const Icon = tab.icon;
                        return (
                            <Link
                                key={tab.id}
                                to={tab.id}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${isActive
                                    ? 'bg-[#00BFFF]/10 dark:bg-blue-500/10 text-[#00BFFF]'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile Bottom Tab Bar layout from iOS LiquidTabBar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 backdrop-blur-md">
                <div className="bg-white dark:bg-[#1c1c1e] h-[80px] rounded-[25px] shadow-[0_-5px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-5px_20px_rgba(255,255,255,0.05)] border border-slate-100 dark:border-[#2c2c2e] flex items-center justify-around px-2">
                    {tabs.map(tab => {
                        const isActive = location.pathname.startsWith(tab.id);
                        const Icon = tab.icon;
                        return (
                            <Link
                                key={tab.id}
                                to={tab.id}
                                className="flex flex-col items-center justify-center w-16 h-[80px] group"
                            >
                                <div className="relative flex flex-col items-center gap-1.5 transition-transform group-active:scale-90">
                                    {isActive && (
                                        <div className="absolute top-1/2 left-1/2 w-[55px] h-[55px] bg-[#00BFFF]/15 dark:bg-[#00BFFF]/25 rounded-full -translate-x-1/2 -translate-y-[60%]"></div>
                                    )}
                                    <Icon size={isActive ? 22 : 20} className={`z-10 ${isActive ? 'text-[#00BFFF]' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className={`z-10 text-[11px] ${isActive ? 'text-[#00BFFF] font-bold scale-105' : 'text-slate-400 font-medium'}`}>{tab.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
