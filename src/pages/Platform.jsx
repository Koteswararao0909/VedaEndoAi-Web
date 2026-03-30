import { Database, Activity, FileText, ShieldCheck, Stethoscope, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Platform() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] font-sans text-slate-900 dark:text-white animate-fade-in flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-1 flex flex-col">
                {/* Hero Section */}
                <section className="py-24 bg-white dark:bg-[#030712] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="max-w-3xl mb-16">
                            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase mb-3 px-4 py-1 bg-blue-50 dark:bg-blue-900/20 inline-block rounded-full">Platform Capabilities</h2>
                            <h3 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                                Everything you need in one <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Clinical Portal</span>
                            </h3>
                            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                VedaEndo AI seamlessly integrates into your practice, providing powerful tools to manage patient data and run sophisticated predictive models with surgical-grade precision.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Activity,
                                    title: 'AI Analysis Terminal',
                                    desc: 'Input real-time patient cycle metrics, ultrasound measurements, and volumes to generate immediate predictive reports using our neural networks.',
                                    color: 'blue'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'Encrypted Patient Registry',
                                    desc: 'Store, search, and manage active clinical intake forms. Total HIPAA compliance ensures your PHI data remains encrypted and isolated.',
                                    color: 'indigo'
                                },
                                {
                                    icon: Stethoscope,
                                    title: 'Clinical Dashboard',
                                    desc: 'Get a bird\'s eye view over your diagnostic success rates, require-action metrics, and daily patient inflow seamlessly in real-time.',
                                    color: 'blue'
                                }
                            ].map((feature, i) => (
                                <div key={i} className="group bg-slate-50 dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 text-blue-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon size={32} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Detailed Features Section */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 shrink-0 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Database size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Enterprise Data Management</h4>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            Manage thousands of patient records with our high-performance database layer. Support for bulk imports, detailed filtering, and historical trend analysis.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 shrink-0 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Surgical-Grade Reporting</h4>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                            Generate comprehensive, easy-to-read PDF reports that satisfy clinical documentation requirements and provide clear value to patients.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[48px] blur-2xl opacity-10 animate-pulse"></div>
                                <div className="relative bg-white dark:bg-slate-900 rounded-[40px] p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">

                                    <div className="space-y-6">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse"></div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Platform;
