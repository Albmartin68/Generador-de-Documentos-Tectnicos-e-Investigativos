import React from 'react';

export type SubcoreType = 'Software' | 'Engineering' | 'Medical' | 'Education';

export interface Template {
    name: string;
    description: string;
    supportedFormats: string[];
}

export interface Document {
    id: string;
    title: string;
    subcore: SubcoreType;
    templateName: string;
    outputFormat: string;
    creationDate: Date;
}

export interface GeneratorState {
    subcore: SubcoreType | null;
    template: Template | null;
    sourceContent: string;
    generatedContent: string;
    outputFormat: string;
    isLoading: boolean;
    error: string | null;
}

export interface DocumentContextType {
    documents: Document[];
    generatorState: GeneratorState;
    setSubcore: (subcore: SubcoreType | null) => void;
    setTemplate: (template: Template | null) => void;
    setSourceContent: (content: string) => void;
    setOutputFormat: (format: string) => void;
    generateDocument: (title: string) => Promise<boolean>;
    resetGenerator: () => void;
}
