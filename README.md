# 🌊 Âncora - DBT Tracking App

<div align="center">

![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)
![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## 🧠 What is Âncora?

**Âncora** is a **DBT (Dialectical Behavior Therapy)** tracking app designed to help users:
- Log their daily actions and emotional behaviors
- Build awareness of patterns over time
- Organize their week into structured reflections
- Export their progress into a **PDF report** to share with therapists or doctors

Instead of trying to “remember everything,” Âncora gives you a **clear, structured system** to understand your behavior — one day at a time.


## ✨ Features

### 🗓️ Weekly Tracking System

-	Create weekly logs
-	Automatically organize entries by date
-	Visual overview of completed days
-	Simple and intuitive structure

### 📝 Daily Entries

-	Track whether a day was “filled” or not
-	Designed for DBT-style reflection
-	Lightweight input system (no overwhelm)

### 📊 Progress Awareness

-	See how many days you completed in a week
-	Build consistency over time
-	Identify behavioral patterns

### 📄 PDF Export

-	Export weekly data into a clean PDF report
-	Share directly with:
-	Therapists
-	Psychologists
-	Doctors

### 🔐 Authentication System

-	Secure login & signup
-	JWT-based authentication
-	Protected routes
-	Auto logout on token expiration


## 🛠️ Tech Stack

### Frontend

-	React 18 – Modern UI development
-	TypeScript – Type safety and scalability
-	Vite – Fast build tool
-	Tailwind CSS – Clean and consistent styling
-	React Router – Client-side routing
-	Axios – API communication

### Backend

-	Ruby on Rails (API mode) – RESTful backend
-	Devise + JWT – Authentication system
-	PostgreSQL – Relational database
-	Active Record – ORM for data handling

### Architecture

-	Monorepo structure:

```
/backend   → Rails API
/frontend  → React app
```

-	RESTful API (/api/v1)
-	Token-based authentication (stateless)


## 🚀 Getting Started

### Prerequisites

-	Node.js 18+
-	Ruby 3+
-	PostgreSQL

### Installation

1. Clone the repository

```
git clone https://github.com/devanaclimgo/ancora.git
cd ancora
```

2. Backend setup (Rails API)

```
cd backend
bundle install
rails db:create db:migrate
rails server
```

3. Frontend setup (React)

```
cd frontend
npm install
npm run dev
```

4. Open your browser

```
http://localhost:5173
```


## Project Structure

```
ancora/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── api/v1/
│   │   │       ├── weeks_controller.rb
│   │   │       └── day_entries_controller.rb
│   │   ├── models/
│   │   │   ├── user.rb
│   │   │   ├── week.rb
│   │   │   └── day_entry.rb
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CreateWeek.tsx
│   │   │   └── WeekDetails.tsx
│   │   ├── components/
│   │   │   └── dashboard/
│   │   └── api/
│   │       └── axios.ts
│
└── README.md
```


## 🔐 Authentication Flow

  1.	User logs in via /login
  2.	Backend returns a JWT token
  3.	Token is stored in localStorage
  4.	Axios interceptor attaches token to all requests:

```git
Authorization: Bearer <token>
```

  5.	Backend validates token → current_user is available


## 🎯 Project Goals
-	Help users build self-awareness through structured tracking
-	Provide a simple system for DBT practice
-	Reduce mental overload when reflecting on behavior
-	Enable professional collaboration through data sharing
-	Create a tool that is both technical and deeply human


## 💡 Future Improvements
-	📄 Weekly habit tracking with checkbox
-	📊 Data visualization (charts & insights)
-	🔔 Reminders for daily entries
-	🧠 Advanced DBT tools integration


## 👩‍💻 Creator

**Ana Clara** - The mind behind Âncora

  - 📧 **Email**: anaclimgo@gmail.com
  - 🔗 **GitHub**: [@devanaclimgo](https://github.com/devanaclimgo)
  - 💼 **LinkedIn**: [Ana Clara Gomes](https://www.linkedin.com/in/ana-clara-gomes-48b83b224/)


---

<div align="center">

###### Made with ❤️ by Ana Clara

</div>
