import { useState } from 'react';
import axios from 'axios';

interface BackendResponse {
    result: string;
}

export default function Home() {
    const [userInput, setUserInput] = useState<string>('');
    const [persona, setPersona] = useState<string>('professor');
    const [customPersona, setCustomPersona] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userInput.trim()) {
            setError('Please enter some text before submitting.');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');

        const selectedPersona = persona === 'custom' ? customPersona : persona;

        try {
            const res = await axios.post<BackendResponse>('http://localhost:5000/api/generate', {
                userInput,
                systemPersona: selectedPersona,
            });

            setResponse(res.data.result);
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Failed to connect to backend. Verify server status.');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Form Section */}
            <div className="max-w-2xl mx-auto px-6 pb-8">
                <header className="mb-12">
                    <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
                        AI Persona Studio
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="userInput" className="block text-sm text-zinc-400 mb-3">
                            Input Text
                        </label>
                        <textarea
                            id="userInput"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type a concept, code block, or text snippet..."
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors resize-y placeholder-zinc-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="personaSelect" className="block text-sm text-zinc-400 mb-3">
                            AI Persona
                        </label>
                        <select
                            id="personaSelect"
                            value={persona}
                            onChange={(e) => setPersona(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors appearance-none"
                        >
                            <option value="professor">Professor</option>
                            <option value="editor">Editor</option>
                            <option value="interviewer">Technical Interviewer</option>
                            <option value="custom">Custom Persona...</option>
                        </select>
                    </div>

                    {persona === 'custom' && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label htmlFor="customPersona" className="block text-sm text-zinc-400 mb-3">
                                Define Custom Persona
                            </label>
                            <input
                                id="customPersona"
                                type="text"
                                value={customPersona}
                                onChange={(e) => setCustomPersona(e.target.value)}
                                placeholder="e.g., A data analyst"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors placeholder-zinc-600"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex cursor-pointer justify-center py-3 px-4 rounded-lg text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <svg className="animate-spin h-4 w-4 text-zinc-900" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Generating...</span>
                            </span>
                        ) : (
                            'Generate Response'
                        )}
                    </button>
                </form>
            </div>

            {/* Output Section */}
            <div className={`max-w-5xl mx-auto px-6 pb-16 transition-opacity duration-500 ${response || loading ? 'opacity-100' : 'opacity-0'}`}>
                <div className="pt-8 border-t border-zinc-900">
                    <h2 className="text-sm font-medium text-zinc-500 mb-6 uppercase tracking-wider">Output</h2>

                    {loading && (
                        <div className="text-zinc-500 text-sm animate-pulse">
                            Processing...
                        </div>
                    )}

                    {response && (
                        <div className="rounded-lg bg-zinc-900/50 border border-zinc-800/50 p-6 leading-relaxed w-full">
                            <pre className="whitespace-pre-wrap font-mono text-zinc-300 text-sm overflow-x-auto">
                                {response}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}