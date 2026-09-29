import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Cpu,
  HelpCircle,
  CheckCircle2,
  Award,
} from 'lucide-react';

export const DashboardView = ({ onNavigate }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-lg p-6 sm:p-10 text-white shadow-xs border border-slate-800">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            STUDENT <br />
            PERFORMANCE <br />
            ADVISOR
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Understand your academic performance and receive personalized recommendations using an explainable rule-based expert system.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('Analyze')}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-950 px-5 py-2.5 rounded-md font-semibold text-sm transition-all cursor-pointer shadow-xs"
            >
              Analyze
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('Rule Engine')}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-md font-semibold text-sm transition-all cursor-pointer"
            >
              View How It Works
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Four Feature Cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
            <div className="w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Academic Analysis</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Analyze marks, attendance and study habits.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
            <div className="w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Rule-Based Reasoning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use IF–THEN rules to evaluate performance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
            <div className="w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Explainable Results</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              See exactly why each recommendation was generated.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
            <div className="w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">4. Personalized Advice</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive academic recommendations based on your inputs.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Diagram Section */}
      <div className="bg-white rounded-lg border-2 border-slate-300 p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">How It Works</h3>
          <p className="text-xs text-slate-500">
            Expert System Reasoning Flow:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-4 rounded-md bg-slate-50 border-2 border-slate-300 text-center">
            <div className="text-xs font-bold text-slate-900 uppercase mb-1">
              INPUT
            </div>
            <div className="text-xs text-slate-600">
              Student academic information.
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border-2 border-slate-300 text-center">
            <div className="text-xs font-bold text-slate-900 uppercase mb-1">
              KNOWLEDGE BASE
            </div>
            <div className="text-xs text-slate-600">
              Collection of IF–THEN academic rules.
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border-2 border-slate-300 text-center">
            <div className="text-xs font-bold text-slate-900 uppercase mb-1">
              INFERENCE ENGINE
            </div>
            <div className="text-xs text-slate-600">
              Checks which rules are satisfied.
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border-2 border-slate-300 text-center">
            <div className="text-xs font-bold text-slate-900 uppercase mb-1">
              ANALYSIS
            </div>
            <div className="text-xs text-slate-600">
              Identifies strengths and weaknesses.
            </div>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border-2 border-slate-300 text-center">
            <div className="text-xs font-bold text-slate-900 uppercase mb-1">
              RECOMMENDATION
            </div>
            <div className="text-xs text-slate-600">
              Provides academic advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
