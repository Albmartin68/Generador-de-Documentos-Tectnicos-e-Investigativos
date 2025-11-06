
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SoftwareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const EngineeringIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.802H9.528a3.375 3.375 0 00-3.285 2.802l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m15.451 0A4.5 4.5 0 0118.25 21H5.75a4.5 4.5 0 01-3.201-1.226m15.451 0a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25m13.5 0v-9a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v9m9-9l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const MedicalIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h.008v.008H12V7.5zm0 3.75h.008v.008H12v-.008zm0 3.75h.008v.008H12v-.008z" />
  </svg>
);

export const EducationIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path d="M12 14.25c-3.14 0-6 1.68-6 3.75V21h12v-3c0-2.07-2.86-3.75-6-3.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25A5.25 5.25 0 0017.25 9V6.75a5.25 5.25 0 00-10.5 0V9a5.25 5.25 0 005.25 5.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 21v-2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h.01M20.25 9h-.01" />
  </svg>
);
   