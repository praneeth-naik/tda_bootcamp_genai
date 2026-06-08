import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatHistory = [];

app.use(cors());
app.use(express.json());

app.get('/api/history', (req, res) => {
    const reversedHistory = [...chatHistory].reverse();
    res.json(reversedHistory);
});

app.post('/api/generate', async (req, res) => {
    const { userInput, systemPersona } = req.body;

    if (!userInput || userInput.trim() === "") {
        return res.status(400).json({ error: "Input text cannot be empty." });
    }   

    let finalInstruction = "";

    switch (systemPersona) {
        case 'professor':
            finalInstruction = "You are an expert professor. Explain the following concept clearly, using an analogy, and break it down in detail.";
            break;
        case 'editor':
            finalInstruction = "You are an expert editor. Provide a concise, highly readable summary of the following text using bullet points for key takeaways.";
            break;
        case 'interviewer':
            finalInstruction = "You are a technical interviewer. Based on the topic or role provided, generate 5 relevant interview questions along with a brief hint of what a good answer should include for each.";
            break;
        case '':
        case undefined:
            finalInstruction = "Respond to the user request.";
            break;
        default:
            finalInstruction = systemPersona;
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent(`${finalInstruction}\n\nUser Input: ${userInput}`);
        
        const responseText = result.response.text();

        chatHistory.push({
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            persona: systemPersona || 'custom',
            userInput: userInput,
            response: responseText
        });

        res.json({ result: responseText });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});