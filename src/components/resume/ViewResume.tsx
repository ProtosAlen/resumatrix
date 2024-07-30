import { RootState } from '@/store/store';
import { Card, Button, Divider } from '@nextui-org/react';
import { useSelector } from 'react-redux';


export default function ViewResume() {
  const resumeData = useSelector((state: RootState) => state.resumeData);

  return (
    <div className="resume-container grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="resume-left p-4 bg-gray-200 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{resumeData.contact.name}</h1>
        <ul className="contact-info space-y-2">
          <li>
            <svg
              className="w-5 h-5 inline-block mr-2 text-gray-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l9-4 9 4-9 6v10l-9-6zM8 16v5h9v-5z"
              />
            </svg>
            {resumeData.contact.email}
          </li>
          <li>
            <svg
              className="w-5 h-5 inline-block mr-2 text-gray-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 8l2-2v4l2-2m0 0l2-2v4l2-2m-2 4l-2 2v-4l-2 2m0 0L8 12v8l8-4z"
              />
            </svg>
            {resumeData.contact.phone}
          </li>
          <li>
            <svg
              className="w-5 h-5 inline-block mr-2 text-gray-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 18 at 3 3 a 3 3 0 1 1 4-4.83v-.75a1.5 1.5 0 0 1 1.5 1.5v.75a3 3 0 0 1 4 4.83M7 4v14L11 14H14v-1H7z"
              />
            </svg>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer">
              {resumeData.contact.linkedin}
            </a>
          </li>
        </ul>
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Summary</h2>
        <p className="text-gray-700">{resumeData.summary}</p>
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Skills</h2>
        <div className="skills-container flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <Button key={skill} variant="flat" className="text-sm px-4 py-2 rounded-full bg-blue-500 text-white">
              {skill}
            </Button>
          ))}
        </div>
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Education</h2>
        {resumeData.education.map((edu) => (
          <Card key={edu.degree} className="bg-white shadow-sm rounded-lg p-3 mb-2">
            <h3 className="text-lg font-medium">{edu.degree}</h3>
            <p className="text-sm text-gray-600">{edu.institution}</p>
            <p className="text-sm text-gray-600">{edu.year}</p>
          </Card>
        ))}
      </div>

      <div className="resume-right p-4 bg-gray-200 shadow-md rounded-lg">
        <h2 className="text-2xl font-medium mb-4">Work Experience</h2>
        {resumeData.workExperience.map((exp) => (
          <Card key={exp.company} className="bg-white shadow-sm rounded-lg p-3 mb-2">
            <h3 className="text-lg font-medium">{exp.company}</h3>
            <h4 className="text-sm font-semibold text-gray-500">{exp.title}</h4>
            <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc pl-4 text-sm">
              {exp.responsibilities.map((resp) => (
                <li key={resp}>{resp}</li>
              ))}
            </ul>
          </Card>
        ))}
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Projects</h2>
        {resumeData.projects.map((project) => (
          <Card key={project.title} className="bg-white shadow-sm rounded-lg p-3 mb-2">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-600">{project.technologies.join(', ')}</p>
          </Card>
        ))}
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Certifications</h2>
        <ul className="list-disc pl-4 text-sm">
          {resumeData.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Awards</h2>
        <ul className="list-disc pl-4 text-sm">
          {resumeData.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
        <Divider />
        <h2 className="text-2xl font-medium mb-4">Volunteer Experience</h2>
        {resumeData.volunteer.map((vol) => (
          <Card key={vol.organization} className="bg-white shadow-sm rounded-lg p-3 mb-2">
            <div>
              <h3 className="text-lg font-medium">{vol.organization}</h3>
              <h4 className="text-sm font-semibold text-gray-500">{vol.role}</h4>
              <p className="text-sm text-gray-600">{vol.startDate} - {vol.endDate}</p>
              <p className="text-sm text-gray-600">{vol.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}