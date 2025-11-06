import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SubcoreType, Template, DocumentContextType, DocumentState } from '../types';
import { generateDocumentContent } from '../services/geminiService';

const initialState: DocumentState = {
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
    const [state, setState] = useState<DocumentState>(initialState);

    const setSubcore = (subcore: SubcoreType | null) => setState(prev => ({ ...prev, subcore, template: null, outputFormat: '' }));
    
    const setTemplate = (template: Template | null) => {
        setState(prev => ({
            ...prev,
            template,
            outputFormat: template ? template.supportedFormats[0] : '',
        }));
    };
    
    const setSourceContent = (content: string) => setState(prev => ({ ...prev, sourceContent: content }));
    
    const setOutputFormat = (format: string) => setState(prev => ({ ...prev, outputFormat: format }));

    const generateDocument = async () => {
        if (!state.template || !state.sourceContent || !state.outputFormat) {
            setState(prev => ({ ...prev, error: 'Por favor, completa todos los campos requeridos.' }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null, generatedContent: '' }));
        try {
            const content = await generateDocumentContent(state.template, state.sourceContent, state.outputFormat);
            setState(prev => ({ ...prev, generatedContent: content, isLoading: false }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
            setState(prev => ({ ...prev, error: errorMessage, isLoading: false }));
        }
    };
    
    const reset = () => setState(initialState);

    const value: DocumentContextType = {
        ...state,
        setSubcore,
        setTemplate,
        setSourceContent,
        setOutputFormat,
        generateDocument,
        reset,
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
