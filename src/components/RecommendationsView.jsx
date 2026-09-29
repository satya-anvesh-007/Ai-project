import React, { useState } from 'react';
import {
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

export const RecommendationsView = ({ assessment, onNavigate }) => {
  const [priorityFilter, setPriorityFilter] = useState('All');

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center bg-white p-8 rounded-lg border-2 border-slate-300 shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center mx-auto border-2 border-slate-300">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Assessment Data Available</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Please complete the student assessment form to generate recommendations.
        </p>
        <button
          onClick={() => onNavigate('Analyze')}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-semibold text-xs transition-colors cursor-pointer shadow-xs"
        >
          Go to Analyze Form
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const { recommendations, studentProfile } = assessment;

  const filteredRecs = recommendations.filter((r) => {
    if (priorityFilter === 'All') return true;
    return r.priority === priorityFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            PERSONALIZED ACADEMIC ADVICE
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Advice generated for <strong className="text-slate-900">{studentProfile.name}</strong>.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md text-xs border border-slate-300 shadow-xs self-start sm:self-auto">
          {['All', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 font-semibold rounded transition-colors cursor-pointer ${
                priorityFilter === p
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {p} {p !== 'All' && `(${recommendations.filter((r) => r.priority === p).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards - strictly NO triggered rule display */}
      {filteredRecs.length > 0 ? (
        <div className="space-y-3.5">
          {filteredRecs.map((rec, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg border-2 border-slate-300 border-l-4 border-l-slate-900 p-5 shadow-xs space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {rec.title}
                    </h3>
                  </div>

                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                      Priority: {rec.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-7">
                  {rec.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg border-2 border-slate-300 text-center space-y-2">
          <p className="text-xs text-slate-500">
            No recommendations match filter <strong>{priorityFilter}</strong>.
          </p>
        </div>
      )}
    </div>
  );
};
