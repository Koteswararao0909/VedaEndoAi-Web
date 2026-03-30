import React from 'react';
import { ChevronRight, Shield, Activity, Brain, Users, ArrowRight, Zap, Globe, MessageSquare, CheckCircle, Stethoscope, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500 overflow-x-hidden font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden pt-20 pb-24">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-indigo-500/10 rounded-full blur-[100px] animate-float"></div>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                    <div className="flex flex-col items-center text-center space-y-10 animate-fade-in max-w-5xl mx-auto">


                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            Next-Generation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">Endometrial Intelligence</span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                            Empowering reproductive endocrinologists with surgical-grade neural diagnostics, real-time clinical analytics, and seamless patient management.
                        </p>



                        <div className="pt-12 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300"><Shield size={24} /> HIPAA Compliant</div>
                            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300"><Activity size={24} /> 99.9% Uptime</div>
                            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300"><Stethoscope size={24} /> Clinically Validated</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-[#0a0f1c] relative z-10 border-t border-slate-100 dark:border-slate-800/50">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                            Advanced Clinical Workflows
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                            Designed specifically for IVF clinics and reproductive specialists to streamline diagnostics and improve patient outcomes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Brain size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Neural Architecture</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Leverage our proprietary AI models trained on thousands of successful IVF cycles to accurately predict endometrial receptivity.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LineChart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Real-time Analytics</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Instantly calculate probabilities, track morphology, and monitor multifollicular development with visual data dashboards.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Registry Management</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Maintain an organized, secure, and easily searchable digital registry of all your clinical patients in one centralized platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </div>
    );
}
