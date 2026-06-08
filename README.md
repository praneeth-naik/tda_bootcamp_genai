# AI Persona Studio

A minimal web application that allows users to interact with Google's Gemini AI through specialized personas.

## Features

* **Dynamic AI Personas:** Choose from predefined roles (Professor, Editor, Technical Interviewer) or create your own custom persona.
* **Session History:** Automatically tracks and saves generated prompts and responses during the active server session.
* **API Integration:** Connected directly to the `gemini-2.5-flash` model for incredibly fast, high-quality text responses.

## Tech Stack

**Frontend:**
* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* Axios

**Backend:**
* Node.js
* Express
* Google Generative AI SDK (`@google/generative-ai`)

---

## Getting Started

### Prerequisites

Need to have [Node.js](https://nodejs.org/) installed on your machine. Will also need a free [Google Gemini API Key](https://aistudio.google.com/).

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:
```bash
cd backend
```

Install the required dependencies:
```bash
npm install
```

Create a `.env` file in the root of the `backend` folder and add your Gemini API key:
```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

Start the backend development server:
```bash
npm run dev
```
*The server will run on `http://localhost:5000`.*

### 2. Frontend Setup

Open a new terminal window and navigate to the `frontend` directory:
```bash
cd frontend
```

Install the frontend dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The application will open on `http://localhost:5173`.*

---

## Usage

1. Open the frontend URL in your browser (`http://localhost:5173`).
2. In the **Studio** tab, type your prompt or paste text into the input box.
3. Select an AI persona from the dropdown menu. If you select "Custom Persona," a new input box will appear for you to define exactly how the AI should act (e.g., "A software developer").
4. Click **Generate Response**.
5. Navigate to the **History** tab at any time to view your past interactions from the current session.