
import React from 'react';
import { DocumentIcon, DocumentDuplicateIcon, CogIcon, HomeIcon } from './icons/HeroIcons';

interface SidebarProps {
  setView: (view: 'dashboard' | 'generator') => void;
  currentView: 'dashboard' | 'generator';
}

const Sidebar: React.FC<SidebarProps> = ({ setView, currentView }) => {
    const navItems = [
        { name: 'Panel de Control', view: 'dashboard', icon: HomeIcon },
        { name: 'Nuevo Documento', view: 'generator', icon: DocumentIcon },
        { name: 'Plantillas', view: 'dashboard', icon: DocumentDuplicateIcon },
        { name: 'Configuración', view: 'dashboard', icon: CogIcon },
    ];

    return (
        <aside className="w-16 md:w-64 bg-gray-950 p-2 md:p-4 flex flex-col transition-all duration-300">
            <div className="flex items-center mb-10">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h1 className="text-xl font-bold ml-3 hidden md:block">Rena-Core</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <li key={item.name} className="mb-2">
                            <button
                                onClick={() => setView(item.view as 'dashboard' | 'generator')}
                                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    currentView === item.view ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="ml-4 hidden md:block">{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto hidden md:block">
                <div className="p-4 bg-gray-800 rounded-lg text-center">
                    <p className="text-sm text-gray-400">Actualizar a Pro</p>
                    <p className="text-xs text-gray-500 mb-3">Desbloquea funciones avanzadas y documentos ilimitados.</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Actualizar</button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
