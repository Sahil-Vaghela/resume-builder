
import React from 'react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div className="resume-container bg-white w-full max-w-[210mm] min-h-[297mm] mx-auto p-12 shadow-2xl text-[#1a1a1a] leading-relaxed select-text flex flex-col" style={{ fontVariantLigatures: 'none' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-900 pb-5 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-black mb-2">{data.name}</h1>
        <div className="text-[10pt] flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-800">
          <span className="font-medium">{data.phone}</span>
          <span>|</span>
          <span className="font-medium underline">{data.email}</span>
          <span>|</span>
          <span className="font-medium">{data.location}</span>
        </div>
      </header>

      {/* Career Objective */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Career Objective</h2>
        <p className="text-[10pt] leading-tight text-justify">{data.objective}</p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Education</h2>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-[10.5pt]">{data.education.degree}</h3>
            <p className="text-[10pt] italic text-gray-700">{data.education.institution}</p>
          </div>
          <div className="text-right text-[10pt]">
            <p className="font-bold">{data.education.year}</p>
            <p className="font-medium">{data.education.score}</p>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Technical Skills</h2>
        <div className="space-y-1.5 text-[10pt]">
          <div className="grid grid-cols-[180px_1fr]">
            <span className="font-bold">Programming Languages:</span>
            <span>{data.skills.languages.join(', ')}</span>
          </div>
          <div className="grid grid-cols-[180px_1fr]">
            <span className="font-bold">Core CS Subjects:</span>
            <span>{data.skills.coreSubjects.join(', ')}</span>
          </div>
          <div className="grid grid-cols-[180px_1fr]">
            <span className="font-bold">Tools & Technologies:</span>
            <span>{data.skills.tools.join(', ')}</span>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Key Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-[10.5pt]">{project.title}</h3>
              <span className="text-[9pt] font-semibold text-gray-600">[{project.techStack}]</span>
            </div>
            <ul className="text-[10pt] list-disc ml-5 space-y-0.5 leading-snug">
              <li>{project.description}</li>
            </ul>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Certifications & Courses</h2>
        <ul className="text-[10pt] list-disc ml-5 space-y-0.5">
          {data.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* Strengths */}
      <section className="mb-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Strengths & Soft Skills</h2>
        <p className="text-[10pt]">{data.softSkills.join(' • ')}</p>
      </section>

      {/* Declaration - Pushed to bottom */}
      <section className="mt-auto pt-6">
        <h2 className="text-[11pt] font-bold border-b border-gray-300 mb-2 uppercase tracking-widest text-gray-900">Declaration</h2>
        <p className="text-[9.5pt] italic text-gray-600 mb-8">{data.declaration}</p>
        <div className="flex justify-between items-end">
          <div className="text-[9.5pt]">
            <p className="font-bold">Date: <span className="font-normal">{new Date().toLocaleDateString()}</span></p>
            <p className="font-bold">Place: <span className="font-normal">{data.location.split(',')[0]}</span></p>
          </div>
          <div className="text-right">
            <div className="border-t border-black w-40 mb-1"></div>
            <p className="text-[10pt] font-bold uppercase">{data.name}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;
