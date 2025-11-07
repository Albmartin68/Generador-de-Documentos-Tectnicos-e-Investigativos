import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Document, Flashcard } from '../types';
import { generateFlashcardsFromContent } from '../services/geminiService';
import { DocumentContextType } from '../types';

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isFlashcardLoading, setIsFlashcardLoading] = useState(false);

  const addDocument = (document: Document) => {
    setDocuments(prevDocuments => [document, ...prevDocuments]);
  };

  const clearFlashcards = () => {
    setFlashcards([]);
  }

  const generateFlashcards = async (content: string) => {
    setIsFlashcardLoading(true);
    clearFlashcards();
    try {
        const generatedFlashcards = await generateFlashcardsFromContent(content);
        setFlashcards(generatedFlashcards);
    } catch (error) {
        console.error("Failed to generate flashcards:", error);
        // Optionally, set an error state to show in the UI
    } finally {
        setIsFlashcardLoading(false);
    }
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, flashcards, isFlashcardLoading, generateFlashcards, clearFlashcards }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
