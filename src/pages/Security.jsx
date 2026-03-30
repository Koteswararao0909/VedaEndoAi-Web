import { Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Security() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-white animate-fade-in flex flex-col transition-colors duration-200">
            <Navbar />

            <main className="flex-1 flex flex-col">
                <section className="py-24 bg-slate-50 dark:bg-slate-800/50 flex-1">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-8 shadow-sm">
                            <Lock size={40} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Uncompromising Data Security</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
                            We understand that medical data is highly sensitive. VedaEndo AI employs state-of-the-art encryption and strictly adheres to global healthcare data privacy standards.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {[
                                { title: 'HIPAA Compliant', desc: 'Full compliance with the Health Insurance Portability and Accountability Act.' },
                                { title: 'End-to-End Encryption', desc: 'Data is encrypted both in transit (TLS 1.3) and at rest (AES-256).' },
                                { title: 'Role-Based Access', desc: 'Granular access controls ensure only authorized personnel view PHI.' },
                                { title: 'Audit Logging', desc: 'Comprehensive logs of all system access and data modifications.' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-left hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{item.title}</h4>
                                    <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Security;
