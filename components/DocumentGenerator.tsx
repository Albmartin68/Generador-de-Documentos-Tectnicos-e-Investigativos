import React, { useState } from 'react';
import { SUBCORE_CATEGORIES, TEMPLATES } from '../constants';
import { SubcoreType, Template, SupportedFormat, Flashcard, FlashcardType } from '../types';
import { generateDocumentContent } from '../services/geminiService';
import { useDocument } from '../contexts/DocumentContext';
import { ArrowLeftIcon, SparklesIcon, DocumentArrowDownIcon, ExclamationTriangleIcon, LightBulbIcon } from './icons/HeroIcons';

const FlashcardIcon: React.FC<{ type: FlashcardType }> = ({ type }) => {
    switch (type) {
        case 'error':
            return <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />;
        case 'suggestion':
            return <LightBulbIcon className="h-6 w-6 text-yellow-400" />;
        case 'keyInfo':
            return <SparklesIcon className="h-6 w-6 text-cyan-400" />;
        default:
            return null;
    }
};

const DocumentGenerator: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedSubcore, setSelectedSubcore] = useState<SubcoreType | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [documentTitle, setDocumentTitle] = useState('');
    const [language, setLanguage] = useState('Español');
    const [keyPoints, setKeyPoints] = useState('');
    const [outputFormat, setOutputFormat] = useState<SupportedFormat>('Markdown');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { addDocument, generateFlashcards, flashcards, isFlashcardLoading, clearFlashcards } = useDocument();

    const handleSubcoreSelect = (subcore: SubcoreType) => {
        setSelectedSubcore(subcore);
        setStep(2);
    };

    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        setOutputFormat(template.supportedFormats[0]); 
        setStep(3);
    };

    const handleGenerate = async () => {
        if (!selectedTemplate || !selectedSubcore || !documentTitle || !keyPoints) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setGeneratedContent('');
        clearFlashcards();

        try {
            const content = await generateDocumentContent({
                template: selectedTemplate,
                subcore: selectedSubcore,
                title: documentTitle,
                language,
                keyPoints,
                outputFormat,
            });
            setGeneratedContent(content);
            addDocument({
                id: new Date().toISOString(),
                title: documentTitle,
                content,
                templateName: selectedTemplate.name,
                subcore: selectedSubcore,
                outputFormat,
                creationDate: new Date(),
            });
            setStep(4);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAnalyze = async () => {
        if (!generatedContent) return;
        await generateFlashcards(generatedContent);
    }
    
    const handleDownload = () => {
        if (!generatedContent) return;
        const blob = new Blob([generatedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = {
            'Markdown': 'md',
            'PDF': 'txt', // PDF generation is complex, download as txt
            'LaTeX': 'tex',
            'Word': 'txt' // Word generation is complex, download as txt
        }[outputFormat];
        a.download = `${documentTitle || 'documento'}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setStep(1);
        setSelectedSubcore(null);
        setSelectedTemplate(null);
        setDocumentTitle('');
        setLanguage('Español');
        setKeyPoints('');
        setOutputFormat('Markdown');
        setGeneratedContent('');
        setError(null);
        clearFlashcards();
    }
    
    const renderStepContent = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Selecciona una Categoría</h2>
                        <p className="text-gray-400 mb-6">Elige el área de especialización para tu documento.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(SUBCORE_CATEGORIES).map(([key, { name, icon: Icon, description }]) => (
                                <button key={key} onClick={() => handleSubcoreSelect(key as SubcoreType)} className="p-6 bg-gray-800 rounded-lg text-left hover:bg-gray-700 hover:scale-105 transition-transform duration-200">
                                    <Icon className="h-8 w-8 text-blue-500 mb-3" />
                                    <h3 className="text-lg font-bold">{name}</h3>
                                    <p className="text-sm text-gray-400">{description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <button onClick={() => setStep(1)} className="flex items-center gap-2 mb-4 text-blue-400 hover:text-blue-300">
                           <ArrowLeftIcon className="h-5 w-5" /> Volver a Categorías
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Selecciona una Plantilla</h2>
                        <p className="text-gray-400 mb-6">Estas son las plantillas recomendadas para {selectedSubcore}.</p>
                        <div className="space-y-3">
                            {selectedSubcore && TEMPLATES[selectedSubcore].map(template => (
                                <button key={template.name} onClick={() => handleTemplateSelect(template)} className="w-full p-4 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-colors duration-200">
                                    <h3 className="font-bold">{template.name}</h3>
                                    <p className="text-sm text-gray-400">{template.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                     <div>
                        <button onClick={() => setStep(2)} className="flex items-center gap-2 mb-4 text-blue-400 hover:text-blue-300">
                            <ArrowLeftIcon className="h-5 w-5" /> Volver a Plantillas
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Detalles del Documento</h2>
                        <p className="text-gray-400 mb-6">Proporciona la información clave para generar tu <span className="font-semibold text-blue-400">{selectedTemplate?.name}</span>.</p>
                        <div className="space-y-4">
                            <input type="text" placeholder="Título del Documento" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Español</option>
                                <option>Inglés</option>
                            </select>
                            <textarea placeholder="Puntos clave, temas a cubrir, o un resumen del contenido..." value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} rows={6} className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" />
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Formato de Salida</label>
                                <div className="flex gap-2">
                                    {selectedTemplate?.supportedFormats.map(format => (
                                        <button key={format} onClick={() => setOutputFormat(format)} className={`px-4 py-2 rounded-lg ${outputFormat === format ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isLoading} className="mt-6 w-full flex justify-center items-center gap-2 py-3 px-6 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                            {isLoading ? 'Generando...' : 'Generar Documento'}
                            <SparklesIcon className="h-5 w-5" />
                        </button>
                        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                    </div>
                );
            case 4:
                 return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">¡Documento Generado!</h2>
                        <p className="text-gray-400 mb-6">Tu <span className="font-semibold text-blue-400">{selectedTemplate?.name}</span> está listo.</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Columna del documento */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Contenido del Documento</h3>
                                <div className="bg-gray-950 p-4 rounded-lg border border-gray-700 h-96 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                                </div>
                            </div>

                            {/* Columna de análisis y flashcards */}
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold mb-2">Análisis y Sugerencias</h3>
                                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex-1 flex flex-col">
                                    {isFlashcardLoading ? (
                                        <div className="m-auto text-center text-gray-400">
                                            <p>Analizando el contenido...</p>
                                        </div>
                                    ) : flashcards.length > 0 ? (
                                        <div className="space-y-3 overflow-y-auto">
                                            {flashcards.map((card, index) => (
                                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
                                                    <FlashcardIcon type={card.type} />
                                                    <p className="text-sm text-gray-300">{card.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="m-auto text-center text-gray-500">
                                            <p>Haz clic en el botón para analizar el documento y obtener sugerencias.</p>
                                        </div>
                                    )}
                                    <button onClick={handleAnalyze} disabled={isFlashcardLoading} className="mt-4 w-full flex justify-center items-center gap-2 py-2 px-4 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                                        {isFlashcardLoading ? 'Analizando...' : 'Analizar y Generar Flashcards'}
                                    </button>
                                </div>
                            </div>
                        </div>
                         <div className="mt-6 flex gap-4">
                            <button onClick={reset} className="flex-1 py-3 px-6 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                                Crear Otro Documento
                            </button>
                            <button onClick={handleDownload} className="flex-1 flex justify-center items-center gap-2 py-3 px-6 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Descargar <DocumentArrowDownIcon className="h-5 w-5" />
                            </button>
                         </div>
                    </div>
                );
        }
    }
    
    return (
        <div className="max-w-7xl mx-auto">
            {renderStepContent()}
        </div>
    );
};

export default DocumentGenerator;
