import React from 'react';
import {
  Info,
  BookOpen,
  Cpu,
  Layers,
  Code,
  ShieldCheck,
  GitBranch,
} from 'lucide-react';

export const AboutView = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Overview Banner */}
      <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-slate-900">
          <Info className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900">
            About Student Performance Advisor
          </h2>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">
          Student Performance Advisor is a Rule-Based Artificial Intelligence / Expert System designed to analyze academic information and provide explainable academic recommendations.
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              PROJECT OBJECTIVE
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide an explainable diagnostic system that evaluates student marks across customizable subjects, 
            attendance, and study habits using deterministic IF–THEN rules.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800">
            <Layers className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              KNOWLEDGE BASE
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Declarative collection of IF–THEN production rules representing academic standards, 
            attendance thresholds, course standing levels, and backlog recovery strategies.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800">
            <Cpu className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              INFERENCE ENGINE
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Employs forward-chaining deduction to evaluate student facts against rule conditions, 
            record triggered rules, and synthesize prioritized recommendations.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-800">
            <ShieldCheck className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              RULE-BASED AI
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike statistical machine learning models, the expert system is 100% explainable, deterministic, 
            and operates without neural networks or external APIs.
          </p>
        </div>
      </div>

      {/* Project Flow */}
      <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-slate-800" />
          PROJECT FLOW
        </h3>
        <div className="p-3.5 rounded bg-slate-50 border-2 border-slate-300 font-mono text-xs text-slate-800 text-center">
          User Input ──► Knowledge Base ──► IF–THEN Rules ──► Inference Engine ──► Performance Analysis ──► Recommendation
        </div>
      </div>

      {/* Technology & Credits */}
      <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-800">
          <Code className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wide">
            TECHNOLOGY & CREDITS
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Rule-Based AI • Python • Streamlit. No database, no authentication, no external AI APIs.
        </p>
        <p className="text-xs font-bold text-slate-900 mt-2">
          Made by ANVESH & KIRAN
        </p>
      </div>
    </div>
  );
};
