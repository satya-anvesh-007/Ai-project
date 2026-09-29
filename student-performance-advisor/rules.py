"""
rules.py - Knowledge Base for Student Performance Advisor
Rule-Based AI / Expert System (College AI Unit-V Project)

Contains declarative IF-THEN production rules representing domain knowledge
for student academic assessment, performance classification, consistency evaluation,
strengths/weaknesses identification, and personalized recommendation generation.
"""

from dataclasses import dataclass
from typing import Callable, Any, Dict, List


@dataclass
class Rule:
    """
    Representation of an IF-THEN Production Rule in the Knowledge Base.
    """
    rule_id: str
    title: str
    condition_desc: str
    inference_desc: str
    category: str
    condition: Callable[[Dict[str, Any]], tuple[bool, str]]
    action: Callable[[Dict[str, Any]], Dict[str, Any]]
    priority: str = "Medium"


def create_knowledge_base() -> List[Rule]:
    """
    Initializes and returns the complete Knowledge Base containing 22 IF-THEN rules.
    """
    rules: List[Rule] = [
        # --- ATTENDANCE RULES ---
        Rule(
            rule_id="R01",
            title="Attendance Deficit Warning",
            condition_desc="IF attendance < 75%",
            inference_desc="THEN recommend improving attendance to prevent exam debarment.",
            category="recommendation",
            priority="High",
            condition=lambda d: (
                d.get("attendance", 0) < 75,
                f"Attendance is {d.get('attendance')}% (Threshold: < 75%)"
            ),
            action=lambda d: {
                "title": "Improve Classroom Attendance",
                "description": (
                    f"Your current attendance is {d.get('attendance')}%, which falls below the mandatory 75% institutional requirement. "
                    "Attend upcoming lectures and laboratory sessions consistently to avoid academic detention."
                ),
                "weakness": f"Attendance is below 75% ({d.get('attendance')}%)",
                "recommendation": "Prioritize attending all remaining classes and submit documentation if absent due to medical reasons."
            }
        ),

        # --- PERFORMANCE LEVEL CLASSIFICATION (R02 - R05, R21) ---
        Rule(
            rule_id="R02",
            title="Critical Academic Standing",
            condition_desc="IF current average marks < 40%",
            inference_desc="THEN performance level = Critical.",
            category="performance_level",
            priority="High",
            condition=lambda d: (
                d.get("current_average", 0) < 40,
                f"Current Average is {d.get('current_average', 0):.1f}% (Threshold: < 40%)"
            ),
            action=lambda d: {
                "level": "CRITICAL",
                "description": "Student is at critical academic risk of course failure. Immediate remedial intervention required."
            }
        ),

        Rule(
            rule_id="R03",
            title="Needs Improvement Academic Standing",
            condition_desc="IF 40% <= current average marks < 60%",
            inference_desc="THEN performance level = Needs Improvement.",
            category="performance_level",
            priority="Medium",
            condition=lambda d: (
                40 <= d.get("current_average", 0) < 60,
                f"Current Average is {d.get('current_average', 0):.1f}% (Range: 40% to 59.9%)"
            ),
            action=lambda d: {
                "level": "NEEDS IMPROVEMENT",
                "description": "Academic scores are below collegiate average. Foundational concepts require structured reinforcement."
            }
        ),

        Rule(
            rule_id="R04",
            title="Satisfactory Academic Standing",
            condition_desc="IF 60% <= current average marks < 75%",
            inference_desc="THEN performance level = Satisfactory.",
            category="performance_level",
            priority="Medium",
            condition=lambda d: (
                60 <= d.get("current_average", 0) < 75,
                f"Current Average is {d.get('current_average', 0):.1f}% (Range: 60% to 74.9%)"
            ),
            action=lambda d: {
                "level": "SATISFACTORY",
                "description": "Performance meets baseline academic standards with healthy scope to transition into strong standing."
            }
        ),

        Rule(
            rule_id="R05",
            title="Good Academic Standing",
            condition_desc="IF 75% <= current average marks < 90%",
            inference_desc="THEN performance level = Good.",
            category="performance_level",
            priority="Low",
            condition=lambda d: (
                75 <= d.get("current_average", 0) < 90,
                f"Current Average is {d.get('current_average', 0):.1f}% (Range: 75% to 89.9%)"
            ),
            action=lambda d: {
                "level": "GOOD",
                "description": "Consistent high performance across courses with solid subject comprehension."
            }
        ),

        Rule(
            rule_id="R21",
            title="Excellent Academic Standing",
            condition_desc="IF current average marks >= 90%",
            inference_desc="THEN performance level = Excellent.",
            category="performance_level",
            priority="Low",
            condition=lambda d: (
                d.get("current_average", 0) >= 90,
                f"Current Average is {d.get('current_average', 0):.1f}% (Threshold: >= 90%)"
            ),
            action=lambda d: {
                "level": "EXCELLENT",
                "description": "Outstanding academic mastery, placing student at the top tier of the cohort."
            }
        ),

        # --- STUDY HABITS & ENGAGEMENT ---
        Rule(
            rule_id="R06",
            title="Insufficient Self-Study Time",
            condition_desc="IF study hours < 2 hrs/day AND current average < 60%",
            inference_desc="THEN recommend increasing daily focused study hours.",
            category="recommendation",
            priority="High",
            condition=lambda d: (
                d.get("study_hours", 0) < 2 and d.get("current_average", 0) < 60,
                f"Study hours={d.get('study_hours')}h (< 2h) & Current Avg={d.get('current_average', 0):.1f}% (< 60%)"
            ),
            action=lambda d: {
                "title": "Increase Daily Study Schedule",
                "description": (
                    f"You are dedicating {d.get('study_hours')} hour(s)/day while scoring below 60%. "
                    "Scale up deliberate study time to at least 2.5–3 hours daily using focused blocks."
                ),
                "weakness": f"Low study time ({d.get('study_hours')} hrs/day) correlates with sub-60% average",
                "recommendation": "Adopt structured study sessions to gradually increase focused study to 3 hours/day."
            }
        ),

        Rule(
            rule_id="R07",
            title="Adequate Self-Study Dedication",
            condition_desc="IF study hours >= 3 hrs/day AND current average >= 60%",
            inference_desc="THEN identify commendable study routine.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                d.get("study_hours", 0) >= 3 and d.get("current_average", 0) >= 60,
                f"Study hours={d.get('study_hours')}h (>= 3h) & Current Avg={d.get('current_average', 0):.1f}% (>= 60%)"
            ),
            action=lambda d: {
                "strength": f"Dedicated daily study routine ({d.get('study_hours')} hrs/day) supporting academic stability"
            }
        ),

        Rule(
            rule_id="R08",
            title="Backlog / Failed Course Attention",
            condition_desc="IF failed subjects > 0",
            inference_desc="THEN recommend immediate subject-specific remediation.",
            category="recommendation",
            priority="High",
            condition=lambda d: (
                d.get("failed_subjects", 0) > 0,
                f"Failed subjects count={d.get('failed_subjects')} (Threshold: > 0)"
            ),
            action=lambda d: {
                "title": "Clear Arrears & Failed Subjects",
                "description": (
                    f"You have {d.get('failed_subjects')} failed subject(s). Analyze syllabus blueprints, "
                    "consult professors for clarification, and schedule targeted weekend problem-solving sessions."
                ),
                "weakness": f"{d.get('failed_subjects')} failed subject(s) detected",
                "recommendation": "Prioritize backlogged subjects by reviewing previous question papers and consulting subject teachers."
            }
        ),

        # --- SUBJECT CONSISTENCY & VARIANCE (R09 - R11) ---
        Rule(
            rule_id="R09",
            title="Balanced Performance Across All Subjects",
            condition_desc="IF all subject marks >= 50%",
            inference_desc="THEN identify balanced academic performance.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                bool(d.get("subject_marks")) and all(m >= 50 for m in d.get("subject_marks", {}).values()),
                "All subject marks are at or above 50%"
            ),
            action=lambda d: {
                "strength": "Balanced passing scores across all enrolled subjects with no severe outliers"
            }
        ),

        Rule(
            rule_id="R10",
            title="High Subject Performance Disparity",
            condition_desc="IF (max subject mark - min subject mark) >= 35%",
            inference_desc="THEN recommend rebalancing study time across subjects.",
            category="recommendation",
            priority="Medium",
            condition=lambda d: (
                bool(d.get("subject_marks")) and len(d.get("subject_marks", {})) > 1 and 
                (max(d.get("subject_marks", {}).values()) - min(d.get("subject_marks", {}).values())) >= 35,
                f"Disparity is {(max(d.get('subject_marks', {}).values()) - min(d.get('subject_marks', {}).values())) if d.get('subject_marks') else 0}% (Threshold: >= 35%)"
            ),
            action=lambda d: {
                "title": "Rebalance Subject Study Allocations",
                "description": (
                    "There is a notable score difference between your highest and lowest subjects. "
                    "Reallocate study hours from your strongest subject to provide extra support to your weaker courses."
                ),
                "weakness": "High disparity between top and bottom subject scores"
            }
        ),

        Rule(
            rule_id="R11",
            title="Consistently Strong Subject Mastery",
            condition_desc="IF all subject marks >= 75%",
            inference_desc="THEN identify uniform high achievement across the curriculum.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                bool(d.get("subject_marks")) and all(m >= 75 for m in d.get("subject_marks", {}).values()),
                "All registered subjects score >= 75%"
            ),
            action=lambda d: {
                "strength": "Uniform mastery across all evaluated subjects"
            }
        ),

        # --- COMPOUND CRITICAL PRIORITY (R12) ---
        Rule(
            rule_id="R12",
            title="Dual-Risk Compound Trigger",
            condition_desc="IF attendance < 75% AND current average marks < 60%",
            inference_desc="THEN set academic risk priority to HIGH.",
            category="priority",
            priority="High",
            condition=lambda d: (
                d.get("attendance", 0) < 75 and d.get("current_average", 0) < 60,
                f"Attendance={d.get('attendance')}% (< 75%) AND Current Average={d.get('current_average', 0):.1f}% (< 60%)"
            ),
            action=lambda d: {
                "title": "Urgent Academic Intervention Required",
                "description": (
                    "Concurrently low attendance and low exam scores signal elevated risk of academic probation. "
                    "Schedule an advisory meeting with your class coordinator or mentor this week."
                ),
                "priority_level": "High"
            }
        ),

        # --- HIGH ACHIEVER SUSTAINABILITY (R13) ---
        Rule(
            rule_id="R13",
            title="Exemplary Routine Maintenance",
            condition_desc="IF current average marks >= 75% AND attendance >= 75%",
            inference_desc="THEN recommend maintaining current routine and seeking honors/projects.",
            category="recommendation",
            priority="Low",
            condition=lambda d: (
                d.get("current_average", 0) >= 75 and d.get("attendance", 0) >= 75,
                f"Current Average={d.get('current_average', 0):.1f}% (>= 75%) AND Attendance={d.get('attendance')}% (>= 75%)"
            ),
            action=lambda d: {
                "title": "Maintain Established Academic Routine",
                "description": (
                    "Your balance of high attendance and commendable grades shows strong time management. "
                    "Sustain this consistency while exploring technical paper publications or coding competitions."
                ),
                "strength": "Balanced study routine with solid attendance and commendable scores"
            }
        ),

        # --- SUBJECT-LEVEL DIAGNOSTICS (R14, R15) ---
        Rule(
            rule_id="R14",
            title="Specific Weak Subject Identification",
            condition_desc="IF any individual subject mark < 40%",
            inference_desc="THEN flag weak subjects for targeted remediation.",
            category="weakness",
            priority="High",
            condition=lambda d: (
                any(m < 40 for m in d.get("subject_marks", {}).values()),
                f"Weak subject(s) found: {', '.join([f'{s} ({m}%)' for s, m in d.get('subject_marks', {}).items() if m < 40])}"
            ),
            action=lambda d: {
                "title": "Focus on Weak Subjects (< 40%)",
                "weak_subjects": [s for s, m in d.get("subject_marks", {}).items() if m < 40],
                "description": (
                    f"Identified weak performance in: {', '.join([f'{s} ({m}%)' for s, m in d.get('subject_marks', {}).items() if m < 40])}. "
                    "Dedicate extra revision sessions and solve previous question papers for these subjects."
                ),
                "weakness": f"Weak performance in {', '.join([f'{s} ({m}%)' for s, m in d.get('subject_marks', {}).items() if m < 40])}"
            }
        ),

        Rule(
            rule_id="R15",
            title="Specific Strong Subject Identification",
            condition_desc="IF any individual subject mark >= 75%",
            inference_desc="THEN identify and celebrate strong subject mastery.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                any(m >= 75 for m in d.get("subject_marks", {}).values()),
                f"Strong subject(s) found: {', '.join([f'{s} ({m}%)' for s, m in d.get('subject_marks', {}).items() if m >= 75])}"
            ),
            action=lambda d: {
                "title": "Leverage Strong Subjects",
                "strong_subjects": [s for s, m in d.get("subject_marks", {}).items() if m >= 75],
                "strengths": [f"Strong performance in {s} ({m}%)" for s, m in d.get("subject_marks", {}).items() if m >= 75]
            }
        ),

        # --- MULTI-FAILURE RECOVERY PLAN (R16) ---
        Rule(
            rule_id="R16",
            title="Structured Recovery Plan",
            condition_desc="IF failed subjects >= 2",
            inference_desc="THEN recommend formal academic recovery plan.",
            category="recommendation",
            priority="High",
            condition=lambda d: (
                d.get("failed_subjects", 0) >= 2,
                f"Failed subjects={d.get('failed_subjects')} (Threshold: >= 2)"
            ),
            action=lambda d: {
                "title": "Execute Structured Academic Recovery Plan",
                "description": (
                    f"With {d.get('failed_subjects')} arrears, prioritize clearing backlog exams before new semesters escalate. "
                    "Form a weekly study group and review fundamental textbook problems daily."
                ),
                "weakness": f"Multiple course backlogs ({d.get('failed_subjects')} subjects) require formal recovery schedule"
            }
        ),

        # --- DISCIPLINE & CONSISTENCY (R17, R18) ---
        Rule(
            rule_id="R17",
            title="High Engagement Recognition",
            condition_desc="IF attendance >= 85% AND current average >= 75%",
            inference_desc="THEN identify consistent classroom engagement.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                d.get("attendance", 0) >= 85 and d.get("current_average", 0) >= 75,
                f"Attendance={d.get('attendance')}% (>= 85%) AND Current Average={d.get('current_average', 0):.1f}% (>= 75%)"
            ),
            action=lambda d: {
                "strength": "Exceptional attendance (>= 85%) coupled with high academic achievement"
            }
        ),

        Rule(
            rule_id="R18",
            title="Daily Study Commitment",
            condition_desc="IF study hours >= 4 hrs/day",
            inference_desc="THEN identify high self-study commitment.",
            category="strength",
            priority="Low",
            condition=lambda d: (
                d.get("study_hours", 0) >= 4,
                f"Study hours={d.get('study_hours')}h (>= 4h)"
            ),
            action=lambda d: {
                "strength": f"High self-study commitment ({d.get('study_hours')} hrs/day)"
            }
        ),

        # --- CONTINUATION VS WEAK AREA REVIEW (R19, R20) ---
        Rule(
            rule_id="R19",
            title="Sound Strategy Continuity",
            condition_desc="IF current average >= 65% AND failed subjects == 0",
            inference_desc="THEN recommend continuing current study strategy.",
            category="recommendation",
            priority="Low",
            condition=lambda d: (
                d.get("current_average", 0) >= 65 and d.get("failed_subjects", 0) == 0,
                f"Current average {d.get('current_average', 0):.1f}% >= 65% and 0 backlogs"
            ),
            action=lambda d: {
                "title": "Continue Current Study Routine",
                "description": "Your current academic average is solid and you have no backlogs. Maintain your existing study rhythm and schedule."
            }
        ),

        Rule(
            rule_id="R20",
            title="Remedial Error Analysis",
            condition_desc="IF current average < 55% OR any subject mark < 40%",
            inference_desc="THEN recommend conducting thorough error analysis of test papers.",
            category="recommendation",
            priority="Medium",
            condition=lambda d: (
                d.get("current_average", 0) < 55 or any(m < 40 for m in d.get("subject_marks", {}).values()),
                "Average < 55% or weak subject present"
            ),
            action=lambda d: {
                "title": "Conduct Error Analysis on Test Papers",
                "description": (
                    "Review corrected examination papers to identify recurring errors in problem-solving "
                    "steps and key theoretical definitions."
                )
            }
        ),

        Rule(
            rule_id="R22",
            title="Zero Backlog Exploration",
            condition_desc="IF failed subjects == 0 AND current average >= 75%",
            inference_desc="THEN recommend exploring honors electives, competitive exams, or research.",
            category="recommendation",
            priority="Low",
            condition=lambda d: (
                d.get("failed_subjects", 0) == 0 and d.get("current_average", 0) >= 75,
                f"Failed subjects=0 AND current average {d.get('current_average', 0):.1f}% >= 75%"
            ),
            action=lambda d: {
                "title": "Explore Honors, Research & Competitive Exams",
                "description": (
                    "With zero backlogs and a strong academic standing, expand your horizons: consider competitive exams, "
                    "open-source projects, or faculty-mentored research."
                ),
                "strength": "Clean academic record with zero backlogs"
            }
        ),
    ]

    return rules
