# Azure Task

**Azure Task** is a full-stack web application that allows users to manage their personal to-do lists. Users can sign up, log in, and create tasks that are unique to them. The app features long-press task editing, animated transitions, and clean styling — all built with React, Node.js, SQLite, and Framer Motion.

---

## ✨ Features

- User authentication (JWT-based)
- Create, read, update, and complete tasks
- Hold to edit: long-press a task to change its name
- Smooth transitions using **Framer Motion**
- Fully responsive design
- SQLite for lightweight persistent storage
- Task state is protected per user

---

## ⚙️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- SQLite3
- JWT for authentication
- bcrypt for password hashing

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/azure-task.git
cd azure-task
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Start development servers

#### Backend
```bash
node server.js
```

#### Frontend
```bash
npm run dev
```

---

## 🔐 API Endpoints

| Method | Route                     | Description                 |
|--------|---------------------------|-----------------------------|
| POST   | `/api/register`           | Register a new user         |
| POST   | `/api/login`              | Login user + get token      |
| GET    | `/api/tasks`              | Get current user's tasks    |
| POST   | `/api/tasks`              | Add a new task              |
| PUT    | `/api/tasks/:id`          | Mark task as done           |
| PUT    | `/api/tasks/edit/:id`     | Edit task name/color        |

> All `/api/tasks` routes require a valid `Authorization: Bearer <token>` header.

---

## 🧑‍💻 Author

Made with ❤️ by **Yousef**  
Feel free to fork, contribute, and improve!
