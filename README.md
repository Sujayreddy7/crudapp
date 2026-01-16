# 📒 Media Notes Platform

A full-stack web application that allows users to create, manage, and securely access notes with **text, images, and videos**.  
Built to demonstrate real-world backend + frontend integration, authentication, and media handling.

---

## 🚀 Features

- 🔐 User authentication using **JWT**
- 📝 Create, edit, and delete notes
- 🖼 Upload images and videos with notes
- 👤 User-specific data access (permissions)
- 📱 Responsive frontend UI
- ⚡ RESTful API architecture

---

## 🛠 Tech Stack

### Frontend
- React JS
- Axios
- React Hooks

### Backend
- Django
- Django REST Framework
- JWT Authentication

### Database
- MySQL

---

## 🧠 Application Flow

1. User registers / logs in
2. JWT access token is issued
3. React frontend sends API requests using Axios
4. Django REST API validates the token
5. User-specific notes are fetched or modified
6. Media files are securely uploaded and stored

---

## 🔐 Authentication

- JWT-based authentication
- Access and refresh tokens
- Protected API endpoints
- Token validation on every request

---

## 📂 Media Handling

- Supports image and video uploads
- Media linked to specific notes
- Only authenticated users can access their own media
- Backend validates file types and size

---

## ⚙️ Installation & Setup

### Backend Setup

```bash
git clone https://github.com/your-username/media-notes.git
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
cd frontend
npm install
npm start
