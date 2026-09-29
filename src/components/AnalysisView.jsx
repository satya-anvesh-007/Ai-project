import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Binary,
  ArrowRight,
} from 'lucide-react';

export const AnalysisView = ({ assessment, onNavigate }) => {
  const { metrics, performanceLevel, subjectsAnalysis, strengths, weaknesses } =
    assessment;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Student Banner */}
      <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Academic Performance
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            {assessment.studentProfile.name} ({assessment.studentProfile.rollNo})
          </h2>
          <p className="text-xs text-slate-600">
            {assessment.studentProfile.branch} • {assessment.studentProfile.year}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('Analyze')}
            className="px-3.5 py-1.5 rounded-md border-2 border-slate-300 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            Edit Inputs
          </button>
          <button
            onClick={() => onNavigate('Recommendations')}
            className="px-4 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Recommendations ({assessment.recommendations.length})
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Performance
          </div>
          <div className="text-base font-bold text-slate-900 mt-1">
            {performanceLevel}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Current Average
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {metrics.currentAverage}%
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Attendance
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {metrics.attendance}%
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Study Hours
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {metrics.studyHours} <span className="text-xs font-normal text-slate-500">hrs/day</span>
          </div>
        </div>
      </div>

      {/* Performance Level Card */}
      <div className="bg-white rounded-lg border-l-4 border-l-slate-900 border-t-2 border-r-2 border-b-2 border-slate-300 p-6 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
          Overall Performance Level
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {performanceLevel}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          {assessment.performanceLevelDesc}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t-2 border-slate-200">
          <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
            <span className="font-bold text-slate-700">Current Average Progress</span>
            <span className="font-mono font-bold text-slate-900">{metrics.currentAverage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border-2 border-slate-300">
            <div
              className="h-full rounded-full bg-slate-800 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, metrics.currentAverage))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subject Analysis Breakdown */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Subject Analysis</h3>
          <p className="text-xs text-slate-500">
            Classification: 90–100: Excellent • 75–89: Strong • 60–74: Satisfactory • 40–59: Needs Attention • 0–39: Weak
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {subjectsAnalysis.map((sub) => (
            <div
              key={sub.subject}
              className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {sub.subject}
                </div>
                <div className="text-2xl font-extrabold text-slate-900 my-1.5">
                  {sub.marks}%
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                  {sub.category}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                {sub.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border-2 border-slate-300 p-5 shadow-xs border-t-4 border-t-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-slate-800" />
            <h4 className="text-sm font-bold text-slate-900">Academic Strengths</h4>
          </div>

          {strengths.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-700">
              {strengths.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold shrink-0">✓</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">
              No prominent academic strengths detected in this cycle.
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg border-2 border-slate-300 p-5 shadow-xs border-t-4 border-t-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-slate-800" />
            <h4 className="text-sm font-bold text-slate-900">Areas Requiring Attention</h4>
          </div>

          {weaknesses.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-700">
              {weaknesses.map((wk, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold shrink-0">⚠</span>
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">
              No critical deficiencies detected. Maintain your current study consistency.
            </p>
          )}
        </div>
      </div>

      {/* Navigation Prompts */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => onNavigate('Rule Engine')}
          className="flex-1 py-3 px-4 rounded-md border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Binary className="w-4 h-4 text-slate-800" />
          Inspect Triggered Rules ({assessment.triggeredRules.length})
        </button>
        <button
          onClick={() => onNavigate('Recommendations')}
          className="flex-1 py-3 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <Lightbulb className="w-4 h-4" />
          View Personalized Academic Advice ({assessment.recommendations.length})
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
