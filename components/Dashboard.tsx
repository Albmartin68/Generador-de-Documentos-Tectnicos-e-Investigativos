import React from 'react';
import Card from './Card';
import { TEMPLATES } from '../constants';
import { useDocument } from '../contexts/DocumentContext';

const Dashboard: React.FC<{ setView: (view: 'generator') => void }> = ({ setView }) => {
    
    const { documents } = useDocument();
    const totalTemplates = Object.values(TEMPLATES).flat().length;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card title="Documentos Generados" value={documents.length.toString()} />
                <Card title="Plantillas Disponibles" value={totalTemplates.toString()} />
                <Card title="Días Restantes en Prueba" value="21" />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Actividad Reciente</h2>
                    <button className="text-blue-500 hover:underline">Ver Todo</button>
                </div>
                <div className="space-y-4">
                    {documents.length > 0 ? (
                        documents.slice(0, 3).map(doc => (
                            <div key={doc.id} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg animate-fade-in">
                                <div>
                                    <p className="font-semibold">{doc.title}</p>
                                    <p className="text-sm text-gray-400">
                                        {doc.templateName} - Generado el {doc.creationDate.toLocaleDateString('es-ES')} - {doc.outputFormat}
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">Ver</button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No se han generado documentos todavía.</p>
                            <p>¡Crea tu primer documento para ver la actividad aquí!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 p-6 bg-blue-900/30 border border-blue-700 rounded-lg flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold">¿Listo para crear tu próximo documento?</h3>
                    <p className="text-blue-300">Utiliza nuestras plantillas inteligentes para empezar.</p>
                </div>
                <button 
                    onClick={() => setView('generator')}
                    className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Crear Nuevo Documento
                </button>
            </div>
        </div>
    );
};

export default Dashboard;