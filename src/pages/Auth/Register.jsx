import { User, Mail, Hash, Stethoscope, Building2, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, AlertCircle, Loader2, MapPin, Phone, GraduationCap, Clock, Circle, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import API_CONFIG from '../../APIConfig';

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        license_number: '',
        specialization: '',
        clinic_name: '',
        hospital_address: '',
        mobile_number: '',
        medical_school: '',
        years_of_experience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validation during typing
        if (name === 'full_name') {
            // Only allow alphabets and spaces
            if (value !== '' && !/^[a-zA-Z\s]*$/.test(value)) return;
        }
        
        if (name === 'mobile_number') {
            // Only allow numbers and limit to 10
            if (value !== '' && !/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        if (name === 'years_of_experience') {
            // Only allow numbers and limit to 2 characters
            if (value !== '' && !/^\d*$/.test(value)) return;
            if (value.length > 2) return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.password.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
        { label: 'Contains number', met: /[0-9]/.test(formData.password) },
        { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(formData.password) }
    ];

    const isPasswordValid = passwordRequirements.every(req => req.met);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Final validations
        if (formData.mobile_number.length !== 10) {
            setError('Mobile number must be exactly 10 digits.');
            return;
        }

        if (!isPasswordValid) {
            setError('Password does not meet the required security standards.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(API_CONFIG.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Success - Redirect to login with a message or auto-login
                // For simplicity, we'll auto-login by just navigating to login
                alert('Account created successfully! Please sign in.');
                navigate('/login');
            } else {
                setError(data.detail || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Unable to reach the server. Please ensure the backend is running.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center transition-colors duration-300">
            <div className="max-w-2xl w-full animate-fade-in">

                <div className="mb-10 text-center flex flex-col items-center">
                    <img src="/favicon.png" alt="VedaEndo AI Logo" className="w-16 h-16 rounded-[2rem] object-contain shadow-2xl shadow-blue-500/30 mb-6 animate-float" />
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        VedaEndo<span className="text-blue-600 font-bold">AI</span>
                    </h2>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Request Professional Access</p>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center italic tracking-tight underline decoration-blue-500/30 underline-offset-8">Clinical Account Request</h1>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="md:col-span-2 relative group">
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    placeholder="Full Name (Dr. First Last)"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="md:col-span-2 relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Professional Medical Email"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="relative group">
                                <input
                                    type="text"
                                    name="license_number"
                                    value={formData.license_number}
                                    onChange={handleChange}
                                    placeholder="Medical License No."
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="relative group">
                                <select
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none"
                                    disabled={isLoading}
                                >
                                    <option value="" disabled>Select Specialization</option>
                                    <option value="Radiologist">Radiologist</option>
                                    <option value="Pathologist">Pathologist</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                </select>
                                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={18} />
                            </div>

                            <div className="md:col-span-2 relative group">
                                <input
                                    type="text"
                                    name="clinic_name"
                                    value={formData.clinic_name}
                                    onChange={handleChange}
                                    placeholder="Clinic / Hospital Name"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="md:col-span-2 relative group">
                                <input
                                    type="text"
                                    name="hospital_address"
                                    value={formData.hospital_address}
                                    onChange={handleChange}
                                    placeholder="Hospital Address"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="relative group">
                                <input
                                    type="tel"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="relative group">
                                <input
                                    type="text"
                                    name="medical_school"
                                    value={formData.medical_school}
                                    onChange={handleChange}
                                    placeholder="Medical School"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="relative group">
                                <input
                                    type="text"
                                    name="years_of_experience"
                                    value={formData.years_of_experience}
                                    onChange={handleChange}
                                    placeholder="Years of Experience"
                                    required
                                    autoComplete="off"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>

                            <div className="md:col-span-2 relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create Secure Password"
                                    required
                                    autoComplete="new-password"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-5 pl-12 pr-12 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    disabled={isLoading}
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" disabled={isLoading}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Password Requirements Checklist */}
                            {formData.password.length > 0 && (
                                <div className="md:col-span-2 space-y-3 bg-white/50 dark:bg-white/5 p-5 rounded-2xl border border-white/20 animate-fade-in">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Security Standard</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {passwordRequirements.map((req, i) => (
                                            <div key={i} className={`flex items-center gap-2 text-[11px] font-bold ${req.met ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {req.met ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                                <span>{req.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="md:col-span-2 mt-4 flex items-start gap-4 glass-card p-4 rounded-2xl border-blue-500/10">
                                <div className="flex items-center h-6 mt-1">
                                    <input type="checkbox" required className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all" disabled={isLoading} />
                                </div>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider">
                                    I verify that I am a licensed medical professional and agree to HIPAA Data Privacy regulations and Clinical Terms of Service.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full clinical-gradient py-5 px-4 rounded-2xl shadow-xl shadow-blue-500/30 text-white font-extrabold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={22} /> Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account <ChevronRight size={22} strokeWidth={3} />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center pt-6">
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight">
                                Existing Member?{' '}
                                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Secure Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                    <ShieldCheck size={14} /> End-to-End Enterprise Encryption
                </div>
            </div>
        </div>
    );
}

export default Register;
