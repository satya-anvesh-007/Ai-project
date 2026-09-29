# Student Performance Advisor
### Rule-Based AI / Academic Expert System
**College Artificial Intelligence — Unit-V Mini Project**

---

## 1. Project Overview
**Student Performance Advisor** is a deterministic, explainable Expert System built using **Rule-Based Artificial Intelligence**. The application evaluates academic indicators—customizable subjects and marks, calculated average, attendance percentage, daily study hours, and failed courses—against an expert Knowledge Base of declarative **IF–THEN production rules**. 

Unlike statistical machine learning or opaque neural networks, this expert system operates through **forward-chaining deduction**. Every finding, warning, strength, weakness, and recommendation is strictly traceable to the exact rules that fired, providing 100% auditable academic counsel.

---

## 2. Problem Statement
Academic institutions regularly face challenges in identifying at-risk students prior to final semester examinations. Typical challenges include:
- Attendance deficits resulting in last-minute examination debarment.
- Disproportionate study hours across diverse courses.
- Students failing to balance workloads across theory and laboratory subjects.
- Lack of personalized, transparent academic guidance detailing *why* an intervention is necessary.

Traditional predictive models act as "black boxes" that yield probability scores without intelligible explanations. Students and faculty mentors require a transparent, rule-grounded advisory system.

---

## 3. Objectives
1. **Explainability:** Ensure every academic recommendation can be directly traced back to satisfied conditions in the Knowledge Base.
2. **Deterministic Evaluation:** Remove statistical guesswork and hallucination by employing formal forward-chaining inference.
3. **Dynamic Academic Assessment:** Support any number of user-defined subjects with individual score inputs.
4. **Early Intervention:** Formulate prioritized recovery plans for students with backlogs or severe attendance shortages.

---

## 4. System Architecture & Flow

```text
Student Academic Input
      │ (Name, Custom Subjects & Marks, Attendance, Study Hours, Backlogs)
      ▼
Knowledge Base
      │ (Declarative Production Rules R01–R22)
      ▼
Inference Engine
      │ (Forward-Chaining Condition Matching & Conflict Resolution)
      ▼
Triggered Rules & Working Memory
      │ (Satisfied Antecedents & Intermediate Assertions)
      ▼
Performance Analysis
      │ (Standing Tier, Strengths & Weaknesses, Subject-by-Subject Breakdown)
      ▼
Personalized Academic Recommendations
        (Prioritized Actionable Advice with Rule Attribution)
```

---

## 5. Technology Stack
- **Programming Language:** Python 3
- **Frontend / Framework:** Streamlit
- **AI Methodology:** Classical Rule-Based Expert System (Production System)
- **Data Persistence:** Session State (No database, no user authentication)
- **External Dependencies:** No Machine Learning, No Neural Networks, No External AI APIs

---

## 6. Installation & Execution

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run the Streamlit Application
```bash
streamlit run app.py
```
The application will open in your default browser at `http://localhost:8501`.

---

## 7. Project Directory Structure
```text
student-performance-advisor/
├── app.py              # Streamlit UI & Multi-Page Navigation
├── advisor.py          # Forward-Chaining Inference Engine
├── rules.py            # Knowledge Base (IF–THEN Production Rules)
├── requirements.txt    # Project Dependencies (Streamlit)
└── README.md           # Project Documentation
```
