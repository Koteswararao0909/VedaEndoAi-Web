import { ChevronLeft, Circle, CheckCircle2, Mail, Info, ShieldCheck, Phone, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API_CONFIG from '../../api';

function ResetPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const requirements = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'Contains number', met: /[0-9]/.test(password) },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
        { label: 'Passwords match', met: password.length > 0 && password === confirmPassword }
    ];

    const canSubmitStep2 = requirements.every(req => req.met);

    const handleVerifyEmail = async () => {
        setError('');
        setIsLoading(true);
        try {
            const response = await fetch(API_CONFIG.AUTH.VERIFY_EMAIL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setStep(2);
            } else {
                setError(data.detail || 'Verification failed. Please check your email.');
            }
        } catch (err) {
            setError('Server connection failed. Please ensure backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setIsLoading(true);
        try {
            const response = await fetch(API_CONFIG.AUTH.RESET_PASSWORD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, new_password: password }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Password reset successfully! Redirecting...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.detail || 'Password reset failed.');
            }
        } catch (err) {
            setError('Server connection failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors duration-300">
            <div className="max-w-md w-full relative animate-fade-in">

                {/* Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => step === 1 ? navigate('/login') : setStep(1)}
                        className="text-blue-500 font-bold flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-xl transition-all active:scale-95"
                        disabled={isLoading}
                    >
                        <ChevronLeft size={20} strokeWidth={3} /> Back
                    </button>
                    <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mt-4"></div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm font-bold animate-fade-in">
                        <CheckCircle2 size={20} />
                        <span>{successMessage}</span>
                    </div>
                )}

                {step === 1 ? (
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Reset Your Password</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Enter your registered professional email address to verify your account.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Professional Email</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="medical.specialist@hospital.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[24px] py-5 px-6 pl-14 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-all font-bold shadow-sm"
                                        disabled={isLoading}
                                    />
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={24} />
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-[24px] flex gap-4 border border-blue-100 dark:border-blue-900/30">
                                <Info className="text-blue-500 shrink-0 mt-1" size={20} />
                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 leading-relaxed">
                                    Please use the email address associated with your medical license or hospital credentialing.
                                </p>
                            </div>

                            <button
                                onClick={handleVerifyEmail}
                                disabled={!email.includes('@') || isLoading}
                                className={`w-full py-6 rounded-[24px] text-xl font-black transition-all shadow-xl flex items-center justify-center gap-2 ${email.includes('@') && !isLoading
                                    ? 'clinical-gradient text-white shadow-blue-500/30 hover:scale-[1.02] active:scale-95'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Verify'}
                            </button>

                            <button className="w-full flex items-center justify-center gap-2 text-blue-500 font-bold hover:underline transition-all" disabled={isLoading}>
                                <Phone size={18} /> Need help? Contact Medical Support
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-slide-in-right">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight text-center">Reset Password</h1>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[20px] py-5 px-6 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-all font-bold shadow-sm mt-2"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[20px] py-5 px-6 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-all font-bold shadow-sm mt-2"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-black text-slate-900 dark:text-white tracking-tight">Password Requirements</h3>
                                <ul className="space-y-4">
                                    {requirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm font-bold">
                                            {req.met ? (
                                                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                                            ) : (
                                                <Circle className="text-slate-300 dark:text-slate-700 shrink-0" size={24} />
                                            )}
                                            <span className={req.met ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}>
                                                {req.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={handleResetPassword}
                                disabled={!canSubmitStep2 || isLoading}
                                className={`w-full py-6 rounded-[24px] text-xl font-black transition-all shadow-xl flex items-center justify-center gap-2 mt-8 ${canSubmitStep2 && !isLoading
                                    ? 'clinical-gradient text-white shadow-blue-500/30 hover:scale-[1.02] active:scale-95'
                                    : 'bg-slate-300 dark:bg-slate-800 text-white/50 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Confirm Password'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-12 flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-emerald-500" /> HIPAA Compliant • Secure Transmission
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 tracking-tight">
                        Your email is encrypted and never shared with third parties
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
