
import React, { useState } from 'react';
import { ResumeData } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import ResumePreview from './components/ResumePreview';
import { optimizeText } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const handleArrayChange = (category: 'languages' | 'coreSubjects' | 'tools' | 'certifications' | 'softSkills', index: number, value: string) => {
    setData(prev => {
      if (category === 'languages' || category === 'coreSubjects' || category === 'tools') {
        const newArray = [...prev.skills[category]];
        newArray[index] = value;
        return { ...prev, skills: { ...prev.skills, [category]: newArray } };
      } else {
        const newArray = [...prev[category]];
        newArray[index] = value;
        return { ...prev, [category]: newArray };
      }
    });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    setData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const runAIOptimization = async (type: 'objective' | 'project', content: string, index?: number) => {
    const id = index !== undefined ? `${type}-${index}` : type;
    setIsOptimizing(id);
    const optimized = await optimizeText(type, content);
    
    if (type === 'objective') {
      setData(prev => ({ ...prev, objective: optimized }));
    } else if (type === 'project' && index !== undefined) {
      handleProjectChange(index, 'description', optimized);
    }
    setIsOptimizing(null);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const element = document.querySelector('.resume-container');
    if (!element) return;

    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${data.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Download failed, falling back to print", error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar Controls */}
      <aside className="no-print lg:w-1/3 w-full bg-white border-r border-slate-200 lg:h-screen overflow-y-auto p-6 sticky top-0 shadow-lg z-10">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Resume Builder</h1>
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full ${isDownloading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 transform active:scale-95`}
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF File
                </>
              )}
            </button>
            <button 
              onClick={() => window.print()}
              className="w-full bg-white border-2 border-slate-200 text-slate-600 px-6 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Open Print Menu (Alternative)
            </button>
          </div>
        </div>

        <div className="space-y-8 pb-12">
          {/* Header Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase absolute -top-2 left-2 bg-white px-1">Full Name</label>
                <input 
                  name="name" value={data.name} onChange={handleInputChange}
                  placeholder="Full Name" className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase absolute -top-2 left-2 bg-white px-1">Phone</label>
                  <input 
                    name="phone" value={data.phone} onChange={handleInputChange}
                    placeholder="Phone" className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-500 uppercase absolute -top-2 left-2 bg-white px-1">Location</label>
                  <input 
                    name="location" value={data.location} onChange={handleInputChange}
                    placeholder="Location" className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase absolute -top-2 left-2 bg-white px-1">Email</label>
                <input 
                  name="email" value={data.email} onChange={handleInputChange}
                  placeholder="Email" className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Objective Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Career Objective</h2>
              <button 
                onClick={() => runAIOptimization('objective', data.objective)}
                disabled={isOptimizing === 'objective'}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1"
              >
                {isOptimizing === 'objective' ? '...' : '✨ Optimize with AI'}
              </button>
            </div>
            <textarea 
              name="objective" value={data.objective} onChange={handleInputChange}
              className="w-full border border-slate-200 p-3 rounded-lg h-32 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <input 
                value={data.education.institution} onChange={(e) => handleEducationChange('institution', e.target.value)}
                placeholder="University Name" className="w-full border border-slate-200 p-2 rounded text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  value={data.education.year} onChange={(e) => handleEducationChange('year', e.target.value)}
                  placeholder="Year" className="border border-slate-200 p-2 rounded text-sm"
                />
                <input 
                  value={data.education.score} onChange={(e) => handleEducationChange('score', e.target.value)}
                  placeholder="CGPA/Score" className="border border-slate-200 p-2 rounded text-sm"
                />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Key Projects</h2>
            {data.projects.map((p, i) => (
              <div key={i} className="mb-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <input 
                  value={p.title} onChange={(e) => handleProjectChange(i, 'title', e.target.value)}
                  placeholder="Project Title" className="w-full border-b border-slate-100 p-2 rounded text-sm mb-2 font-bold focus:border-indigo-500 outline-none"
                />
                <input 
                  value={p.techStack} onChange={(e) => handleProjectChange(i, 'techStack', e.target.value)}
                  placeholder="Tech Stack (e.g. C++, Python)" className="w-full border-b border-slate-100 p-2 rounded text-xs mb-2 italic text-slate-500 focus:border-indigo-500 outline-none"
                />
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                  <button 
                    onClick={() => runAIOptimization('project', p.description, i)}
                    disabled={isOptimizing === `project-${i}`}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    {isOptimizing === `project-${i}` ? 'Generating...' : '✨ Improve with AI'}
                  </button>
                </div>
                <textarea 
                  value={p.description} onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                  className="w-full border border-slate-100 p-2 rounded h-24 text-xs focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
            ))}
          </section>
        </div>
      </aside>

      {/* Preview Section */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12 bg-slate-200 flex justify-center">
        <ResumePreview data={data} />
      </main>
    </div>
  );
};

export default App;
