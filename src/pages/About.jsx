import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Users, Shield, Award, Brain, CheckCircle2 } from 'lucide-react';

function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] font-sans text-slate-900 dark:text-white animate-fade-in flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-[120px]"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500 blur-[120px]"></div>
                    </div>

                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Brain size={14} />
                            <span>Our Vision</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Advancing Endometriosis <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Care with AI</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            VedaEndo AI is dedicated to revolutionizing the diagnosis and treatment of endometriosis through cutting-edge predictive modeling and clinical data analysis.
                        </p>
                    </div>
                </section>

                {/* Bridging AI and Clinical Accuracy */}
                <section className="py-24 bg-white dark:bg-[#030712]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                                    Bridging Artificial Intelligence and Clinical Accuracy
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 font-medium">
                                    Endometriosis and other reproductive complexities take an average of 7-10 years to be correctly diagnosed conventionally. Our platform exists to empower medical professionals.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium mb-8">
                                    We utilize carefully trained neutral network architectures that analyze endometrium thickness, cycle phase, and ovarian volumetric limits. The result is a highly robust supplementary diagnostic toolkit.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        '96.4% Verified Trial Accuracy',
                                        'Instant Neural Processing',
                                        'Seamless EHR Integration',
                                        'HIPAA Compliant Data'
                                    ].map((feature, i) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                                                <CheckCircle2 size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="order-1 md:order-2 relative rounded-[40px] overflow-hidden shadow-2xl aspect-square lg:aspect-video group">
                                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    alt="Clinical AI Research"
                                />
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl z-20">
                                    <p className="text-white font-bold text-lg leading-tight">"Empowering clinicians with the most advanced diagnostic supplemental tools available today."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/50">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Our Mission</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                                    Our mission is to reduce the diagnostic delay for endometriosis patients worldwide. By providing clinicians with advanced AI-driven insights, we enable earlier detection, personalized treatment plans, and better patient outcomes.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 shadow-sm">
                                            <Target size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Precision Diagnostics</h4>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium">Leveraging deep learning to identify subtle patterns in clinical data that escape conventional observation.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 shadow-sm">
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">Patient-Centric Approach</h4>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium">Designed with the patient journey at the center of every decision, ensuring accessibility and empathy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 md:mt-0">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-transform">
                                    <Shield className="text-blue-600 dark:text-blue-400 mb-4" size={36} />
                                    <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Secure</h3>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">HIPAA-compliant data handling and enterprise-grade encryption.</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-transform lg:mt-12">
                                    <Award className="text-blue-600 dark:text-blue-400 mb-4" size={36} />
                                    <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Validated</h3>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">Models trained and validated on diverse, global clinical datasets.</p>
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

export default About;
