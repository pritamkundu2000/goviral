# 🚀 Go Viral AI — AI Content Virality Analyzer

> Upload your video or image and let AI predict its viral potential with creator-focused insights, competitor analysis, trending audio recommendations, and actionable edits.

---

## ✨ Features

### 🎯 AI Virality Scoring

* Virality score
* Viral potential label
* Platform-specific optimization

### 🎬 Hook Analysis

* First impression analysis
* Curiosity gap evaluation
* Retention prediction

### 📈 Creator Insights

* Engagement prediction
* Replay potential
* Thumbnail effectiveness
* Caption optimization

### 🔥 Trending Discovery

* Trending hashtag recommendations
* Viral audio suggestions
* Competitor-style breakdowns

### 🎮 Interactive Loading Experience

While AI analyzes your content:

* Play **Beat the Algorithm**
* Avoid boring content obstacles
* Collect engagement boosts
* Keep users engaged during analysis

---

# 🏗️ Tech Stack

| Layer      | Technology         |
| ---------- | ------------------ |
| Frontend   | React + Vite + MUI |
| Backend    | Node.js + Express  |
| Storage    | AWS S3             |
| Database   | MongoDB Atlas      |
| AI         | NVIDIA Build API   |
| Deployment | Vercel + Render    |

---

# 🧠 AI Analysis Includes

The AI evaluates:

* Hook effectiveness
* Emotional engagement
* Viewer retention potential
* Curiosity gap strength
* Shareability
* Caption optimization
* Thumbnail performance
* Replay potential

---

# 📦 Project Structure

```bash
src/
 ├── components/
 │    ├── UploadZone.jsx
 │    ├── UploadProgress.jsx
 │    ├── LoadingScreen.jsx
 │    ├── BeatTheAlgorithm.jsx
 │    ├── ScoreCard.jsx
 │    ├── AnalysisDashboard.jsx
 │    └── HistoryTable.jsx
 │
 ├── services/
 │    └── api.js
 │
 ├── pages/
 │    └── Home.jsx
 │
 ├── App.jsx
 │
 └── main.jsx
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000

AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
AWS_REGION=YOUR_REGION
AWS_BUCKET_NAME=YOUR_BUCKET

MONGO_URI=YOUR_MONGO_URI

NVIDIA_API_KEY=YOUR_NVIDIA_API_KEY
```

---

# ☁️ AWS S3 Setup

## Required

* Create S3 bucket
* Enable CORS
* Create IAM user with S3 access

## Example S3 CORS

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

# 🧠 NVIDIA AI Setup

Using:

* `nvidia/nemotron-3-super-120b-a12b:free`
* OpenAI-compatible NVIDIA API

Create API key from:

[NVIDIA Build API](https://build.nvidia.com?utm_source=chatgpt.com)

---

# 🚀 Local Development

## 1️⃣ Clone Repository

```bash
git clone <your-repo>
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4️⃣ Run Backend

```bash
npm run dev
```

---

## 5️⃣ Run Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

## Frontend

Deploy on:

[Vercel](https://vercel.com?utm_source=chatgpt.com)

---

## Backend

Deploy on:

[Render](https://render.com?utm_source=chatgpt.com)

---

## Database

Use:

[MongoDB Atlas](https://www.mongodb.com/atlas/database?utm_source=chatgpt.com)

---

# 🎮 Beat the Algorithm Mini Game

During AI analysis users can:

* Move using WASD / Arrow keys
* Avoid boring-content obstacles
* Collect viral engagement boosts
* Increase viral reflex score

This improves:

* retention
* engagement
* UX quality
* perceived performance

---

# 📊 Example AI Response

```json
{
  "virality_score": 84,
  "viral_label": "High Viral Potential",
  "hook_strength": 9,
  "hook_analysis": "Strong curiosity-driven opening.",
  "pacing_rating": 8,
  "thumbnail_rating": 7,
  "caption_feedback": "Add stronger CTA for comments.",
  "best_platform": "Instagram Reels"
}
```

---

# 🔥 Future Roadmap

* Creator profile system
* Saved reports
* AI-generated captions
* Thumbnail generation
* Video clipping AI
* Creator leaderboard
* Team collaboration
* Multi-language support

---

# 🤝 Contributing

Pull requests are welcome.

For major changes:

* open an issue first
* discuss proposed improvements

---

# 📜 License

MIT License

---

# 💡 Inspiration

Inspired by modern creator analytics platforms and AI-powered growth tools helping creators optimize short-form content performance.

---

# ⭐ Support

If you like the project:

* star the repository
* share feedback
* contribute improvements

---

# 🚀 Built For Creators

Helping creators:

* grow faster
* optimize smarter
* go viral consistently
