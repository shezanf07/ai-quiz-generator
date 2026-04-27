# AI Quiz Generator

A full-stack application that generates quizzes using AI.

## Project Structure

- **/client**: React frontend built with Vite and Tailwind CSS.
- **/server**: Node.js & Express backend with MongoDB.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Backend Setup (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   # Add AI related keys if applicable (e.g., OPENAI_API_KEY)
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup (Client)

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

---

## 🛠️ Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Lucide React (for icons)

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT) for Authentication
- Bcrypt for Password Hashing

---

## 📝 License

This project is for educational purposes.
