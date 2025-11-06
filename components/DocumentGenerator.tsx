import React, { useState } from 'react';
import { useDocument } from '../contexts/DocumentContext';
import { SubcoreType, Template } from '../types';
import { TEMPLATES } from '../constants';
import { SoftwareIcon, EngineeringIcon, MedicalIcon, EducationIcon } from './icons/SpecialtyIcons';
import { SparklesIcon, ArrowLeftIcon } from './icons/HeroIcons';


const subcoreOptions = [
    { id: SubcoreType.SOFTWARE, name: 'Software', icon: SoftwareIcon },
    { id: SubcoreType.ENGINEERING, name: 'Ingeniería', icon: EngineeringIcon },
    { id: SubcoreType.MEDICAL, name: 'Médico', icon: MedicalIcon },
    { id: SubcoreType.EDUCATION, name: 'Educación', icon: EducationIcon },
];

const DocumentGenerator: React.FC = () => {
    const {
        subcore, setSubcore,
        template, setTemplate,
        sourceContent, setSourceContent,
        outputFormat, setOutputFormat,
        generatedContent,
        isLoading,
        error,
        generateDocument,
        reset,
    } = useDocument();

    const [step, setStep] = useState(1);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleSubcoreSelect = (sc: SubcoreType) => {
        setSubcore(sc);
        handleNext();
    };

    const handleTemplateSelect = (t: Template) => {
        setTemplate(t);
        handleNext();
    };
    
    const startOver = () => {
        reset();
        setStep(1);
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Select Subcore
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Selecciona tu Dominio</h2>
                        <p className="text-gray-400 mb-6">Elige la categoría que mejor se adapte a tu documento.</p>
                        <div className="grid grid-cols-2 gap-4">
                            {subcoreOptions.map(option => (
                                <button key={option.id} onClick={() => handleSubcoreSelect(option.id)} className="p-6 bg-gray-800 rounded-lg text-center hover:bg-gray-700 transition-colors">
                                    <option.icon className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                                    <span className="font-semibold">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2: // Select Template
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Elige una Plantilla</h2>
                        <p className="text-gray-400 mb-6">Las plantillas proporcionan una estructura predefinida para tu documento.</p>
                        <div className="space-y-3">
                            {subcore && TEMPLATES[subcore].map(t => (
                                <button key={t.id} onClick={() => handleTemplateSelect(t)} className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <h3 className="font-bold">{t.name}</h3>
                                    <p className="text-sm text-gray-400">{t.description}</p>
                                </button>
                            ))}
                        </div>
                        <button onClick={handleBack} className="mt-6 flex items-center text-blue-500 hover:underline">
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Volver
                        </button>
                    </div>
                );
            case 3: // Input Content
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Proporciona el Contenido</h2>
                        <p className="text-gray-400 mb-6">Pega tu contenido fuente (ej. especificación OpenAPI, notas, etc.).</p>
                        <textarea
                            className="w-full h-64 p-3 bg-gray-950 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Pega tu contenido aquí..."
                            value={sourceContent}
                            onChange={(e) => setSourceContent(e.target.value)}
                        />
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Formato de Salida</label>
                            <select
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value)}
                                className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                {template?.supportedFormats.map(format => (
                                    <option key={format} value={format}>{format}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={handleBack} className="flex items-center text-blue-500 hover:underline">
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Volver
                            </button>
                            <button
                                onClick={generateDocument}
                                disabled={isLoading || !sourceContent}
                                className="px-6 py-3 bg-blue-600 rounded-lg font-semibold flex items-center hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Generando...' : 'Generar Documento'}
                                <SparklesIcon className="h-5 w-5 ml-2" />
                            </button>
                        </div>
                         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </div>
                );
            default:
                return null;
        }
    };
    
    if (generatedContent) {
        return (
             <div>
                <h2 className="text-2xl font-bold mb-4">Documento Generado</h2>
                <pre className="w-full h-[60vh] p-4 bg-gray-950 border border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap">
                    <code>{generatedContent}</code>
                </pre>
                <div className="mt-6 flex justify-between">
                    <button onClick={startOver} className="px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                        Crear Otro Documento
                    </button>
                    <button className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Descargar {outputFormat}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-lg shadow-2xl">
            {renderStep()}
        </div>
    );
};

export default DocumentGenerator;
