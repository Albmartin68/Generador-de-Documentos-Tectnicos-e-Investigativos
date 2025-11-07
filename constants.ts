import React from 'react';
import { Template, SubcoreType } from './types';
import { SoftwareIcon, EngineeringIcon, MedicalIcon, EducationIcon } from './components/icons/SpecialtyIcons';

// FIX: Added React import to resolve React types like React.FC.
export const SUBCORE_CATEGORIES: Record<SubcoreType, { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; description: string; }> = {
    Software: {
        name: 'Software',
        icon: SoftwareIcon,
        description: 'Documentos para desarrollo de software y TI.'
    },
    Engineering: {
        name: 'Ingeniería',
        icon: EngineeringIcon,
        description: 'Reportes y especificaciones técnicas de ingeniería.'
    },
    Medical: {
        name: 'Medicina',
        icon: MedicalIcon,
        description: 'Informes y documentación para el área de la salud.'
    },
    Education: {
        name: 'Educación',
        icon: EducationIcon,
        description: 'Materiales y planes de estudio educativos.'
    },
};

export const TEMPLATES: Record<string, Template[]> = {
    Software: [
        { name: 'Requerimientos de Software (SRS)', description: 'Define los requerimientos funcionales y no funcionales de un sistema.', supportedFormats: ['Markdown', 'PDF', 'LaTeX'] },
        { name: 'Documento de Diseño Técnico (TDD)', description: 'Describe la arquitectura y el diseño técnico de alto nivel.', supportedFormats: ['Markdown', 'PDF'] },
        { name: 'Plan de Pruebas', description: 'Esquema de las estrategias y casos de prueba para el software.', supportedFormats: ['Markdown', 'Word'] },
    ],
    Engineering: [
        { name: 'Informe de Laboratorio', description: 'Documenta los procedimientos y resultados de un experimento.', supportedFormats: ['PDF', 'LaTeX', 'Word'] },
        { name: 'Especificación de Diseño de Producto', description: 'Detalla los requisitos técnicos para un nuevo producto.', supportedFormats: ['PDF', 'Word'] },
    ],
    Medical: [
        { name: 'Historial Clínico Anónimo', description: 'Resume el caso de un paciente de forma anónima para estudio.', supportedFormats: ['PDF', 'Word'] },
        { name: 'Informe de Investigación Médica', description: 'Presenta los hallazgos de un estudio o investigación.', supportedFormats: ['PDF', 'LaTeX'] },
        { name: 'Informe de Progreso Médico', description: 'Documenta el progreso médico de los pacientes para un seguimiento claro del tratamiento.', supportedFormats: ['Word', 'PDF'] },
        { name: 'Historial Médico Completo', description: 'Registra de manera integral el historial médico del paciente para diagnósticos precisos.', supportedFormats: ['Word', 'PDF'] },
        { name: 'Registro de Administración de Medicamentos', description: 'Garantiza la precisión y seguridad en la administración de medicamentos.', supportedFormats: ['Word', 'PDF'] },
    ],
    Education: [
        { name: 'Plan de Lección', description: 'Estructura detallada para una clase o sesión de enseñanza.', supportedFormats: ['Markdown', 'Word', 'PDF'] },
        { name: 'Propuesta de Curso', description: 'Describe un nuevo curso, sus objetivos y su contenido.', supportedFormats: ['Word', 'PDF'] },
    ],
};