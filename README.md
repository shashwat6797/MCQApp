# Project Setup Guide

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create an `.env` file:**
   - Add the following environment variables:
     ```env
     ACCESS_TOKEN_SECRET=your_access_token_secret
     REFRESH_TOKEN_SECRET=your_refresh_token_secret
     ```
   - Generate secure values for these variables from [jwtsecret.com](https://jwtsecret.com/generate).

3. **Run MongoDB instance:**
   - Start MongoDB using:
     ```bash
     mongod
     ```
   - If MongoDB is not installed, follow the installation guide: [MongoDB Installation](https://www.mongodb.com/docs/manual/installation/)

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Seed the database with initial questions:**
   ```bash
   node seedDb.js
   ```

6. **Start the backend server:**
   ```bash
   npm run start
   ```

---

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create an `.env` file:**
   - Add the following environment variables:
     ```env
     VITE_API_BASE_URL=http://localhost:3000/
     VITE_API_AUTH_URL=api/auth
     VITE_API_TEST_URL=api/test
     VITE_API_QUESTION_URL=api/question
     VITE_API_REFRESH_TOKEN_URL=/refresh-token
     ```

4. **Run the frontend application:**
   ```bash
   npm run dev
   ```

---

Now you can use the website by visiting the local frontend URL provided after running the frontend server.

