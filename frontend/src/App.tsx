import { useState } from 'react';
import Home from './components/Home';
import History from './components/History';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'history'>('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 pt-12">

      {/* Navigation Bar */}
      <nav className="max-w-2xl mx-auto px-6 mb-12 flex space-x-6 border-b border-zinc-900 pb-4">
        <button
          onClick={() => setCurrentView('home')}
          className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'home' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          Studio
        </button>
        <button
          onClick={() => setCurrentView('history')}
          className={`text-sm font-medium transition-colors cursor-pointer ${currentView === 'history' ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          History
        </button>
      </nav>

      {/* Main Content Area */}
      <main>
        {currentView === 'home' ? <Home /> : <History />}
      </main>

    </div>
  );
}