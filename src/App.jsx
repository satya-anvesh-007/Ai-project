import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { AssessmentView } from './components/AssessmentView.jsx';
import { AnalysisView } from './components/AnalysisView.jsx';
import { RuleEngineView } from './components/RuleEngineView.jsx';
import { RecommendationsView } from './components/RecommendationsView.jsx';
import { AboutView } from './components/AboutView.jsx';
import { runInferenceEngine } from './inferenceEngine.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Dashboard');

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: 'CSE',
    year: '3rd Year',
    subjects: [],
    currentAverage: 0,
    attendance: 75,
    studyHours: 2,
    failedSubjects: 0,
  });

  const [assessment, setAssessment] = useState(null);

  const handleAssessmentSubmit = (data) => {
    setFormData(data);
    const result = runInferenceEngine(data);
    setAssessment(result);
    setCurrentTab('Performance');
  };

  const handleReset = () => {
    const emptyForm = {
      name: '',
      rollNo: '',
      branch: 'CSE',
      year: '3rd Year',
      subjects: [],
      currentAverage: 0,
      attendance: 75,
      studyHours: 2,
      failedSubjects: 0,
    };
    setFormData(emptyForm);
    setAssessment(null);
    setCurrentTab('Analyze');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900 font-sans selection:bg-slate-800 selection:text-white">
      {/* Top Header */}
      <Header assessment={assessment} onReset={handleReset} />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto bg-white">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          assessment={assessment}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white">
          {currentTab === 'Dashboard' && (
            <DashboardView onNavigate={setCurrentTab} />
          )}

          {currentTab === 'Analyze' && (
            <AssessmentView
              initialData={formData}
              onSubmit={handleAssessmentSubmit}
            />
          )}

          {currentTab === 'Performance' && (
            assessment ? (
              <AnalysisView assessment={assessment} onNavigate={setCurrentTab} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-slate-300 p-8 shadow-xs">
                <p className="text-slate-700 text-sm mb-4">No active student performance data.</p>
                <button
                  onClick={() => setCurrentTab('Analyze')}
                  className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-bold cursor-pointer hover:bg-slate-800"
                >
                  Start Analyze
                </button>
              </div>
            )
          )}

          {currentTab === 'Rule Engine' && (
            <RuleEngineView assessment={assessment} />
          )}

          {currentTab === 'Recommendations' && (
            <RecommendationsView
              assessment={assessment}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'About' && <AboutView />}
        </main>
      </div>
    </div>
  );
}
