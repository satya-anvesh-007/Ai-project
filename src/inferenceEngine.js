import { KNOWLEDGE_BASE_RULES } from './knowledgeBase.js';

export function classifySubjectMark(mark) {
  if (mark >= 90) {
    return {
      category: 'Excellent',
      color: '#0f766e',
      bgColor: '#f0fdfa',
      note: 'Mastery of course concepts',
    };
  } else if (mark >= 75) {
    return {
      category: 'Strong',
      color: '#1e293b',
      bgColor: '#f1f5f9',
      note: 'Consistently high comprehension',
    };
  } else if (mark >= 60) {
    return {
      category: 'Satisfactory',
      color: '#334155',
      bgColor: '#f8fafc',
      note: 'Meets standard academic requirements',
    };
  } else if (mark >= 40) {
    return {
      category: 'Needs Attention',
      color: '#b45309',
      bgColor: '#fffbeb',
      note: 'Borderline score, revision needed',
    };
  } else {
    return {
      category: 'Weak',
      color: '#b91c1c',
      bgColor: '#fef2f2',
      note: 'Below passing threshold, remediation urgent',
    };
  }
}

export function runInferenceEngine(data) {
  const marksList = (data.subjects || []).map((s) => s.marks);
  const calculatedMean =
    marksList.length > 0
      ? marksList.reduce((acc, curr) => acc + curr, 0) / marksList.length
      : 0;

  const normalizedData = {
    ...data,
    currentAverage: Number(calculatedMean.toFixed(1)),
    attendance: Number(data.attendance || 0),
    studyHours: Number(data.studyHours || 0),
    failedSubjects: Number(data.failedSubjects || 0),
  };

  const triggeredRules = [];
  const nonTriggeredRules = [];
  const inferenceTrace = [];

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  let performanceLevel = 'SATISFACTORY';
  let performanceLevelDesc = 'Standard academic performance.';
  let overallPriority = 'Medium';

  for (const rule of KNOWLEDGE_BASE_RULES) {
    const { satisfied, details } = rule.evaluate(normalizedData);

    const ruleEntry = {
      ruleId: rule.ruleId,
      title: rule.title,
      conditionDesc: rule.conditionDesc,
      inferenceDesc: rule.inferenceDesc,
      category: rule.category,
      priority: rule.priority,
      conditionDetails: details,
      isTriggered: satisfied,
    };

    if (satisfied) {
      const payload = rule.action(normalizedData);
      ruleEntry.payload = payload;
      triggeredRules.push(ruleEntry);

      if (rule.category === 'performance_level' && payload.level) {
        performanceLevel = payload.level;
        performanceLevelDesc = payload.description || '';
      }

      if (rule.category === 'priority' && payload.priorityLevel) {
        overallPriority = payload.priorityLevel;
      }

      if (payload.strength && !strengths.includes(payload.strength)) {
        strengths.push(payload.strength);
      }
      if (Array.isArray(payload.strengths)) {
        for (const st of payload.strengths) {
          if (!strengths.includes(st)) strengths.push(st);
        }
      }

      if (payload.weakness && !weaknesses.includes(payload.weakness)) {
        weaknesses.push(payload.weakness);
      }

      if (payload.title && (payload.description || payload.recommendation)) {
        const recTitle = payload.title;
        const recDesc = payload.description || payload.recommendation;
        if (!recommendations.some((r) => r.title === recTitle)) {
          recommendations.push({
            title: recTitle,
            description: recDesc,
            priority: rule.priority,
            triggeredRule: rule.ruleId,
            ruleTitle: rule.title,
          });
        }
      }

      inferenceTrace.push({
        stepId: inferenceTrace.length + 1,
        ruleId: rule.ruleId,
        ruleTitle: rule.title,
        inputFact: details,
        conditionCheck: `PASSED: ${rule.conditionDesc}`,
        inferredFact: rule.inferenceDesc.replace(/^THEN\s+/i, ''),
        actionTaken:
          payload.title ||
          payload.level ||
          'Knowledge Fact Asserted',
      });
    } else {
      nonTriggeredRules.push(ruleEntry);
    }
  }

  if (
    overallPriority !== 'High' &&
    (normalizedData.attendance < 75 ||
      normalizedData.currentAverage < 60 ||
      normalizedData.failedSubjects > 0)
  ) {
    if (
      performanceLevel === 'CRITICAL' ||
      performanceLevel === 'NEEDS IMPROVEMENT' ||
      recommendations.some((r) => r.priority === 'High')
    ) {
      overallPriority = 'High';
    }
  }

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  recommendations.sort(
    (a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
  );

  const subjectsAnalysis = (normalizedData.subjects || []).map((item) => {
    const classification = classifySubjectMark(item.marks);
    return {
      subject: item.name,
      marks: item.marks,
      category: classification.category,
      color: classification.color,
      bgColor: classification.bgColor,
      note: classification.note,
    };
  });

  return {
    studentProfile: {
      name: normalizedData.name || 'Student',
      rollNo: normalizedData.rollNo || 'N/A',
      branch: normalizedData.branch || 'Engineering',
      year: normalizedData.year || 'N/A',
    },
    performanceLevel,
    performanceLevelDesc,
    overallPriority,
    subjectsAnalysis,
    strengths,
    weaknesses,
    recommendations,
    triggeredRules,
    nonTriggeredRules,
    inferenceTrace,
    metrics: {
      currentAverage: normalizedData.currentAverage,
      attendance: normalizedData.attendance,
      studyHours: normalizedData.studyHours,
      failedSubjects: normalizedData.failedSubjects,
      totalRulesInKb: KNOWLEDGE_BASE_RULES.length,
      totalTriggered: triggeredRules.length,
      totalRecommendations: recommendations.length,
    },
  };
}
