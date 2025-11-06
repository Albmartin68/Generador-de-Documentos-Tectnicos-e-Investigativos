export enum SubcoreType {
    SOFTWARE = 'SOFTWARE',
    ENGINEERING = 'ENGINEERING',
    MEDICAL = 'MEDICAL',
    EDUCATION = 'EDUCATION',
}

export interface Template {
    id: string;
    name: string;
    description: string;
    supportedFormats: string[];
}

export interface DocumentState {
    subcore: SubcoreType | null;
    template: Template | null;
    sourceContent: string;
    generatedContent: string;
    outputFormat: string;
    isLoading: boolean;
    error: string | null;
}

export interface DocumentContextType extends DocumentState {
    setSubcore: (subcore: SubcoreType | null) => void;
    setTemplate: (template: Template | null) => void;
    setSourceContent: (content: string) => void;
    setOutputFormat: (format: string) => void;
    generateDocument: () => Promise<void>;
    reset: () => void;
}
