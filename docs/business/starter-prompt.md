# Starter Prompt Template

Use this template to describe your app idea to Claude Code. The more specific you are, the better the results!

---

## App Overview

**Name:** [Your App Name]

**Description:** [One paragraph describing what your app does and who it's for]

**Target Users:** [Who will use this app?]

---

## Core Features

### Feature 1: [Feature Name]
- [What it does]
- [Key functionality]
- [User benefit]

### Feature 2: [Feature Name]
- [What it does]
- [Key functionality]
- [User benefit]

### Feature 3: [Feature Name]
- [What it does]
- [Key functionality]
- [User benefit]

---

## User Journey

1. **Discovery:** [How users find your app]
2. **Onboarding:** [First steps after sign up]
3. **Core Action:** [Main thing users do]
4. **Value Delivery:** [How they get value]
5. **Retention:** [Why they come back]

---

## Technical Requirements

### Database Schema
- **Table 1:** [name] - [description]
  - Fields: [list key fields]
- **Table 2:** [name] - [description]
  - Fields: [list key fields]

### Integrations Needed
- [ ] AI features (OpenAI)
- [ ] Payments (Stripe)
- [ ] Email notifications
- [ ] Analytics tracking
- [ ] Other: [specify]

### Special Considerations
- [Any unique technical requirements]
- [Performance needs]
- [Security requirements]

---

## Example Prompt

```
I want to build a task management app for freelancers called "TaskFlow".

Core Features:
1. Quick Task Creation
   - User can add tasks with title, description, due date
   - AI suggests tags based on description
   - Set priority (high/medium/low)

2. Smart Organization
   - Auto-categorize into projects
   - Show tasks by priority and deadline
   - Filter by tags and status

3. Analytics Dashboard
   - Track completed tasks per week
   - Productivity trends over time
   - Time spent by category

Target Users: Freelancers and solo entrepreneurs who need simple task tracking

User Journey:
1. Sign in with Google
2. Add first task with description
3. AI suggests relevant tags
4. View organized dashboard
5. Check off completed tasks
6. Review weekly stats

Database Schema:
- tasks table (id, title, description, priority, due_date, status, user_id, tags, project_id, created_at)
- projects table (id, name, color, user_id, created_at)
- tags table (id, name, user_id, created_at)

Integrations: AI for tag suggestions, analytics tracking

Please create the database schema, API routes, and UI components for this.
```

---

## Tips for Better Prompts

1. **Be Specific:** Include exact field names, user flows, and technical details
2. **Start Simple:** Begin with MVP features, add complexity later
3. **Include Examples:** Show sample data or user interactions
4. **Think Mobile:** Consider how features work on different screen sizes
5. **Plan Data:** Think through what data you need to store and retrieve

---

Ready to build? Copy this template, fill it out, and paste into Claude Code!
