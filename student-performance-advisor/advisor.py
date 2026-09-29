"""
advisor.py - Inference Engine for Student Performance Advisor
Rule-Based AI / Expert System (College AI Unit-V Project)
"""

from typing import Dict, Any, List, Tuple
from rules import create_knowledge_base, Rule


def classify_subject_mark(mark: float) -> Tuple[str, str, str]:
    """
    Classifies an individual subject score based on standard academic tiers.
    """
    if mark >= 90:
        return "Excellent", "#10b981", "Mastery of course concepts"
    elif mark >= 75:
        return "Strong", "#3b82f6", "Consistently high comprehension"
    elif mark >= 60:
        return "Satisfactory", "#6366f1", "Meets standard academic requirements"
    elif mark >= 40:
        return "Needs Attention", "#f59e0b", "Borderline score, revision needed"
    else:
        return "Weak", "#ef4444", "Below passing threshold, remediation urgent"


class InferenceEngine:
    def __init__(self, knowledge_base: List[Rule] = None):
        self.rules: List[Rule] = knowledge_base if knowledge_base is not None else create_knowledge_base()

    def evaluate(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        subject_marks = student_data.get("subject_marks", {})
        if subject_marks:
            computed_current_avg = sum(subject_marks.values()) / len(subject_marks)
        else:
            computed_current_avg = student_data.get("current_average", 0.0)

        normalized_data = dict(student_data)
        if "current_average" not in normalized_data or normalized_data["current_average"] is None:
            normalized_data["current_average"] = round(computed_current_avg, 2)
        else:
            normalized_data["current_average"] = float(normalized_data["current_average"])

        normalized_data["attendance"] = float(normalized_data.get("attendance", 0.0))
        normalized_data["study_hours"] = float(normalized_data.get("study_hours", 0.0))
        normalized_data["failed_subjects"] = int(normalized_data.get("failed_subjects", 0))

        triggered_rules_log: List[Dict[str, Any]] = []
        non_triggered_rules_log: List[Dict[str, Any]] = []
        inference_trace: List[Dict[str, Any]] = []

        strengths: List[str] = []
        weaknesses: List[str] = []
        recommendations: List[Dict[str, Any]] = []

        performance_level = "Satisfactory"
        performance_level_desc = "Standard academic performance."
        overall_priority = "Medium"

        for rule in self.rules:
            try:
                is_satisfied, condition_details = rule.condition(normalized_data)
            except Exception as e:
                is_satisfied = False
                condition_details = f"Evaluation error: {str(e)}"

            rule_entry = {
                "rule_id": rule.rule_id,
                "title": rule.title,
                "condition_desc": rule.condition_desc,
                "inference_desc": rule.inference_desc,
                "category": rule.category,
                "priority": rule.priority,
                "condition_details": condition_details,
                "is_triggered": is_satisfied
            }

            if is_satisfied:
                payload = rule.action(normalized_data)
                rule_entry["payload"] = payload
                triggered_rules_log.append(rule_entry)

                if rule.category == "performance_level" and "level" in payload:
                    performance_level = payload["level"]
                    performance_level_desc = payload.get("description", "")

                if rule.category == "priority" and "priority_level" in payload:
                    overall_priority = payload["priority_level"]

                if "strength" in payload and payload["strength"]:
                    if payload["strength"] not in strengths:
                        strengths.append(payload["strength"])
                if "strengths" in payload and isinstance(payload["strengths"], list):
                    for st in payload["strengths"]:
                        if st not in strengths:
                            strengths.append(st)

                if "weakness" in payload and payload["weakness"]:
                    if payload["weakness"] not in weaknesses:
                        weaknesses.append(payload["weakness"])

                if "title" in payload and ("description" in payload or "recommendation" in payload):
                    rec_title = payload.get("title", rule.title)
                    rec_desc = payload.get("description") or payload.get("recommendation", "")
                    
                    if not any(r["title"] == rec_title for r in recommendations):
                        recommendations.append({
                            "title": rec_title,
                            "description": rec_desc,
                            "priority": rule.priority,
                            "triggered_rule": rule.rule_id,
                            "rule_title": rule.title
                        })

                trace_entry = {
                    "step_id": len(inference_trace) + 1,
                    "rule_id": rule.rule_id,
                    "rule_title": rule.title,
                    "input_fact": condition_details,
                    "condition_check": f"PASSED: {rule.condition_desc}",
                    "inferred_fact": rule.inference_desc.replace("THEN ", ""),
                    "action_taken": payload.get("title") or payload.get("level") or "Knowledge Fact Asserted"
                }
                inference_trace.append(trace_entry)
            else:
                non_triggered_rules_log.append(rule_entry)

        if any(r["priority"] == "High" for r in recommendations) or performance_level in ["CRITICAL", "NEEDS IMPROVEMENT"]:
            if overall_priority != "High" and (normalized_data["attendance"] < 75 or normalized_data["current_average"] < 60 or normalized_data["failed_subjects"] > 0):
                overall_priority = "High"

        priority_weights = {"High": 1, "Medium": 2, "Low": 3}
        recommendations.sort(key=lambda x: priority_weights.get(x["priority"], 99))

        subjects_analysis = []
        for s_name, mark in subject_marks.items():
            cat, color, note = classify_subject_mark(mark)
            subjects_analysis.append({
                "subject": s_name,
                "marks": mark,
                "category": cat,
                "color": color,
                "note": note
            })

        return {
            "student_profile": {
                "name": normalized_data.get("name", "Student"),
                "roll_no": normalized_data.get("roll_no", "N/A"),
                "branch": normalized_data.get("branch", "Engineering"),
                "year": normalized_data.get("year", "N/A"),
            },
            "performance_level": performance_level,
            "performance_level_desc": performance_level_desc,
            "overall_priority": overall_priority,
            "subjects_analysis": subjects_analysis,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "recommendations": recommendations,
            "triggered_rules": triggered_rules_log,
            "non_triggered_rules": non_triggered_rules_log,
            "inference_trace": inference_trace,
            "metrics": {
                "current_average": normalized_data["current_average"],
                "attendance": normalized_data["attendance"],
                "study_hours": normalized_data["study_hours"],
                "failed_subjects": normalized_data["failed_subjects"],
                "total_rules_in_kb": len(self.rules),
                "total_triggered": len(triggered_rules_log),
                "total_recommendations": len(recommendations)
            }
        }
