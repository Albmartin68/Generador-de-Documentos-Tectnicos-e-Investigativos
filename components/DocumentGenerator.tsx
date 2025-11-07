import React, { useState } from 'react';
import { useDocument } from '../contexts/DocumentContext';
import { SUBCORE_CATEGORIES, TEMPLATES } from '../constants';
import { Template } from '../types';

const DocumentGenerator: React.FC = () => {
    const {
        generatorState,
        setSubcore,
        setTemplate,
        setSourceContent,
        setOutputFormat,
        generateDocument,
        resetGenerator,
    } = useDocument();
    
    const [title, setTitle] = useState('');
    const [docGenerated, setDocGenerated] = useState(false);

    const { subcore, template, sourceContent, outputFormat, isLoading, error, generatedContent } = generatorState;

    const handleGenerate = async () => {
        const success = await generateDocument(title);
        if (success) {
            setDocGenerated(true);
        }
    };

    const handleReset = () => {
        resetGenerator();
        setTitle('');
        setDocGenerated(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg">Generando tu documento... Esto puede tardar unos momentos.</p>
            </div>
        );
    }
    
    if (docGenerated && generatedContent) {
        return (
            <div className="animate-fade-in">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <div className="bg-gray-800 p-6 rounded-lg mb-6 max-h-[60vh] overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-sm">{generatedContent}</pre>
                </div>
                 <button 
                    onClick={handleReset}
                    className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Crear Otro Documento
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Generador de Documentos</h1>
            <p className="text-gray-400 mb-8">Sigue los pasos para crear un nuevo documento técnico.</p>

            {/* Step 1: Select Subcore */}
            {!subcore && (
                 <section className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4">1. Elige una especialidad</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(SUBCORE_CATEGORIES).map(([key, value]) => (
                            <button key={key} onClick={() => setSubcore(key as any)} className="p-6 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <div className="flex items-center">
                                    <value.icon className="w-8 h-8 mr-4 text-blue-400" />
                                    <div>
                                        <h3 className="font-bold text-lg">{value.name}</h3>
                                        <p className="text-gray-400 text-sm">{value.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                 </section>
            )}

            {/* Step 2: Select Template */}
            {subcore && !template && (
                 <section className="animate-fade-in">
                    <button onClick={() => setSubcore(null)} className="flex items-center text-blue-400 hover:underline mb-4">
                         Volver a especialidades
                    </button>
                    <h2 className="text-xl font-semibold mb-4">2. Selecciona una plantilla para <span className="text-blue-400">{SUBCORE_CATEGORIES[subcore as keyof typeof SUBCORE_CATEGORIES].name}</span></h2>
                    <div className="space-y-3">
                        {TEMPLATES[subcore].map((t: Template) => (
                            <button key={t.name} onClick={() => setTemplate(t)} className="w-full p-4 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <h3 className="font-bold">{t.name}</h3>
                                <p className="text-gray-400 text-sm">{t.description}</p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Step 3: Input Content */}
            {subcore && template && (
                 <section className="animate-fade-in">
                    <button onClick={() => setTemplate(null)} className="flex items-center text-blue-400 hover:underline mb-4">
                        Volver a plantillas
                    </button>
                     <h2 className="text-xl font-semibold mb-4">3. Completa los detalles del documento</h2>

                    <div className="bg-gray-800 p-6 rounded-lg space-y-6">
                        <div>
                            <label htmlFor="doc-title" className="block text-sm font-medium text-gray-300 mb-2">Título del Documento</label>
                            <input
                                type="text"
                                id="doc-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej: Reporte de Pruebas Q3"
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="source-content" className="block text-sm font-medium text-gray-300 mb-2">Contenido Fuente</label>
                            <textarea
                                id="source-content"
                                rows={10}
                                value={sourceContent}
                                onChange={(e) => setSourceContent(e.target.value)}
                                placeholder="Pega aquí el contenido base, notas, datos brutos, o un borrador..."
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="output-format" className="block text-sm font-medium text-gray-300 mb-2">Formato de Salida</label>
                            <select
                                id="output-format"
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {template.supportedFormats.map(format => (
                                    <option key={format} value={format}>{format}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    
                    <div className="mt-8 flex justify-end">
                         <button 
                            onClick={handleGenerate}
                            disabled={!title || !sourceContent || !outputFormat}
                            className="px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            Generar Documento
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default DocumentGenerator;
