
import { SubcoreType, Template } from './types';

export const TEMPLATES: Record<SubcoreType, Template[]> = {
  [SubcoreType.SOFTWARE]: [
    { id: 'sw-api', name: 'Documentación de API', description: 'Genera documentación para APIs REST desde especificaciones OpenAPI.', supportedFormats: ['PDF/A', 'HTML', 'EPUB'] },
    { id: 'sw-sdd', name: 'Documento de Diseño de Software', description: 'Describe la arquitectura del sistema y los patrones de diseño.', supportedFormats: ['PDF/A', 'LaTeX'] },
    { id: 'sw-readme', name: 'README de Proyecto', description: 'Crea un README completo para GitHub/GitLab.', supportedFormats: ['Markdown'] },
  ],
  [SubcoreType.ENGINEERING]: [
    { id: 'eng-spec', name: 'Especificación Técnica', description: 'Detalla los requisitos y especificaciones del producto.', supportedFormats: ['PDF/A', 'DOCX'] },
    { id: 'eng-iso', name: 'Informe de Cumplimiento ISO 9001', description: 'Valida y genera informes según las normas ISO 9001.', supportedFormats: ['PDF/A'] },
  ],
  [SubcoreType.MEDICAL]: [
    { id: 'med-report', name: 'Informe de Estudio Clínico', description: 'Generación de informes compatibles con HIPAA.', supportedFormats: ['PDF/A', 'JATS'] },
    { id: 'med-sop', name: 'Procedimiento Operativo Estándar', description: 'Documento para procedimientos médicos.', supportedFormats: ['PDF/A'] },
  ],
  [SubcoreType.EDUCATION]: [
    { id: 'edu-scorm', name: 'Paquete SCORM', description: 'Exporta materiales como un paquete compatible con SCORM.', supportedFormats: ['SCORM 1.2', 'xAPI'] },
    { id: 'edu-guide', name: 'Guía de Estudio Interactiva', description: 'Crea contenido de aprendizaje atractivo e interactivo.', supportedFormats: ['EPUB', 'HTML'] },
  ],
};
