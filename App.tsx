import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentGenerator from './components/DocumentGenerator';
import { DocumentProvider } from './contexts/DocumentContext';
import './index.css';


function App() {
  const [view, setView] = useState<'dashboard' | 'generator'>('dashboard');

  return (
    <DocumentProvider>
      <div className="flex h-screen bg-gray-900 text-white font-sans">
        <Sidebar setView={setView} currentView={view} />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {view === 'dashboard' && <Dashboard setView={setView} />}
          {view === 'generator' && <DocumentGenerator />}
        </main>
      </div>
    </DocumentProvider>
  );
}

export default App;
