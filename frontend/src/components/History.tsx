import { useState, useEffect } from 'react';
import axios from 'axios';

interface HistoryItem {
    id: string;
    timestamp: string;
    persona: string;
    userInput: string;
    response: string;
}

export default function History() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get<HistoryItem[]>('http://localhost:5000/api/history');
                setHistory(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch chat history.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 pb-16 animate-in fade-in duration-500">
            <header className="mb-12">
                <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
                    Session History
                </h1>
                <p className="text-sm text-zinc-500 mt-2">
                    Past interactions from your current server session.
                </p>
            </header>

            {loading && (
                <div className="text-zinc-500 text-sm animate-pulse">
                    Loading history...
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {error}
                </div>
            )}

            {!loading && !error && history.length === 0 && (
                <div className="text-zinc-500 text-sm">
                    No chat history found. Generate a response to see it here.
                </div>
            )}

            <div className="space-y-8">
                {history.map((item) => (
                    <div key={item.id} className="rounded-lg bg-zinc-900/50 border border-zinc-800/50 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-medium px-2 py-1 bg-zinc-800 text-zinc-300 rounded uppercase tracking-wider">
                                {item.persona}
                            </span>
                            <span className="text-xs text-zinc-500 font-mono">
                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Prompt</h3>
                            <p className="text-zinc-300 text-sm">{item.userInput}</p>
                        </div>

                        <div className="pt-4 border-t border-zinc-800/50">
                            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Response</h3>
                            <pre className="whitespace-pre-wrap font-mono text-zinc-300 text-sm overflow-x-auto">
                                {item.response}
                            </pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}