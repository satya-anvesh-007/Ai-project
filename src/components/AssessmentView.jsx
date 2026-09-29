import React, { useState } from 'react';
import { AlertCircle, Plus, Trash2, UserCheck } from 'lucide-react';

export const AssessmentView = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData.name || '');
  const [rollNo, setRollNo] = useState(initialData.rollNo || '');
  const [branch, setBranch] = useState(initialData.branch || 'CSE');
  const [year, setYear] = useState(initialData.year || '3rd Year');

  const [subjects, setSubjects] = useState(initialData.subjects || []);
  const [newSubName, setNewSubName] = useState('');
  const [newSubMarks, setNewSubMarks] = useState(75);

  const [attendance, setAttendance] = useState(initialData.attendance ?? 75);
  const [studyHours, setStudyHours] = useState(initialData.studyHours ?? 2);
  const [failedSubjects, setFailedSubjects] = useState(initialData.failedSubjects ?? 0);

  const [errors, setErrors] = useState([]);

  const handleAddSubject = () => {
    if (!newSubName.trim()) {
      setErrors(['Please enter a Subject Name before adding.']);
      return;
    }
    const marksNum = Number(newSubMarks);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      setErrors(['Subject marks must be between 0 and 100.']);
      return;
    }

    setSubjects([
      ...subjects,
      {
        id: String(Date.now() + Math.random()),
        name: newSubName.trim(),
        marks: marksNum,
      },
    ]);
    setNewSubName('');
    setNewSubMarks(75);
    setErrors([]);
  };

  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleSubjectMarkChange = (id, newMark) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, marks: newMark } : s))
    );
  };

  const handleSubjectNameChange = (id, newName) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, name: newName } : s))
    );
  };

  const calculatedMean =
    subjects.length > 0
      ? Number(
          (
            subjects.reduce((sum, s) => sum + Number(s.marks || 0), 0) /
            subjects.length
          ).toFixed(1)
        )
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = [];

    if (!name.trim()) errs.push('Student Name is required.');
    if (!rollNo.trim()) errs.push('Roll Number is required.');

    if (subjects.length === 0) {
      errs.push('Please add at least one subject to analyze performance.');
    } else {
      for (const s of subjects) {
        if (!s.name.trim()) {
          errs.push('All subjects must have a valid name.');
          break;
        }
        if (isNaN(s.marks) || s.marks < 0 || s.marks > 100) {
          errs.push(`Marks for "${s.name}" must be between 0 and 100.`);
          break;
        }
      }
    }

    const attNum = Number(attendance);
    if (isNaN(attNum) || attNum < 0 || attNum > 100) {
      errs.push('Attendance must be between 0% and 100%.');
    }

    const studyNum = Number(studyHours);
    if (isNaN(studyNum) || studyNum < 0) {
      errs.push('Study Hours must be 0 or greater.');
    }

    const failedNum = Number(failedSubjects);
    if (isNaN(failedNum) || failedNum < 0) {
      errs.push('Number of Failed Subjects must be 0 or greater.');
    }

    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors([]);
    onSubmit({
      name: name.trim(),
      rollNo: rollNo.trim(),
      branch,
      year,
      subjects,
      currentAverage: calculatedMean,
      attendance: attNum,
      studyHours: studyNum,
      failedSubjects: failedNum,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      <div className="bg-white p-5 rounded-lg border-2 border-slate-300 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Analyze</h2>
        <p className="text-xs text-slate-600 mt-1">
          Enter student academic information to evaluate using Knowledge Base rules.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-4 text-xs text-rose-800 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-900 text-sm mb-1">
            <AlertCircle className="w-4 h-4" />
            Please review the following errors:
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-4">
          <div className="border-b-2 border-slate-300 pb-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              PERSONAL INFORMATION
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Roll Number *
              </label>
              <input
                type="text"
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Branch *
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white text-slate-900 font-medium cursor-pointer"
              >
                {['CSE', 'CST', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML', 'OTHER'].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Year *
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-white text-slate-900 font-medium cursor-pointer"
              >
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Performance */}
        <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-4">
          <div className="border-b-2 border-slate-300 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              ACADEMIC PERFORMANCE
            </h3>
            {subjects.length > 0 && (
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                Calculated Average: {calculatedMean}% ({subjects.length} subjects)
              </span>
            )}
          </div>

          {/* Add Subject Row */}
          <div className="p-3.5 bg-slate-50 border-2 border-slate-300 rounded-md space-y-2">
            <div className="text-xs font-bold text-slate-800">Add Subject:</div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="sm:col-span-3">
                <input
                  type="text"
                  value={newSubName}
                  placeholder="Subject Name"
                  onChange={(e) => setNewSubName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubject();
                    }
                  }}
                  aria-label="New Subject Name"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 bg-white text-slate-900 font-medium"
                />
              </div>
              <div className="sm:col-span-1">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newSubMarks}
                  onChange={(e) =>
                    setNewSubMarks(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubject();
                    }
                  }}
                  aria-label="New Subject Marks"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 bg-white text-slate-900 font-medium"
                />
              </div>
              <div className="sm:col-span-1">
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer h-full shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add Subject
                </button>
              </div>
            </div>
          </div>

          {/* Added Subjects List */}
          {subjects.length > 0 ? (
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Enrolled Subjects ({subjects.length}):
              </div>
              <div className="space-y-2">
                {subjects.map((sub, index) => (
                  <div
                    key={sub.id}
                    className="flex items-center gap-3 p-2.5 bg-white border-2 border-slate-300 rounded-md shadow-xs"
                  >
                    <span className="text-xs font-bold text-slate-500 w-6 text-center">
                      #{index + 1}
                    </span>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubjectNameChange(sub.id, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 text-slate-900 font-medium bg-white"
                    />
                    <div className="flex items-center gap-1.5 w-28">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sub.marks}
                        onChange={(e) =>
                          handleSubjectMarkChange(sub.id, Number(e.target.value))
                        }
                        className="w-20 px-2 py-1.5 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 text-slate-900 font-medium text-center bg-white"
                      />
                      <span className="text-xs font-bold text-slate-600">%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(sub.id)}
                      className="p-2 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      title="Remove subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-md text-center text-xs text-slate-600">
              No subjects added yet. Type subject name and marks above and click <strong>Add Subject</strong>.
            </div>
          )}
        </div>

        {/* Section 3: Attendance & Study Habits */}
        <div className="bg-white p-6 rounded-lg border-2 border-slate-300 shadow-xs space-y-4">
          <div className="border-b-2 border-slate-300 pb-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              ATTENDANCE & STUDY HABITS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Attendance Percentage (%) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                required
                value={attendance}
                onChange={(e) =>
                  setAttendance(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Study Hours Per Day *
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                required
                value={studyHours}
                onChange={(e) =>
                  setStudyHours(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Number of Failed Subjects *
              </label>
              <input
                type="number"
                min="0"
                max="20"
                step="1"
                required
                value={failedSubjects}
                onChange={(e) =>
                  setFailedSubjects(e.target.value === '' ? '' : Number(e.target.value))
                }
                className="w-full px-3 py-2 text-sm border-2 border-slate-400 rounded-md focus:outline-none focus:border-slate-900 bg-white text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide uppercase shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-5 h-5" />
            ANALYZE PERFORMANCE
          </button>
        </div>
      </form>
    </div>
  );
};
