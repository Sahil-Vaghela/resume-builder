
import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  name: "Nishu Sharma",
  phone: "8264424210",
  email: "nishusharma9417@gmail.com",
  location: "Pehowa, Haryana",
  objective: "A highly motivated B.Tech Computer Science and Engineering student with a strong foundation in programming and problem-solving. Seeking an internship to leverage my technical skills in C++, Python, and Data Structures to contribute to innovative software solutions while expanding my industry knowledge.",
  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "[Your University Name]",
    year: "2023 - 2027 (Expected)",
    score: "CGPA: [Your CGPA]/10.0"
  },
  skills: {
    languages: ["C", "C++ (OOP)", "Python (OOP)", "DSA in C++"],
    coreSubjects: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "Database Management Systems"],
    tools: ["Git & GitHub", "VS Code", "Linux Command Line", "MySQL"]
  },
  projects: [
    {
      title: "Student Management System",
      description: "Developed a robust console-based application using C++ and OOP principles to manage student records, including features for adding, updating, and searching data efficiently.",
      techStack: "C++, File Handling"
    },
    {
      title: "Automated Task Scheduler",
      description: "Designed a Python-based utility that automates daily computing tasks using native libraries and OOP patterns, improving workflow efficiency by 30%.",
      techStack: "Python, OS Module"
    }
  ],
  certifications: [
    "Data Structures and Algorithms Specialization - [Platform Name]",
    "Introduction to Python Programming - [Authorized Body]"
  ],
  softSkills: [
    "Problem Solving",
    "Effective Communication",
    "Adaptability",
    "Team Collaboration",
    "Time Management"
  ],
  declaration: "I hereby declare that all the information mentioned above is true to the best of my knowledge and belief."
};
