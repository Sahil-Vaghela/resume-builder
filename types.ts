
export interface Project {
  title: string;
  description: string;
  techStack: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

export interface ResumeData {
  name: string;
  phone: string;
  email: string;
  location: string;
  objective: string;
  education: Education;
  skills: {
    languages: string[];
    coreSubjects: string[];
    tools: string[];
  };
  projects: Project[];
  certifications: string[];
  softSkills: string[];
  declaration: string;
}
