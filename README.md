# FTC Judge Prep

> **Practice FTC judging interviews in a safe environment. Get instant feedback. Build confidence. Win awards.**

FTC Judge Prep is a self-service training simulator for FIRST Tech Challenge teams to practice judging interviews, prepare for awards, and receive structured feedback without requiring mentors.

---

## 🎯 Features

- **Mock Judging Simulator**: Practice answering real judging questions with a timer
- **Award-Focused Preparation**: Specific guidance for Inspire, Think, Design awards
- **Rubric-Based Scoring**: Get scores on clarity, evidence, process, teamwork, impact, and alignment
- **Coach Mode**: Receive guiding questions (not answers!) to improve your responses
- **Readiness Check**: Assess your team's preparation with a diagnostic quiz
- **Resources Library**: Templates, common questions, and strategies
- **Team Dashboard**: Track progress and view practice history

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if needed (default values work for local development)

3. **Initialize database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
FTCJudje/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page
│   ├── onboarding/          # Team setup flow
│   ├── simulator/           # Mock judging simulator (MAIN FEATURE)
│   ├── awards/              # Awards hub & detail pages
│   ├── readiness/           # Readiness check quiz
│   ├── resources/           # Templates & tips
│   └── dashboard/           # Team progress dashboard
├── components/              # Reusable React components
│   ├── Navbar.tsx
│   ├── Timer.tsx
│   └── CoachModal.tsx
├── lib/                     # Core logic & data
│   ├── rubricEngine.ts      # Scoring algorithm
│   ├── coachEngine.ts       # Hint generation
│   └── data/
│       ├── awards.ts        # Award content (Inspire, Think, Design)
│       ├── questions.ts     # 30 common judging questions
│       └── readinessQuiz.ts # Diagnostic questions
├── prisma/
│   └── schema.prisma        # Database schema (SQLite)
└── README.md                # You are here!
```

---

## 🗄️ Database Schema

The app uses **SQLite** (via Prisma) for local data storage:

- **User**: User account
- **Team**: Team information, target awards, optional robot/outreach data
- **Session**: Mock interview sessions
- **Answer**: Individual question answers with coach hints usage
- **RubricScore**: Rubric scores per session (clarity, evidence, process, etc.)

To view/edit data visually:
```bash
npm run db:studio
```

---

## 🎓 How to Use

### 1. Onboarding
- Enter team name, experience level, and target awards
- Optionally add robot description and outreach summary

### 2. Mock Judging Simulator
- Select award focus (Inspire, Think, or Design)
- Choose duration (5, 10, or 15 minutes)
- Answer questions with a live timer
- Use "Coach Mode" for hints (doesn't give answers!)
- Receive rubric scores and feedback after session

### 3. Readiness Check
- Answer 10 diagnostic questions
- Get a readiness percentage (0-100%)
- Receive a customized action plan (3/7/14 days before competition)

### 4. Resources
- Learn answer structure templates (STAR, Problem→Action→Result)
- Review 30 common judging questions
- Read tips on time management, avoiding filler words, and metrics to track

### 5. Dashboard
- View practice history
- Track average scores over time
- Get personalized recommendations

---

## 🧪 How the Scoring Works

### Rubric Engine (Rule-Based)

The app evaluates answers using **keyword analysis** and **structure detection**:

- **Clarity**: Sentence count, answer length, coherence
- **Evidence**: Presence of data, numbers, test results
- **Process**: Iterations, problem-solving, learning from failures
- **Teamwork**: Collaboration keywords, team roles
- **Impact**: Outreach quantification, community reach
- **Alignment**: Award-specific keyword matching

Each category scores 0-4:
- **4**: Excellent (meets all criteria)
- **3**: Good (most criteria met)
- **2**: Needs improvement (some criteria missing)
- **1**: Weak (major gaps)

### Coach Mode (Guiding Questions)

Instead of providing answers, the Coach Mode asks:
- "What data proves this?"
- "How many iterations did you test?"
- "What was the measurable outcome?"

This encourages **critical thinking** without doing the work for the team.

---

## 🔮 Roadmap (v2 Features)

- [ ] Audio/video recording for practice answers
- [ ] AI-powered feedback (OpenAI/Gemini integration)
- [ ] Team collaboration (multi-user sessions)
- [ ] Mentor dashboard
- [ ] All 8 FTC awards (Innovate, Control, Connect, etc.)
- [ ] Firebase backend (real-time sync)
- [ ] Gamification (badges, streaks)

---

## 🔒 Privacy & Ethics

- **No personal data** of minors (names, photos, locations)
- **Team-level data only** (optional: robot description, outreach summary)
- **No ready-made answers**: App teaches thinking, not memorization
- **Aligned with FIRST values**: Gracious Professionalism, Coopertition

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (Prisma ORM)
- **UI Components**: Headless UI, Lucide React icons
- **Deployment**: Vercel (or any Node.js host)

### Future Migration to Firebase
The codebase is structured for easy migration to Firebase:
- Database models avoid complex SQL joins
- Auth layer can swap NextAuth → Firebase Auth
- API routes can convert to Firebase Functions

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio (database GUI)
```

---

## 🤝 Contributing

This is an MVP. Suggestions welcome!

### Ideas for Contribution:
- Add more awards content (Innovate, Control, Connect, etc.)
- Improve rubric scoring algorithm
- Add more common questions
- Create video tutorials
- Translate to other languages

---

## 📄 License

This project is open-source for educational purposes. Use it to help FTC teams prepare for judging!

---

## 🙏 Acknowledgments

Built for FIRST Tech Challenge teams who want to excel at judging interviews.

**Remember**: This is a practice tool, not a replacement for real preparation. Document your work, test your robot, and genuinely embody FIRST values!

---

## 🐛 Troubleshooting

### Database issues
```bash
# Delete database and recreate
rm prisma/dev.db
npx prisma db push
```

### TypeScript errors
```bash
# Regenerate Prisma client
npx prisma generate
```

### Port already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

---

**Good luck at your competition! 🏆**
