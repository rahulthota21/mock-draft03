# 🧠 Project Overview

## 📛 Project Name
**AI-Based Mock Interview & Resume Screening System**

---

## 🎯 Core Goal
To **automate and improve hiring** using AI for resume screening and interviews — saving time, reducing bias, and providing smart candidate evaluation.

---

## 🔍 Modules & Features

### 1. ✅ AI Resume Screening (✅ Working & Integrated)
#### 🧩 What it does:
- Accepts **ZIP files** or **Google Drive links** with resumes.
- Uses **OCR + NLP** to read and analyze structured/unstructured resumes.
- Extracts key elements like:
  - Skills
  - Experience
  - Certifications
- Applies weighted scoring (e.g., experience = 3, certifications = 1).
- Dynamically **ranks candidates** and returns scores.
- **Anonymizes PII** to reduce bias.

#### 📤 Outputs:
- JSON & CSV format
- Ranked candidate list with explainable scores

#### 🛠️ Tech Stack:
- **FastAPI** backend
- `/upload-resumes/` and `/ranked-candidates` endpoints
- Optional **PostgreSQL** storage
- **Dockerized**
- Ready for **AWS/GCP** deployment

---

### 2. 🧪 AI Mock Interview System (🛠️ Planned)
#### 🧩 What it will do:
- Conduct **adaptive mock interviews** (technical + behavioral).
- Analyze:
  - Voice tone
  - Facial expressions
  - Posture and fluency
- Adjust question difficulty in real-time.
- Return **interview feedback & score**.

#### 🛠️ Tech Requirements:
- Access to webcam + mic
- Multimodal AI models
- OpenAI or Mistral API for adaptive questions

---

## 👥 Users

| Role            | Access/Actions                                                                 |
|-----------------|---------------------------------------------------------------------------------|
| Recruiters/HR   | Upload resumes, view ranked candidates, download reports                        |
| Job Seekers     | Upload resumes, take mock interviews, get feedback                              |
| Admins          | Manage AI configs, track logs, maintain compliance                              |

---

## 🌐 Platform Requirements

- Fully **Web-based** & responsive
- **Browser Support**: Chrome, Firefox, Edge
- **Cloud Deployment**: AWS or GCP
- **Database**: PostgreSQL or MongoDB
- **Backend**: FastAPI
- **AI Integration**: Handled by AI team
- **Data Compliance**: GDPR/CCPA-compliant (no PII in ranking)

#### ⚡ Performance Benchmarks:
- Resume screening response time: **< 2 seconds**
- Interview feedback latency: **< 500ms**

---

## 🧩 Your Role

You're handling:

✅ **Frontend (Next.js)**  
- UI/UX  
- State management  
- API Integration  

✅ **Backend Development**  
- Web APIs  
- Database connections  
- Docker/Nginx setup  

✅ **Deployment & DevOps**  
- Packaging  
- Server setup  
- Logs & performance tuning  

❌ **Not your responsibility**  
- AI model building and tuning (done by AI team)
