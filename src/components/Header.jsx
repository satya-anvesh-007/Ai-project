import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export const Header = ({ assessment, onReset }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white shadow-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
              STUDENT PERFORMANCE ADVISOR
            </h1>
            <p className="text-xs text-slate-400">
              Rule-Based Academic Expert System • Deterministic Forward-Chaining Inference
            </p>
          </div>
        </div>

        {assessment && (
          <div className="flex items-center gap-3 self-end md:self-auto bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-md text-xs">
            <div className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Active: <strong className="text-white">{assessment.studentProfile.name}</strong> ({assessment.studentProfile.rollNo})
              </span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-slate-200">
              {assessment.performanceLevel}
            </span>
            <button
              onClick={onReset}
              className="ml-2 text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
