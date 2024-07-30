import React from 'react';

interface ResumeData {
  personalInformation: {
    name: string;
    email: string;
    phone: string;
    summary: string;
  };
  education: {
    degree: string;
    institution: string;
    dates: string;
  }[];
  experience: {
    company: string;
    position: string;
    dates: string;
    responsibilities: string[];
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }[];
}

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children }) => {
  return (
    <div className="resume-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const ResumePreview: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <div className="name">{resumeData.personalInformation.name}</div>
        <div className="contact">
          <p>{resumeData.personalInformation.email}</p>
          <p>{resumeData.personalInformation.phone}</p>
          {/* Add address if available */}
        </div>
      </header>
      <section className="resume-body">
        <ResumeSection title="Skills">
          <ul>
            <li>Test skills</li>
            {resumeData.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </ResumeSection>
        <ResumeSection title="Work History">
          {resumeData.experience.map((experience: ResumeData['experience'][number], index: number) => (
            <div className="work-experience" key={index}>
              <h3>{experience.position}</h3>
              <p>{experience.company}</p>
              <p>{experience.dates}</p>
              <ul>
                {experience.responsibilities.map((responsibility: string, i: number) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>
        <ResumeSection title="Education">
          {resumeData.education.map((education: ResumeData['education'][number], index: number) => (
            <div className="education-item" key={index}>
              <h3>{education.degree}</h3>
              <p>{education.institution}</p>
              <p>{education.dates}</p>
            </div>
          ))}
        </ResumeSection>
        <ResumeSection title="Projects">
          {resumeData.projects.map((project: ResumeData['projects'][number], index: number) => (
            <div className="project-item" key={index}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.technologies.map((tech: string, i: number) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
              <a href={project.link}>Link</a>
            </div>
          ))}
        </ResumeSection>
        {/* Add more sections as needed */}
      </section>
    </div>
  );
};

export default ResumePreview;
