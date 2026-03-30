import { HeartPulse, Stethoscope, Building2 } from 'lucide-react';

function Footer() {
    return (
        <footer id="partners" className="bg-white dark:bg-slate-900 py-12 flex-shrink-0 mt-auto transition-colors duration-200">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200 dark:border-slate-800 pt-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Stethoscope size={20} className="text-blue-600" />
                        <span className="font-bold text-slate-900">VedaEndo AI</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">&copy; {new Date().getFullYear()} VedaEndo AI. All rights reserved.</p>
                </div>

                {/* Links removed as per user request */}
            </div>
        </footer>
    );
}

export default Footer;
