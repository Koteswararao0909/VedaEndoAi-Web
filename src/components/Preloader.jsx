import React, { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                const diff = Math.random() * 15;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] transition-opacity duration-1000 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

            <div className="relative flex flex-col items-center space-y-8 animate-fade-in">
                {/* Logo Animation */}
                <div className="relative">
                    <img src="/favicon.png" alt="VedaEndo AI" className="w-24 h-24 rounded-[2.5rem] object-contain shadow-[0_0_50px_rgba(37,99,235,0.3)] animate-float" />
                    {/* Pulsing ring around logo */}
                    <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-[3rem] animate-ping opacity-20"></div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        VedaEndo<span className="text-blue-500">AI</span>
                    </h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Initialising Clinical Neural Engine</p>
                </div>

                {/* Progress Container */}
                <div className="w-64 space-y-3">
                    <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full clinical-gradient transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest">
                            {progress < 40 ? 'Securing Environment...' : progress < 80 ? 'Loading Neural Weights...' : 'Finalizing Diagnostics...'}
                        </span>
                        <span className="text-[10px] font-black text-white tabular-nums">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="absolute bottom-12 flex flex-col items-center space-y-2 opacity-30">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>HIPAA Compliant</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span>v2.0.4</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
