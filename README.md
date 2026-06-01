# AI Education Chatbot

## Overview

This project is an AI-powered Education Chatbot developed as coursework for the Artificial Intelligence module.

The chatbot provides information related to the Software Engineering Degree offered through London Metropolitan University. The system follows a three-tier architecture consisting of a Natural Language Interface, Inference Engine, and Knowledge Base.

The chatbot can answer questions regarding:

- Course fees
- Duration
- Intake dates
- Registration process
- Entry qualifications
- Subjects/modules
- Lecturers
- Available seats
- Campus information

If a question cannot be answered from the database, the system uses an LLM fallback through OpenRouter API.

---

## Technologies Used

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI Features
- Keyword Matching
- Fuzzy String Matching
- LLM Fallback
- Natural Language Processing

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

Create:

backend/.env

Example:

```env
MONGO_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_api_key
PORT=5000
```

---

## Features

- Education assistance
- Course information retrieval
- MongoDB knowledge base
- AI fallback responses
- Spelling correction support
- Responsive chat interface

---

## Authors

Member 1
- Backend Development
- Database Integration
- API Integration

Member 2
- Frontend Development
- UI Design
- Knowledge Base Preparation
