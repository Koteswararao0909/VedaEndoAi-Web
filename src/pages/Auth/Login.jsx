import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronRight, ChevronLeft, Stethoscope, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import API_CONFIG from '../../APIConfig';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(API_CONFIG.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.full_name);
                localStorage.setItem('userToken', data.access_token);
                localStorage.setItem('userLicense', data.license_number);
                localStorage.setItem('userSpecialization', data.specialization);
                localStorage.setItem('userClinic', data.clinic_name);
                localStorage.setItem('userAddress', data.hospital_address);
                localStorage.setItem('userPhone', data.mobile_number);
                localStorage.setItem('userSchool', data.medical_school);
                localStorage.setItem('userExperience', data.years_of_experience);
                navigate('/home');
            } else {
                setError(data.detail || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Unable to connect to the medical server. Please ensure the backend is running.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors duration-300">
            <div className="max-w-md w-full animate-fade-in">
                {/* Back Button */}
                <div className="mb-8 text-left">
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-500 font-bold flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-xl transition-all active:scale-95"
                    >
                        <ChevronLeft size={20} strokeWidth={3} /> Back to Home
                    </button>
                    <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mt-4"></div>
                </div>

                <div className="text-center">
                    {/* Brand */}
                    <div className="mb-10 flex flex-col items-center">
                        <img src="/favicon.png" alt="VedaEndo AI Logo" className="w-16 h-16 rounded-[2rem] object-contain shadow-2xl shadow-blue-500/30 mb-6 animate-float" />
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            VedaEndo<span className="text-blue-600 font-bold">AI</span>
                        </h2>
                        <p className="mt-3 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Secure Clinical Gateway</p>
                    </div>

                    <div className="glass-card p-10 rounded-[3rem] border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] text-left">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center italic tracking-tight">Professional Sign In</h1>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Medical Email"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                </div>

                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Registry Password"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 pr-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="hidden" />
                                    <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded-md flex items-center justify-center group-hover:border-blue-500 transition-colors bg-white dark:bg-slate-800">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm opacity-0 group-hover:opacity-50"></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-tight">Stay Active</span>
                                </label>
                                <Link to="/reset-password" underline="none" className="text-sm font-extrabold text-blue-600 dark:text-blue-400 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full clinical-gradient py-5 px-4 rounded-2xl shadow-xl shadow-blue-500/30 text-white font-extrabold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={22} /> Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Portal <ChevronRight size={22} strokeWidth={3} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center space-y-4">
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                                New Practitioner?{' '}
                                <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                        <ShieldCheck size={14} /> HIPAA Encrypted Clinical Environment
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
