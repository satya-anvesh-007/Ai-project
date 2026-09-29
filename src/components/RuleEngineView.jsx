import React, { useState } from 'react';
import {
  Binary,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Layers,
  Zap,
} from 'lucide-react';
import { KNOWLEDGE_BASE_RULES } from '../knowledgeBase.js';

export const RuleEngineView = ({ assessment }) => {
  const [filterMode, setFilterMode] = useState('all');
  const [expandedRules, setExpandedRules] = useState({});

  const toggleExpand = (ruleId) => {
    setExpandedRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  const totalRules = KNOWLEDGE_BASE_RULES.length;
  const triggeredCount = assessment ? assessment.triggeredRules.length : 0;
  const recsCount = assessment ? assessment.recommendations.length : 0;

  const combinedRules = KNOWLEDGE_BASE_RULES.map((rule) => {
    const isTriggered = assessment
      ? assessment.triggeredRules.some((r) => r.ruleId === rule.ruleId)
      : false;
    const triggeredInfo = assessment?.triggeredRules.find((r) => r.ruleId === rule.ruleId);
    const nonTriggeredInfo = assessment?.nonTriggeredRules.find((r) => r.ruleId === rule.ruleId);

    return {
      ruleId: rule.ruleId,
      title: rule.title,
      conditionDesc: rule.conditionDesc,
      inferenceDesc: rule.inferenceDesc,
      category: rule.category,
      priority: rule.priority,
      isTriggered,
      evalDetails: triggeredInfo?.conditionDetails || nonTriggeredInfo?.conditionDetails || 'Pending assessment execution',
      payload: triggeredInfo?.payload,
    };
  });

  const displayedRules = combinedRules.filter((r) => {
    if (filterMode === 'triggered') return r.isTriggered;
    if (filterMode === 'not_triggered') return !r.isTriggered;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Header explanation banner */}
      <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-slate-900">
          <Binary className="w-5 h-5" />
          <h2 className="text-xl font-bold text-slate-900">Rule-Based Inference Engine</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The system evaluates student information against a <strong>Knowledge Base of declarative IF–THEN rules</strong>. 
          When a condition is satisfied, the corresponding rule is triggered and contributes to the final academic recommendation.
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            TOTAL RULES IN KB
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalRules}</div>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            RULES TRIGGERED
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {assessment ? `${triggeredCount}` : '0'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            RECOMMENDATIONS
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {assessment ? `${recsCount}` : '0'}
          </div>
        </div>
      </div>

      {/* Visual Explainable Inference Trace */}
      {assessment && assessment.inferenceTrace.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-slate-300 p-6 shadow-xs space-y-4">
          <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-800" />
                Explainable Inference Trace
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-900 border border-slate-300 shadow-xs">
              {assessment.inferenceTrace.length} Steps
            </span>
          </div>

          <div className="space-y-3">
            {assessment.inferenceTrace.map((step) => (
              <div
                key={step.stepId}
                className="bg-white border-2 border-slate-300 rounded-md p-4 text-xs text-slate-700 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-slate-900">
                    STEP #{step.stepId} • RULE {step.ruleId}: {step.ruleTitle}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-800 border border-slate-300">
                    TRIGGERED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200">
                  <div>
                    <div className="text-[11px] font-bold text-slate-600">Student Input Fact:</div>
                    <div className="font-mono text-slate-900 mt-0.5">{step.inputFact}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-600">Evaluated Condition:</div>
                    <code className="text-slate-900 text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 block mt-0.5">
                      {step.conditionCheck}
                    </code>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold text-slate-600">Inferred Consequence:</div>
                    <div className="font-medium text-slate-900">{step.inferredFact}</div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-[11px] font-bold text-slate-600">Action:</div>
                    <div className="font-bold text-slate-900">{step.actionTaken}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Production Rules Catalog */}
      <div className="bg-white rounded-lg border-2 border-slate-300 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-800" />
              Production Rules Status
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md text-xs border border-slate-300 shadow-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              All Rules ({totalRules})
            </button>
            <button
              onClick={() => setFilterMode('triggered')}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                filterMode === 'triggered'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Triggered ({triggeredCount})
            </button>
            <button
              onClick={() => setFilterMode('not_triggered')}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                filterMode === 'not_triggered'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Non-Triggered ({totalRules - triggeredCount})
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {displayedRules.map((rule) => {
            const isExpanded = expandedRules[rule.ruleId] ?? rule.isTriggered;
            return (
              <div
                key={rule.ruleId}
                className="border-2 border-slate-300 rounded-md bg-white overflow-hidden shadow-xs"
              >
                <div
                  onClick={() => toggleExpand(rule.ruleId)}
                  className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-900 border border-slate-300">
                      {rule.ruleId}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {rule.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {rule.conditionDesc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {rule.isTriggered ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-900 border border-slate-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-slate-900" />
                        TRIGGERED
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">
                        Not Triggered
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-200 text-xs text-slate-700 space-y-2 bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-white border border-slate-300">
                        <span className="font-bold text-slate-800 block mb-1">
                          Condition:
                        </span>
                        <code className="text-slate-900 block text-[11px]">
                          {rule.conditionDesc}
                        </code>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Evaluation: <strong>{rule.evalDetails}</strong>
                        </span>
                      </div>

                      <div className="p-3 rounded bg-white border border-slate-300">
                        <span className="font-bold text-slate-800 block mb-1">
                          Inference:
                        </span>
                        <div className="text-slate-800 text-[11px] font-medium">
                          {rule.inferenceDesc}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
