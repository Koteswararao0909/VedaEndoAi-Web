import React from 'react';
import { ChevronLeft, Stethoscope, History, Brain, AlignVerticalSpaceAround } from 'lucide-react';
import { getMorphology } from '../../utils/morphology';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PatientHistory() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get real patient data from state
    const p = location.state?.patient || {
        name: 'No Record',
        age: 0,
        medical_id: '---',
        is_analyzed: false,
        cycle_day: '--',
        endometrium_thickness: '--',
        ro_value: '--',
        lo_value: '--',
        analysis_score: 0,
        condition: ''
    };

    const status = p.is_analyzed ? (p.analysis_score >= 14 ? 'OPTIMAL' : 'NON-RECEPTIVE') : 'PENDING ANALYSIS';
    const statusColor = p.is_analyzed ? (p.analysis_score >= 14 ? 'text-emerald-500' : 'text-orange-500') : 'text-slate-400';

    const formatDate = (isoString) => {
        if (!isoString) return '--';
        const d = new Date(isoString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getScoreCategory = (score) => {
        if (score >= 14) return { label: 'HIGH', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' };
        if (score >= 10) return { label: 'MODERATE', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' };
        return { label: 'LOW', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' };
    };

    const latestHistory = p.analysis_history?.length > 0
        ? [...p.analysis_history].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        : null;

    const displayCycleDay = p.cycle_day && p.cycle_day !== '--' ? p.cycle_day : (latestHistory?.cycle_day || '--');
    const displayRo = p.ro_value && p.ro_value !== '--' ? p.ro_value : (latestHistory?.ro_value || '--');
    const displayLo = p.lo_value && p.lo_value !== '--' ? p.lo_value : (latestHistory?.lo_value || '--');
    const displayThickness = p.endometrium_thickness && p.endometrium_thickness !== '--' ? p.endometrium_thickness : (latestHistory?.endometrium_thickness || '--');

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 lg:p-8 space-y-6 pb-32">
            {/* Header */}
            <div className="pt-4 px-2 mb-6 max-w-4xl mx-auto">
                <div className="relative flex items-center justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 lg:-ml-6 flex items-center text-blue-500 font-medium active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={24} className="-ml-1" />
                    </button>
                    <h1 className="text-[17px] font-bold text-slate-900 dark:text-white">Clinical Patient File</h1>
                </div>
            </div>

            <div className="px-2 max-w-4xl mx-auto space-y-5 lg:ml-6">

                {/* Patient Main Card */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-1.5">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{p.name}</h2>
                            <div className="flex items-center gap-1.5 font-bold">
                                <Stethoscope size={20} className="text-blue-500" />
                                <span className={statusColor}>{status}</span>
                            </div>
                        </div>
                        <div className="bg-blue-500/10 dark:bg-blue-900/30 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[90px] border border-blue-500/20">
                            <span className="text-[11px] text-blue-500 font-black uppercase tracking-widest mb-1">Cycle Day</span>
                            <span className="text-[28px] font-black text-blue-600 leading-none">{displayCycleDay}</span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-slate-100 dark:bg-slate-800 w-full mb-6" />

                    <div className="flex gap-8 lg:gap-16">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] lg:text-[12px] text-slate-400 font-black uppercase tracking-widest">Patient ID</span>
                            <span className="text-[16px] lg:text-[18px] font-black text-slate-900 dark:text-white tracking-tight">{p.medical_id}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] lg:text-[12px] text-slate-400 font-black uppercase tracking-widest">Age</span>
                            <span className="text-[16px] lg:text-[18px] font-black text-slate-900 dark:text-white tracking-tight">{p.age} Yrs</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] lg:text-[12px] text-slate-400 font-black uppercase tracking-widest">Baseline Condition</span>
                            <span className={`text-[16px] lg:text-[18px] font-black tracking-tight ${p.condition ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{p.condition || 'Not Provided'}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">Reproductive Metrics</h3>

                    {/* Ovaries Row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-lg">
                                R
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Right Ovary</span>
                                <span className="text-xl font-black text-slate-900 dark:text-white">{displayRo} mm</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-black text-lg">
                                L
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Left Ovary</span>
                                <span className="text-xl font-black text-slate-900 dark:text-white">{displayLo} mm</span>
                            </div>
                        </div>
                    </div>

                    {/* Endometrium Card */}
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                        <div className="text-emerald-500">
                            <AlignVerticalSpaceAround size={32} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <span className="text-sm font-bold text-slate-500">Endometrium Thickness</span>
                            <div className="flex items-end gap-4">
                                <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">{displayThickness} mm</span>
                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest pb-1 opacity-80">Morphology: {getMorphology(displayThickness !== '--' ? displayThickness : null)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                {p.is_analyzed && (
                    <div className={`${getScoreCategory(p.analysis_score).bg} border rounded-3xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Brain className={`text-xl ${getScoreCategory(p.analysis_score).color}`} size={24} />
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Latest AI Insights</h3>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-lg font-black tracking-tight ${getScoreCategory(p.analysis_score).color}`}>
                                Implantation Score: {getScoreCategory(p.analysis_score).label} ({p.analysis_score.toFixed(1)}/20)
                            </h4>
                        </div>
                        <p className="text-[14px] font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                            {p.analysis_score >= 14
                                ? "Window of implantation is optimal. Recommendation: Proceed with embryo transfer protocol."
                                : "Window of implantation is sub-optimal. Recommendation: Consider delaying transfer or clinical review."}
                        </p>
                    </div>
                )}

                {/* Analysis History List */}
                {p.analysis_history && p.analysis_history.length > 0 && (
                    <div className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <History className="text-blue-500" size={20} />
                                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Previous Analysis History</h3>
                            </div>
                            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Tap to view details</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {[...p.analysis_history]
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((hist) => (
                                    <div key={hist.id} className="bg-white dark:bg-[#1a1a1a] p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-500/30 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] text-slate-500 font-semibold mb-1">{formatDate(hist.date)}</span>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[16px] font-black text-slate-900 dark:text-white">Receptivity Analysis</span>
                                                {hist.doctor_name && (
                                                    <span className="text-[11px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-500/20">
                                                        by {hist.doctor_name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Cycle</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{hist.cycle_day || '--'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Thick.</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{hist.endometrium_thickness || '--'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">RO</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{hist.ro_value || '--'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">LO</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{hist.lo_value || '--'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full ${getScoreCategory(hist.score).bg} border`}>
                                            <span className={`text-[17px] font-black ${getScoreCategory(hist.score).color}`}>
                                                {Number(hist.score).toFixed(1)}/20
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Timeline Placeholder */}
                {!p.is_analyzed && (!p.analysis_history || p.analysis_history.length === 0) && (
                    <div className="py-12 text-center bg-white dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <History size={40} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-500 font-bold">No analysis history found for this subject.</p>
                        <button
                            onClick={() => navigate('/analysis')}
                            className="mt-4 text-blue-500 font-bold hover:underline"
                        >
                            Execute New Analysis
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
