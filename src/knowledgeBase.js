export const KNOWLEDGE_BASE_RULES = [
  // --- ATTENDANCE RULES ---
  {
    ruleId: 'R01',
    title: 'Attendance Deficit Warning',
    conditionDesc: 'IF attendance < 75%',
    inferenceDesc: 'THEN recommend improving attendance to prevent exam debarment.',
    category: 'recommendation',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.attendance < 75,
      details: `Attendance is ${d.attendance}% (Threshold: < 75%)`,
    }),
    action: (d) => ({
      title: 'Improve Classroom Attendance',
      description: `Your current attendance is ${d.attendance}%, which falls below the mandatory 75% institutional requirement. Attend upcoming lectures and laboratory sessions consistently to avoid academic detention.`,
      weakness: `Attendance is below 75% (${d.attendance}%)`,
      recommendation: 'Prioritize attending all remaining classes and submit documentation if absent due to medical reasons.',
    }),
  },

  // --- PERFORMANCE LEVEL CLASSIFICATION (R02 - R05, R21) ---
  {
    ruleId: 'R02',
    title: 'Critical Academic Standing',
    conditionDesc: 'IF current average marks < 40%',
    inferenceDesc: 'THEN performance level = Critical.',
    category: 'performance_level',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.currentAverage < 40,
      details: `Current Average is ${Number(d.currentAverage).toFixed(1)}% (Threshold: < 40%)`,
    }),
    action: () => ({
      level: 'CRITICAL',
      description: 'Student is at critical academic risk of course failure. Immediate remedial intervention required.',
    }),
  },

  {
    ruleId: 'R03',
    title: 'Needs Improvement Academic Standing',
    conditionDesc: 'IF 40% <= current average marks < 60%',
    inferenceDesc: 'THEN performance level = Needs Improvement.',
    category: 'performance_level',
    priority: 'Medium',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 40 && d.currentAverage < 60,
      details: `Current Average is ${Number(d.currentAverage).toFixed(1)}% (Range: 40% to 59.9%)`,
    }),
    action: () => ({
      level: 'NEEDS IMPROVEMENT',
      description: 'Academic scores are below collegiate average. Foundational concepts require structured reinforcement.',
    }),
  },

  {
    ruleId: 'R04',
    title: 'Satisfactory Academic Standing',
    conditionDesc: 'IF 60% <= current average marks < 75%',
    inferenceDesc: 'THEN performance level = Satisfactory.',
    category: 'performance_level',
    priority: 'Medium',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 60 && d.currentAverage < 75,
      details: `Current Average is ${Number(d.currentAverage).toFixed(1)}% (Range: 60% to 74.9%)`,
    }),
    action: () => ({
      level: 'SATISFACTORY',
      description: 'Performance meets baseline academic standards with healthy scope to transition into strong standing.',
    }),
  },

  {
    ruleId: 'R05',
    title: 'Good Academic Standing',
    conditionDesc: 'IF 75% <= current average marks < 90%',
    inferenceDesc: 'THEN performance level = Good.',
    category: 'performance_level',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 75 && d.currentAverage < 90,
      details: `Current Average is ${Number(d.currentAverage).toFixed(1)}% (Range: 75% to 89.9%)`,
    }),
    action: () => ({
      level: 'GOOD',
      description: 'Consistent high performance across courses with solid subject comprehension.',
    }),
  },

  {
    ruleId: 'R21',
    title: 'Excellent Academic Standing',
    conditionDesc: 'IF current average marks >= 90%',
    inferenceDesc: 'THEN performance level = Excellent.',
    category: 'performance_level',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 90,
      details: `Current Average is ${Number(d.currentAverage).toFixed(1)}% (Threshold: >= 90%)`,
    }),
    action: () => ({
      level: 'EXCELLENT',
      description: 'Outstanding academic mastery, placing student at the top tier of the cohort.',
    }),
  },

  // --- STUDY HABITS & ENGAGEMENT ---
  {
    ruleId: 'R06',
    title: 'Insufficient Self-Study Time',
    conditionDesc: 'IF study hours < 2 hrs/day AND current average < 60%',
    inferenceDesc: 'THEN recommend increasing daily focused study hours.',
    category: 'recommendation',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.studyHours < 2 && d.currentAverage < 60,
      details: `Study hours=${d.studyHours}h (< 2h) & Current Avg=${Number(d.currentAverage).toFixed(1)}% (< 60%)`,
    }),
    action: (d) => ({
      title: 'Increase Daily Study Schedule',
      description: `You are dedicating ${d.studyHours} hour(s)/day while scoring below 60%. Scale up deliberate study time to at least 2.5–3 hours daily using focused blocks.`,
      weakness: `Low study time (${d.studyHours} hrs/day) correlates with sub-60% average`,
      recommendation: 'Adopt structured study sessions to gradually increase focused study to 3 hours/day.',
    }),
  },

  {
    ruleId: 'R07',
    title: 'Adequate Self-Study Dedication',
    conditionDesc: 'IF study hours >= 3 hrs/day AND current average >= 60%',
    inferenceDesc: 'THEN identify commendable study routine.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.studyHours >= 3 && d.currentAverage >= 60,
      details: `Study hours=${d.studyHours}h (>= 3h) & Current Avg=${Number(d.currentAverage).toFixed(1)}% (>= 60%)`,
    }),
    action: (d) => ({
      strength: `Dedicated daily study routine (${d.studyHours} hrs/day) supporting academic stability`,
    }),
  },

  {
    ruleId: 'R08',
    title: 'Backlog / Failed Course Attention',
    conditionDesc: 'IF failed subjects > 0',
    inferenceDesc: 'THEN recommend immediate subject-specific remediation.',
    category: 'recommendation',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.failedSubjects > 0,
      details: `Failed subjects count=${d.failedSubjects} (Threshold: > 0)`,
    }),
    action: (d) => ({
      title: 'Clear Arrears & Failed Subjects',
      description: `You have ${d.failedSubjects} failed subject(s). Analyze syllabus blueprints, consult professors for clarification, and schedule targeted weekend problem-solving sessions.`,
      weakness: `${d.failedSubjects} failed subject(s) detected`,
      recommendation: 'Prioritize backlogged subjects by reviewing previous question papers and consulting subject teachers.',
    }),
  },

  // --- SUBJECT CONSISTENCY & VARIANCE (R09 - R11) ---
  {
    ruleId: 'R09',
    title: 'Balanced Performance Across All Subjects',
    conditionDesc: 'IF all subject marks >= 50%',
    inferenceDesc: 'THEN identify balanced academic performance.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => {
      const marks = (d.subjects || []).map((s) => s.marks);
      const isBalanced = marks.length > 0 && marks.every((m) => m >= 50);
      return {
        satisfied: isBalanced,
        details: isBalanced ? 'All subject marks are at or above 50%' : 'One or more subjects below 50%',
      };
    },
    action: () => ({
      strength: 'Balanced passing scores across all enrolled subjects with no severe outliers',
    }),
  },

  {
    ruleId: 'R10',
    title: 'High Subject Performance Disparity',
    conditionDesc: 'IF (max subject mark - min subject mark) >= 35%',
    inferenceDesc: 'THEN recommend rebalancing study time across subjects.',
    category: 'recommendation',
    priority: 'Medium',
    evaluate: (d) => {
      if (!d.subjects || d.subjects.length < 2) return { satisfied: false, details: 'Need at least 2 subjects' };
      const marks = d.subjects.map((s) => s.marks);
      const maxM = Math.max(...marks);
      const minM = Math.min(...marks);
      const diff = maxM - minM;
      return {
        satisfied: diff >= 35,
        details: `Disparity is ${diff}% (Threshold: >= 35%)`,
      };
    },
    action: () => ({
      title: 'Rebalance Subject Study Allocations',
      description: 'There is a notable score difference between your highest and lowest subjects. Reallocate study hours from your strongest subject to provide extra support to your weaker courses.',
      weakness: 'High disparity between top and bottom subject scores',
    }),
  },

  {
    ruleId: 'R11',
    title: 'Consistently Strong Subject Mastery',
    conditionDesc: 'IF all subject marks >= 75%',
    inferenceDesc: 'THEN identify uniform high achievement across the curriculum.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => {
      const marks = (d.subjects || []).map((s) => s.marks);
      const isStrong = marks.length > 0 && marks.every((m) => m >= 75);
      return {
        satisfied: isStrong,
        details: isStrong ? 'All registered subjects score >= 75%' : 'Not all subjects >= 75%',
      };
    },
    action: () => ({
      strength: 'Uniform mastery across all evaluated subjects',
    }),
  },

  // --- COMPOUND CRITICAL PRIORITY (R12) ---
  {
    ruleId: 'R12',
    title: 'Dual-Risk Compound Trigger',
    conditionDesc: 'IF attendance < 75% AND current average marks < 60%',
    inferenceDesc: 'THEN set academic risk priority to HIGH.',
    category: 'priority',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.attendance < 75 && d.currentAverage < 60,
      details: `Attendance=${d.attendance}% (< 75%) AND Current Average=${Number(d.currentAverage).toFixed(1)}% (< 60%)`,
    }),
    action: () => ({
      title: 'Urgent Academic Intervention Required',
      description: 'Concurrently low attendance and low exam scores signal elevated risk of academic probation. Schedule an advisory meeting with your class coordinator or mentor this week.',
      priorityLevel: 'High',
    }),
  },

  // --- HIGH ACHIEVER SUSTAINABILITY (R13) ---
  {
    ruleId: 'R13',
    title: 'Exemplary Routine Maintenance',
    conditionDesc: 'IF current average marks >= 75% AND attendance >= 75%',
    inferenceDesc: 'THEN recommend maintaining current routine and seeking honors/projects.',
    category: 'recommendation',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 75 && d.attendance >= 75,
      details: `Current Average=${Number(d.currentAverage).toFixed(1)}% (>= 75%) AND Attendance=${d.attendance}% (>= 75%)`,
    }),
    action: () => ({
      title: 'Maintain Established Academic Routine',
      description: 'Your balance of high attendance and commendable grades shows strong time management. Sustain this consistency while exploring technical paper publications or coding competitions.',
      strength: 'Balanced study routine with solid attendance and commendable scores',
    }),
  },

  // --- SUBJECT-LEVEL DIAGNOSTICS (R14, R15) ---
  {
    ruleId: 'R14',
    title: 'Specific Weak Subject Identification',
    conditionDesc: 'IF any individual subject mark < 40%',
    inferenceDesc: 'THEN flag weak subjects for targeted remediation.',
    category: 'weakness',
    priority: 'High',
    evaluate: (d) => {
      const weak = (d.subjects || []).filter((s) => s.marks < 40);
      return {
        satisfied: weak.length > 0,
        details: weak.length > 0 ? `Weak subject(s) found: ${weak.map((w) => `${w.name} (${w.marks}%)`).join(', ')}` : 'No subjects below 40%',
      };
    },
    action: (d) => {
      const weak = (d.subjects || []).filter((s) => s.marks < 40);
      return {
        title: 'Focus on Weak Subjects (< 40%)',
        weakSubjects: weak.map((w) => w.name),
        description: `Identified weak performance in: ${weak.map((w) => `${w.name} (${w.marks}%)`).join(', ')}. Dedicate extra revision sessions and solve previous question papers for these subjects.`,
        weakness: `Weak performance in ${weak.map((w) => `${w.name} (${w.marks}%)`).join(', ')}`,
      };
    },
  },

  {
    ruleId: 'R15',
    title: 'Specific Strong Subject Identification',
    conditionDesc: 'IF any individual subject mark >= 75%',
    inferenceDesc: 'THEN identify and celebrate strong subject mastery.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => {
      const strong = (d.subjects || []).filter((s) => s.marks >= 75);
      return {
        satisfied: strong.length > 0,
        details: strong.length > 0 ? `Strong subject(s) found: ${strong.map((s) => `${s.name} (${s.marks}%)`).join(', ')}` : 'No subjects >= 75%',
      };
    },
    action: (d) => {
      const strong = (d.subjects || []).filter((s) => s.marks >= 75);
      return {
        title: 'Leverage Strong Subjects',
        strongSubjects: strong.map((s) => s.name),
        strengths: strong.map((s) => `Strong performance in ${s.name} (${s.marks}%)`),
      };
    },
  },

  // --- MULTI-FAILURE RECOVERY PLAN (R16) ---
  {
    ruleId: 'R16',
    title: 'Structured Recovery Plan',
    conditionDesc: 'IF failed subjects >= 2',
    inferenceDesc: 'THEN recommend formal academic recovery plan.',
    category: 'recommendation',
    priority: 'High',
    evaluate: (d) => ({
      satisfied: d.failedSubjects >= 2,
      details: `Failed subjects=${d.failedSubjects} (Threshold: >= 2)`,
    }),
    action: (d) => ({
      title: 'Execute Structured Academic Recovery Plan',
      description: `With ${d.failedSubjects} arrears, prioritize clearing backlog exams before new semesters escalate. Form a weekly study group and review fundamental textbook problems daily.`,
      weakness: `Multiple course backlogs (${d.failedSubjects} subjects) require formal recovery schedule`,
    }),
  },

  // --- DISCIPLINE & CONSISTENCY (R17, R18) ---
  {
    ruleId: 'R17',
    title: 'High Engagement Recognition',
    conditionDesc: 'IF attendance >= 85% AND current average >= 75%',
    inferenceDesc: 'THEN identify consistent classroom engagement.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.attendance >= 85 && d.currentAverage >= 75,
      details: `Attendance=${d.attendance}% (>= 85%) AND Current Average=${Number(d.currentAverage).toFixed(1)}% (>= 75%)`,
    }),
    action: () => ({
      strength: 'Exceptional attendance (>= 85%) coupled with high academic achievement',
    }),
  },

  {
    ruleId: 'R18',
    title: 'Daily Study Commitment',
    conditionDesc: 'IF study hours >= 4 hrs/day',
    inferenceDesc: 'THEN identify high self-study commitment.',
    category: 'strength',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.studyHours >= 4,
      details: `Study hours=${d.studyHours}h (>= 4h)`,
    }),
    action: (d) => ({
      strength: `High self-study commitment (${d.studyHours} hrs/day)`,
    }),
  },

  // --- CONTINUATION VS WEAK AREA REVIEW (R19, R20) ---
  {
    ruleId: 'R19',
    title: 'Sound Strategy Continuity',
    conditionDesc: 'IF current average >= 65% AND failed subjects == 0',
    inferenceDesc: 'THEN recommend continuing current study strategy.',
    category: 'recommendation',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.currentAverage >= 65 && d.failedSubjects === 0,
      details: `Current average ${Number(d.currentAverage).toFixed(1)}% >= 65% and 0 backlogs`,
    }),
    action: () => ({
      title: 'Continue Current Study Routine',
      description: 'Your current academic average is solid and you have no backlogs. Maintain your existing study rhythm and schedule.',
    }),
  },

  {
    ruleId: 'R20',
    title: 'Remedial Error Analysis',
    conditionDesc: 'IF current average < 55% OR any subject mark < 40%',
    inferenceDesc: 'THEN recommend conducting thorough error analysis of test papers.',
    category: 'recommendation',
    priority: 'Medium',
    evaluate: (d) => {
      const anyWeak = (d.subjects || []).some((s) => s.marks < 40);
      return {
        satisfied: d.currentAverage < 55 || anyWeak,
        details: 'Average < 55% or weak subject present',
      };
    },
    action: () => ({
      title: 'Conduct Error Analysis on Test Papers',
      description: 'Review corrected examination papers to identify recurring errors in problem-solving steps and key theoretical definitions.',
    }),
  },

  {
    ruleId: 'R22',
    title: 'Zero Backlog Exploration',
    conditionDesc: 'IF failed subjects == 0 AND current average >= 75%',
    inferenceDesc: 'THEN recommend exploring honors electives, competitive exams, or research.',
    category: 'recommendation',
    priority: 'Low',
    evaluate: (d) => ({
      satisfied: d.failedSubjects === 0 && d.currentAverage >= 75,
      details: `Failed subjects=0 AND current average ${Number(d.currentAverage).toFixed(1)}% >= 75%`,
    }),
    action: () => ({
      title: 'Explore Honors, Research & Competitive Exams',
      description: 'With zero backlogs and a strong academic standing, expand your horizons: consider competitive exams, open-source projects, or faculty-mentored research.',
      strength: 'Clean academic record with zero backlogs',
    }),
  },
];
