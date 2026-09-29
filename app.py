"""
app.py - Student Performance Advisor
Rule-Based AI / Academic Expert System

Runs via: streamlit run app.py
"""

import streamlit as st
from rules import create_knowledge_base
from advisor import InferenceEngine, classify_subject_mark

# ---------------------------------------------------------
# Page Configuration
# ---------------------------------------------------------
st.set_page_config(
    page_title="Student Performance Advisor",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---------------------------------------------------------
# Styling with Clean White Background
# ---------------------------------------------------------
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .stApp {
        background-color: #ffffff !important;
        color: #0f172a;
    }

    /* Highlighted input box borders */
    input[type="text"], input[type="number"], select, textarea, div[data-baseweb="select"] {
        border: 2px solid #475569 !important;
        border-radius: 6px !important;
        background-color: #ffffff !important;
        color: #0f172a !important;
        font-weight: 500 !important;
    }
    input[type="text"]:focus, input[type="number"]:focus, select:focus {
        border-color: #0f172a !important;
        box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.2) !important;
    }

    /* Header styling */
    .app-header {
        background: #0f172a;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        color: #ffffff;
        margin-bottom: 1.5rem;
        border: 1px solid #1e293b;
    }
    .app-header h1 {
        color: #f8fafc !important;
        font-size: 1.7rem !important;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
    }
    .app-header p {
        color: #94a3b8 !important;
        font-size: 0.9rem;
        margin-top: 0.35rem;
        margin-bottom: 0;
    }

    /* Cards with white background */
    .advisor-card {
        background-color: #ffffff;
        border: 2px solid #94a3b8;
        border-radius: 8px;
        padding: 1.25rem 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .advisor-card-title {
        font-size: 1.05rem;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 0.5rem;
    }

    /* Feature Cards */
    .feature-card {
        background: #ffffff;
        border: 2px solid #94a3b8;
        border-radius: 8px;
        padding: 1.25rem;
        height: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .feature-card h4 {
        color: #0f172a;
        margin-bottom: 0.4rem;
        font-weight: 600;
    }
    .feature-card p {
        color: #475569;
        font-size: 0.88rem;
        line-height: 1.45;
        margin: 0;
    }

    /* Metric Cards */
    .metric-box {
        background: #ffffff;
        border: 2px solid #94a3b8;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .metric-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.04em;
    }
    .metric-value {
        font-size: 1.6rem;
        font-weight: 700;
        color: #0f172a;
        margin-top: 0.25rem;
    }

    /* Trace Step Box */
    .trace-node {
        background: #ffffff;
        border-left: 4px solid #0f172a;
        border-top: 2px solid #94a3b8;
        border-right: 2px solid #94a3b8;
        border-bottom: 2px solid #94a3b8;
        border-radius: 0 6px 6px 0;
        padding: 0.85rem 1.1rem;
        margin-bottom: 0.75rem;
    }
</style>
""", unsafe_allow_html=True)


# ---------------------------------------------------------
# Session State Initialization
# ---------------------------------------------------------
if "engine" not in st.session_state:
    st.session_state.engine = InferenceEngine(create_knowledge_base())

if "assessment_results" not in st.session_state:
    st.session_state.assessment_results = None

if "nav_page" not in st.session_state:
    st.session_state.nav_page = "Dashboard"

if "student_subjects" not in st.session_state:
    st.session_state.student_subjects = []

if "student_info" not in st.session_state:
    st.session_state.student_info = {
        "name": "",
        "roll_no": "",
        "branch": "CSE",
        "year": "3rd Year",
        "attendance": 75.0,
        "study_hours": 2.0,
        "failed_subjects": 0
    }


# ---------------------------------------------------------
# Sidebar Navigation (Analyze, Performance)
# ---------------------------------------------------------
with st.sidebar:
    st.markdown("### Student Performance Advisor")
    st.caption("Rule-Based Academic Expert System")
    st.markdown("---")

    menu_options = [
        "Dashboard",
        "Analyze",
        "Performance",
        "Rule Engine",
        "Recommendations",
        "About"
    ]

    selected_page = st.radio(
        "Navigation",
        options=menu_options,
        index=menu_options.index(st.session_state.nav_page) if st.session_state.nav_page in menu_options else 0,
        key="sidebar_nav_radio"
    )

    if selected_page != st.session_state.nav_page:
        st.session_state.nav_page = selected_page
        st.rerun()

    st.markdown("---")
    
    if st.session_state.assessment_results:
        res = st.session_state.assessment_results
        st.markdown(f"**Student:** `{res['student_profile']['name']}`")
        st.markdown(f"**Standing:** `{res['performance_level']}`")
        st.markdown(f"**Rules Triggered:** `{res['metrics']['total_triggered']} / {res['metrics']['total_rules_in_kb']}`")
    else:
        st.info("No assessment conducted yet. Go to 'Analyze' to begin.")

    st.markdown("---")
    st.markdown("**Made by ANVESH & KIRAN**")


# ---------------------------------------------------------
# Application Header
# ---------------------------------------------------------
st.markdown("""
<div class="app-header">
    <h1>STUDENT PERFORMANCE ADVISOR</h1>
    <p>Rule-Based Academic Expert System • Deterministic Forward-Chaining Inference</p>
</div>
""", unsafe_allow_html=True)


# =========================================================
# 1. DASHBOARD PAGE
# =========================================================
if st.session_state.nav_page == "Dashboard":
    st.markdown("""
    <div class="advisor-card" style="border-left: 6px solid #0f172a;">
        <h2 style="margin-top:0; color:#0f172a; font-weight:700; letter-spacing:-0.01em;">
            STUDENT PERFORMANCE ADVISOR
        </h2>
        <p style="font-size:1rem; color:#334155; max-width:850px; line-height:1.6;">
            Understand your academic performance and receive personalized recommendations using an 
            explainable rule-based expert system. Built strictly with declarative <b>IF–THEN Knowledge Base rules</b> 
            and deterministic forward-chaining reasoning.
        </p>
    </div>
    """, unsafe_allow_html=True)

    col_btn1, col_btn2, _ = st.columns([1.5, 1.8, 4])
    with col_btn1:
        if st.button("Analyze", type="primary", use_container_width=True):
            st.session_state.nav_page = "Analyze"
            st.rerun()
    with col_btn2:
        if st.button("View How It Works", use_container_width=True):
            st.session_state.nav_page = "Rule Engine"
            st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)

    st.markdown("### Core System Features")
    c1, c2, c3, c4 = st.columns(4)

    with c1:
        st.markdown("""
        <div class="feature-card">
            <h4>1. Academic Analysis</h4>
            <p>Analyze marks, attendance and study habits across any number of subjects.</p>
        </div>
        """, unsafe_allow_html=True)

    with c2:
        st.markdown("""
        <div class="feature-card">
            <h4>2. Rule-Based Reasoning</h4>
            <p>Use IF–THEN rules to evaluate academic performance systematically.</p>
        </div>
        """, unsafe_allow_html=True)

    with c3:
        st.markdown("""
        <div class="feature-card">
            <h4>3. Explainable Results</h4>
            <p>See exactly why each recommendation was generated through clear rule traces.</p>
        </div>
        """, unsafe_allow_html=True)

    with c4:
        st.markdown("""
        <div class="feature-card">
            <h4>4. Personalized Advice</h4>
            <p>Receive academic recommendations based on your specific academic inputs.</p>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    st.markdown("### How It Works")
    st.markdown("""
    ```text
    INPUT ──► KNOWLEDGE BASE ──► INFERENCE ENGINE ──► ANALYSIS ──► RECOMMENDATION
    ```
    """)

    hw1, hw2, hw3, hw4, hw5 = st.columns(5)
    with hw1:
        st.markdown("**INPUT**\n\nStudent academic information.")
    with hw2:
        st.markdown("**KNOWLEDGE BASE**\n\nCollection of IF–THEN academic rules.")
    with hw3:
        st.markdown("**INFERENCE ENGINE**\n\nChecks which rules are satisfied.")
    with hw4:
        st.markdown("**ANALYSIS**\n\nIdentifies strengths and weaknesses.")
    with hw5:
        st.markdown("**RECOMMENDATION**\n\nProvides academic advice.")


# =========================================================
# 2. ANALYZE PAGE
# =========================================================
elif st.session_state.nav_page == "Analyze":
    st.subheader("Analyze")

    # Section 1: Personal Information
    st.markdown("#### Section 1: Personal Information")
    p_col1, p_col2, p_col3, p_col4 = st.columns(4)
    with p_col1:
        name_val = st.text_input("Student Name", value=st.session_state.student_info.get("name", ""))
    with p_col2:
        roll_val = st.text_input("Roll Number", value=st.session_state.student_info.get("roll_no", ""))
    with p_col3:
        branches = ["CSE", "CST", "ECE", "EEE", "MECH", "CIVIL", "AIML", "OTHER"]
        cur_branch = st.session_state.student_info.get("branch", "CSE")
        b_idx = branches.index(cur_branch) if cur_branch in branches else 0
        branch_val = st.selectbox("Branch", options=branches, index=b_idx)
    with p_col4:
        years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
        cur_year = st.session_state.student_info.get("year", "3rd Year")
        y_idx = years.index(cur_year) if cur_year in years else 2
        year_val = st.selectbox("Year", options=years, index=y_idx)

    st.markdown("---")

    # Section 2: Academic Performance (Dynamic Subjects)
    st.markdown("#### Section 2: Academic Performance")
    st.caption("Add subjects and enter marks (0–100) for each course.")

    # Controls to add new subject
    sub_add_col1, sub_add_col2, sub_add_col3 = st.columns([3, 2, 2])
    with sub_add_col1:
        new_sub_name = st.text_input("New Subject Name", key="new_subject_name_input")
    with sub_add_col2:
        new_sub_mark = st.number_input("Marks (0–100)", min_value=0, max_value=100, value=75, step=1, key="new_subject_mark_input")
    with sub_add_col3:
        st.write("")
        st.write("")
        if st.button("➕ Add Subject", use_container_width=True):
            if new_sub_name.strip():
                st.session_state.student_subjects.append({
                    "name": new_sub_name.strip(),
                    "marks": int(new_sub_mark)
                })
                st.rerun()
            else:
                st.warning("Please enter a subject name.")

    # Display added subjects list
    if len(st.session_state.student_subjects) > 0:
        st.markdown("**Added Subjects:**")
        subjects_to_remove = []
        for idx, sub in enumerate(st.session_state.student_subjects):
            s_c1, s_c2, s_c3 = st.columns([3, 2, 1])
            with s_c1:
                st.text_input(f"Subject #{idx+1} Name", value=sub["name"], key=f"sub_name_{idx}")
            with s_c2:
                updated_mark = st.number_input(f"Marks", min_value=0, max_value=100, value=int(sub["marks"]), key=f"sub_mark_{idx}")
                st.session_state.student_subjects[idx]["marks"] = updated_mark
            with s_c3:
                st.write("")
                st.write("")
                if st.button("Remove", key=f"remove_sub_{idx}"):
                    subjects_to_remove.append(idx)

        if subjects_to_remove:
            for idx in sorted(subjects_to_remove, reverse=True):
                st.session_state.student_subjects.pop(idx)
            st.rerun()

        current_marks_list = [s["marks"] for s in st.session_state.student_subjects]
        computed_avg = round(sum(current_marks_list) / len(current_marks_list), 1)
        st.info(f"Current Calculated Average ({len(st.session_state.student_subjects)} subjects): **{computed_avg}%**")
    else:
        st.info("No subjects added yet. Please enter a subject name and marks above and click 'Add Subject'.")

    st.markdown("---")

    # Section 3: Attendance & Study Habits
    st.markdown("#### Section 3: Attendance & Study Habits")
    h_col1, h_col2, h_col3 = st.columns(3)
    with h_col1:
        att_val = st.number_input(
            "Attendance Percentage (%)",
            min_value=0.0,
            max_value=100.0,
            value=float(st.session_state.student_info.get("attendance", 75.0)),
            step=1.0
        )
    with h_col2:
        study_val = st.number_input(
            "Study Hours Per Day",
            min_value=0.0,
            max_value=24.0,
            value=float(st.session_state.student_info.get("study_hours", 2.0)),
            step=0.5
        )
    with h_col3:
        failed_val = st.number_input(
            "Number of Failed Subjects",
            min_value=0,
            max_value=20,
            value=int(st.session_state.student_info.get("failed_subjects", 0)),
            step=1
        )

    st.markdown("<br>", unsafe_allow_html=True)
    analyze_btn = st.button("ANALYZE PERFORMANCE", type="primary", use_container_width=True)

    if analyze_btn:
        errors = []
        if not name_val.strip():
            errors.append("Student Name is required.")
        if not roll_val.strip():
            errors.append("Roll Number is required.")
        if len(st.session_state.student_subjects) == 0:
            errors.append("Please add at least one subject before analyzing.")

        if errors:
            for err in errors:
                st.error(err)
        else:
            st.session_state.student_info = {
                "name": name_val.strip(),
                "roll_no": roll_val.strip(),
                "branch": branch_val,
                "year": year_val,
                "attendance": att_val,
                "study_hours": study_val,
                "failed_subjects": failed_val
            }

            sub_marks_dict = {s["name"]: s["marks"] for s in st.session_state.student_subjects}
            curr_avg = round(sum(sub_marks_dict.values()) / len(sub_marks_dict), 1)

            payload = {
                "name": name_val.strip(),
                "roll_no": roll_val.strip(),
                "branch": branch_val,
                "year": year_val,
                "subject_marks": sub_marks_dict,
                "current_average": curr_avg,
                "attendance": att_val,
                "study_hours": study_val,
                "failed_subjects": failed_val
            }

            with st.spinner("Evaluating through Knowledge Base rules..."):
                results = st.session_state.engine.evaluate(payload)
                st.session_state.assessment_results = results

            st.success("Performance analysis completed successfully.")
            st.session_state.nav_page = "Performance"
            st.rerun()


# =========================================================
# 3. PERFORMANCE PAGE
# =========================================================
elif st.session_state.nav_page == "Performance":
    if not st.session_state.assessment_results:
        st.warning("No assessment data available. Please complete the assessment form first.")
        if st.button("Go to Analyze"):
            st.session_state.nav_page = "Analyze"
            st.rerun()
    else:
        results = st.session_state.assessment_results
        metrics = results["metrics"]
        prof = results["student_profile"]

        st.subheader(f"Performance: {prof['name']} ({prof['roll_no']})")
        st.caption(f"{prof['branch']} • {prof['year']}")

        m1, m2, m3, m4, m5 = st.columns(5)
        with m1:
            st.markdown(f"""
            <div class="metric-box">
                <div class="metric-label">Performance</div>
                <div class="metric-value" style="font-size:1.15rem; color:#0f172a;">{results['performance_level']}</div>
            </div>
            """, unsafe_allow_html=True)
        with m2:
            st.markdown(f"""
            <div class="metric-box">
                <div class="metric-label">Current Average</div>
                <div class="metric-value">{metrics['current_average']}%</div>
            </div>
            """, unsafe_allow_html=True)
        with m3:
            st.markdown(f"""
            <div class="metric-box">
                <div class="metric-label">Attendance</div>
                <div class="metric-value">{metrics['attendance']}%</div>
            </div>
            """, unsafe_allow_html=True)
        with m4:
            st.markdown(f"""
            <div class="metric-box">
                <div class="metric-label">Study Hours</div>
                <div class="metric-value">{metrics['study_hours']} <span style="font-size:0.85rem; font-weight:normal;">hrs/day</span></div>
            </div>
            """, unsafe_allow_html=True)
        with m5:
            st.markdown(f"""
            <div class="metric-box">
                <div class="metric-label">Failed Subjects</div>
                <div class="metric-value">{metrics['failed_subjects']}</div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)

        level = results["performance_level"]
        st.markdown(f"""
        <div class="advisor-card" style="border-left: 6px solid #0f172a;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:#64748b; font-weight:600;">Overall Standing</span>
            <h2 style="margin:0.2rem 0; color:#0f172a; font-weight:700;">{level}</h2>
            <p style="margin:0; color:#475569; font-size:0.95rem;">{results['performance_level_desc']}</p>
        </div>
        """, unsafe_allow_html=True)

        st.markdown(f"**Current Average Progress ({metrics['current_average']}%)**")
        st.progress(min(1.0, max(0.0, metrics['current_average'] / 100.0)))

        st.markdown("<br>", unsafe_allow_html=True)

        st.markdown("### Subject Analysis")
        st.caption("Classification: 90–100: Excellent • 75–89: Strong • 60–74: Satisfactory • 40–59: Needs Attention • 0–39: Weak")

        if results["subjects_analysis"]:
            num_subs = len(results["subjects_analysis"])
            sub_cols = st.columns(min(5, num_subs))
            for idx, sub in enumerate(results["subjects_analysis"]):
                col_target = sub_cols[idx % min(5, num_subs)]
                with col_target:
                    st.markdown(f"""
                    <div class="advisor-card" style="text-align:center; padding:1rem; border-top: 4px solid #334155;">
                        <div style="font-weight:600; font-size:0.95rem; color:#0f172a;">{sub['subject']}</div>
                        <div style="font-size:1.5rem; font-weight:700; color:#0f172a; margin:0.35rem 0;">{sub['marks']}%</div>
                        <div style="font-size:0.75rem; font-weight:700; color:#475569; text-transform:uppercase;">{sub['category']}</div>
                    </div>
                    """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)

        c_str, c_weak = st.columns(2)
        with c_str:
            st.markdown("""
            <div class="advisor-card" style="border-top: 4px solid #334155; height:100%;">
                <div class="advisor-card-title">Academic Strengths</div>
            """, unsafe_allow_html=True)
            if results["strengths"]:
                for st_item in results["strengths"]:
                    st.markdown(f"✓ {st_item}")
            else:
                st.markdown("No prominent strengths identified.")
            st.markdown("</div>", unsafe_allow_html=True)

        with c_weak:
            st.markdown("""
            <div class="advisor-card" style="border-top: 4px solid #64748b; height:100%;">
                <div class="advisor-card-title">Areas Requiring Attention</div>
            """, unsafe_allow_html=True)
            if results["weaknesses"]:
                for wk_item in results["weaknesses"]:
                    st.markdown(f"⚠ {wk_item}")
            else:
                st.markdown("No critical deficiencies detected.")
            st.markdown("</div>", unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)
        nav_col1, nav_col2 = st.columns(2)
        with nav_col1:
            if st.button("View Rule Engine Details", use_container_width=True):
                st.session_state.nav_page = "Rule Engine"
                st.rerun()
        with nav_col2:
            if st.button("View Recommendations", type="primary", use_container_width=True):
                st.session_state.nav_page = "Recommendations"
                st.rerun()


# =========================================================
# 4. RULE ENGINE PAGE
# =========================================================
elif st.session_state.nav_page == "Rule Engine":
    st.subheader("Rule-Based Inference Engine")
    st.markdown("""
    The system evaluates student information against a **Knowledge Base of IF–THEN rules**. 
    When a condition is satisfied, the corresponding rule is triggered and contributes to the final recommendation.
    """)

    if not st.session_state.assessment_results:
        st.info("Showing Knowledge Base rules catalog. Conduct an assessment to view triggered rules.")
        kb_rules = st.session_state.engine.rules
        st.markdown(f"**Total Rules in Knowledge Base:** `{len(kb_rules)}`")
        for r in kb_rules:
            with st.expander(f"{r.rule_id}: {r.title}"):
                st.markdown(f"**Condition:** `{r.condition_desc}`")
                st.markdown(f"**Inference:** `{r.inference_desc}`")
    else:
        results = st.session_state.assessment_results
        metrics = results["metrics"]

        r1, r2, r3 = st.columns(3)
        with r1:
            st.metric("Total Rules in Knowledge Base", metrics["total_rules_in_kb"])
        with r2:
            st.metric("Rules Triggered for Student", metrics["total_triggered"])
        with r3:
            st.metric("Recommendations Formulated", metrics["total_recommendations"])

        st.markdown("<br>", unsafe_allow_html=True)

        # Inference Trace
        st.markdown("### Inference Trace")
        for trace in results["inference_trace"]:
            st.markdown(f"""
            <div class="trace-node">
                <div style="font-weight:600; font-size:0.85rem; color:#0f172a;">
                    STEP #{trace['step_id']} • RULE {trace['rule_id']}: {trace['rule_title']}
                </div>
                <div style="font-size:0.85rem; color:#475569; margin-top:0.35rem;">
                    <b>Student Input:</b> {trace['input_fact']}<br>
                    <b>Evaluated Condition:</b> <code>{trace['condition_check']}</code><br>
                    <b>Asserted Knowledge:</b> {trace['inferred_fact']}<br>
                    <b>Action:</b> {trace['action_taken']}
                </div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)

        # Rules Breakdown
        st.markdown("### Production Rules Status")
        tab_trig, tab_nontrig = st.tabs([
            f"Triggered Rules ({len(results['triggered_rules'])})", 
            f"Non-Triggered Rules ({len(results['non_triggered_rules'])})"
        ])

        with tab_trig:
            for tr in results["triggered_rules"]:
                with st.expander(f"[{tr['rule_id']}] {tr['title']}", expanded=True):
                    st.markdown(f"**Condition:** `{tr['condition_desc']}`")
                    st.markdown(f"**Status:** `TRIGGERED`")
                    st.markdown(f"**Evaluated Data:** `{tr['condition_details']}`")
                    st.markdown(f"**Inference:** {tr['inference_desc']}")

        with tab_nontrig:
            for ntr in results["non_triggered_rules"]:
                with st.expander(f"[{ntr['rule_id']}] {ntr['title']}"):
                    st.markdown(f"**Condition:** `{ntr['condition_desc']}`")
                    st.markdown(f"**Status:** `NOT TRIGGERED`")
                    st.markdown(f"**Inference:** {ntr['inference_desc']}")


# =========================================================
# 5. RECOMMENDATIONS PAGE (No triggered rules displayed)
# =========================================================
elif st.session_state.nav_page == "Recommendations":
    st.subheader("PERSONALIZED ACADEMIC ADVICE")

    if not st.session_state.assessment_results:
        st.warning("No assessment performed yet. Please complete the assessment form first.")
        if st.button("Start Assessment"):
            st.session_state.nav_page = "Analyze"
            st.rerun()
    else:
        results = st.session_state.assessment_results
        recs = results["recommendations"]

        if not recs:
            st.success("No critical warnings or corrective actions triggered.")
        else:
            for idx, rec in enumerate(recs, start=1):
                st.markdown(f"""
                <div class="advisor-card" style="border-left: 6px solid #0f172a; background-color:#ffffff;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="margin:0; color:#0f172a; font-weight:700;">{idx}. {rec['title']}</h4>
                        <span style="font-size:0.8rem; font-weight:600; color:#475569;">Priority: {rec['priority'].upper()}</span>
                    </div>
                    <p style="color:#334155; font-size:0.95rem; margin:0.6rem 0 0 0; line-height:1.5;">
                        {rec['description']}
                    </p>
                </div>
                """, unsafe_allow_html=True)


# =========================================================
# 6. ABOUT PAGE
# =========================================================
elif st.session_state.nav_page == "About":
    st.subheader("About Student Performance Advisor")
    st.markdown("""
    **Student Performance Advisor** is a Rule-Based Artificial Intelligence / Expert System designed to analyze 
    academic information and provide explainable academic recommendations.
    """)

    st.markdown("---")

    col_a, col_b = st.columns(2)
    with col_a:
        st.markdown("#### PROJECT OBJECTIVE")
        st.markdown("""
        To provide students and academic advisors with an **explainable, deterministic diagnostic tool** 
        that evaluates course marks, attendance, and study habits using human-interpretable IF–THEN rules.
        """)

        st.markdown("#### KNOWLEDGE BASE")
        st.markdown("""
        The Knowledge Base (`rules.py`) contains declarative IF–THEN rules addressing:
        - Attendance requirements
        - Academic standing categories
        - Failed course interventions
        - High achievement recognition
        """)

    with col_b:
        st.markdown("#### INFERENCE ENGINE")
        st.markdown("""
        The Inference Engine (`advisor.py`) operates via forward chaining:
        1. Ingests student facts into working memory.
        2. Evaluates rule conditions.
        3. Identifies triggered rules and resolves priority.
        4. Outputs performance level and personalized recommendations.
        """)

        st.markdown("#### TECHNOLOGY")
        st.markdown("""
        - Python
        - Streamlit
        - Rule-Based AI (No Machine Learning, No External APIs)
        """)

    st.markdown("---")

    st.markdown("#### PROJECT FLOW")
    st.markdown("""
    ```text
    User Input ──► Knowledge Base ──► IF–THEN Rules ──► Inference Engine ──► Performance Analysis ──► Recommendation
    ```
    """)
    st.markdown("---")
    st.markdown("**Made by ANVESH & KIRAN**")
