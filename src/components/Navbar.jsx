import { Stethoscope, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="glass-nav sticky top-0 z-50 transition-all duration-300">
            <nav className="flex items-center justify-between px-6 lg:px-12 py-5 max-w-[1440px] mx-auto">
                {/* Logo & Brand Name */}
                <div className="flex items-center gap-4 group cursor-default">
                    <img src="/favicon.png" alt="VedaEndo AI Logo" className="w-11 h-11 rounded-xl object-contain shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                            VedaEndo<span className="text-blue-600">AI</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Enterprise Platform</span>
                    </div>
                </div>

                {/* Core Navigation Links */}
                <div className="hidden lg:flex items-center gap-10">
                    {[
                        { name: 'Platform Information', path: '/platform' },
                        { name: 'Security Details', path: '/security' },
                        { name: 'About Us', path: '/about' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Actions */}
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors uppercase tracking-widest px-2">
                        Login
                    </Link>
                    <Link to="/register" className="clinical-gradient text-white font-bold px-8 py-3 rounded-xl text-sm shadow-xl shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                        Signup <ChevronRight size={18} strokeWidth={3} />
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
