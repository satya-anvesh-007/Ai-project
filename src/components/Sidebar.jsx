import React from 'react';
import {
  LayoutDashboard,
  ClipboardEdit,
  LineChart,
  Binary,
  Lightbulb,
  Info,
  CheckCircle,
} from 'lucide-react';

export const Sidebar = ({ currentTab, onSelectTab, assessment }) => {
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Analyze', icon: <ClipboardEdit className="w-4 h-4" /> },
    {
      label: 'Performance',
      icon: <LineChart className="w-4 h-4" />,
      badge: assessment ? assessment.performanceLevel : undefined,
    },
    {
      label: 'Rule Engine',
      icon: <Binary className="w-4 h-4" />,
      badge: assessment ? `${assessment.triggeredRules.length} Fired` : undefined,
    },
    {
      label: 'Recommendations',
      icon: <Lightbulb className="w-4 h-4" />,
      badge: assessment ? `${assessment.recommendations.length}` : undefined,
    },
    { label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r-2 border-slate-300 flex flex-col justify-between shrink-0">
      <div className="p-4">
        <div className="mb-6 px-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">
            Student Performance Advisor
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => onSelectTab(item.label)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-700'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {assessment && (
          <div className="mt-8 p-3 rounded-md bg-white border-2 border-slate-300 text-xs text-slate-700 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <CheckCircle className="w-3.5 h-3.5 text-slate-900" />
              <span>Assessment Completed</span>
            </div>
            <div>Student: <span className="font-semibold text-slate-900">{assessment.studentProfile.name}</span></div>
            <div>Average: <span className="font-semibold text-slate-900">{assessment.metrics.currentAverage}%</span></div>
            <div>Rules Fired: <span className="font-semibold text-slate-900">{assessment.triggeredRules.length} / {assessment.metrics.totalRulesInKb}</span></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t-2 border-slate-300 bg-white">
        <div className="text-xs text-slate-600 font-medium">
          Rule-Based Academic Expert System
        </div>
        <div className="text-xs font-bold text-slate-900 mt-1">
          Made by ANVESH & KIRAN & HARSHA
        </div>
      </div>
    </aside>
  );
};
