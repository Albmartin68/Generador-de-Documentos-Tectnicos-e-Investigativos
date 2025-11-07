import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SubcoreType, Template, DocumentContextType, GeneratorState, Document } from '../types';
import { generateDocumentContent } from '../services/geminiService';

const initialGeneratorState: GeneratorState = {
    subcore: null,
    template: null,
    sourceContent: '',
    generatedContent: '',
    outputFormat: '',
    isLoading: false,
    error: null,
};

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [generatorState, setGeneratorState] = useState<GeneratorState>(initialGeneratorState);
    const [documents, setDocuments] = useState<Document[]>([]);

    const setSubcore = (subcore: SubcoreType | null) => setGeneratorState(prev => ({ ...initialGeneratorState, subcore }));
    
    const setTemplate = (template: Template | null) => {
        setGeneratorState(prev => ({
            ...prev,
            template,
            outputFormat: template ? template.supportedFormats[0] : '',
        }));
    };
    
    const setSourceContent = (content: string) => setGeneratorState(prev => ({ ...prev, sourceContent: content }));
    
    const setOutputFormat = (format: string) => setGeneratorState(prev => ({ ...prev, outputFormat: format }));

    const generateDocument = async (title: string): Promise<boolean> => {
        if (!generatorState.template || !generatorState.sourceContent || !generatorState.outputFormat || !title) {
            setGeneratorState(prev => ({ ...prev, error: 'Por favor, completa todos los campos, incluido el título.' }));
            return false;
        }

        setGeneratorState(prev => ({ ...prev, isLoading: true, error: null, generatedContent: '' }));
        try {
            const content = await generateDocumentContent(generatorState.template, generatorState.sourceContent, generatorState.outputFormat);
            
            const newDocument: Document = {
                id: `doc_${Date.now()}`,
                title,
                subcore: generatorState.subcore!,
                templateName: generatorState.template.name,
                outputFormat: generatorState.outputFormat,
                creationDate: new Date(),
            };
            
            setDocuments(prevDocs => [newDocument, ...prevDocs]);
            setGeneratorState(prev => ({ ...prev, generatedContent: content, isLoading: false }));
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
            setGeneratorState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
            return false;
        }
    };
    
    const resetGenerator = () => setGeneratorState(initialGeneratorState);

    const value: DocumentContextType = {
        documents,
        generatorState,
        setSubcore,
        setTemplate,
        setSourceContent,
        setOutputFormat,
        generateDocument,
        resetGenerator: resetGenerator,
    };

    return (
        <DocumentContext.Provider value={value}>
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocument = (): DocumentContextType => {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error('useDocument debe ser usado dentro de un DocumentProvider');
    }
    return context;
};