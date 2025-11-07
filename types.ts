export type SubcoreType = 'Software' | 'Engineering' | 'Medical' | 'Education';

export type SupportedFormat = 'Markdown' | 'PDF' | 'LaTeX' | 'Word';

export interface Template {
  name: string;
  description: string;
  supportedFormats: SupportedFormat[];
}

export interface Document {
  id: string;
  title: string;
  content: string;
  templateName: string;
  subcore: SubcoreType;
  outputFormat: SupportedFormat;
  creationDate: Date;
}

export interface GenerationParams {
    template: Template;
    subcore: SubcoreType;
    title: string;
    language: string;
    keyPoints: string;
    outputFormat: SupportedFormat;
}

export type FlashcardType = 'error' | 'suggestion' | 'keyInfo';

export interface Flashcard {
  type: FlashcardType;
  content: string;
}

export interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Document) => void;
  flashcards: Flashcard[];
  isFlashcardLoading: boolean;
  generateFlashcards: (content: string) => Promise<void>;
  clearFlashcards: () => void;
}
