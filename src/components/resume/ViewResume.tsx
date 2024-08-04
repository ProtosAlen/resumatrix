import { RootState } from '@/store/store';
import { Card, Button, Divider } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import { CiMail, CiPhone, CiLinkedin } from "react-icons/ci";
import generateResumePDF from './pdfHelper';
import { useState } from 'react';




export default function ViewResume() {


  const resumeData = useSelector((state: RootState) => state.resumeData);


  const [isDownloading, setIsDownloading] = useState(false); // Download state

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: JSON.stringify(resumeData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error generating PDF: ' + (await response.text()));
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href
        = url;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };



  // Static booleans to control section visibility
  const showCertifications = false;
  const showAwards = false;

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h3>View</h3>
      </div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
      <div className="resume-container ">
        <div className="resume-left p-4 bg-gray-200 shadow-md rounded-lg mb-4">
          <h1 className="text-3xl font-bold">{resumeData.contact.name}</h1>
          <ul className="contact-info space-y-2">
            <li>
              <CiMail className="w-5 h-5 inline-block mr-2 text-gray-500" />
              {resumeData.contact.email}
            </li>
            <li>
              <CiPhone className="w-5 h-5 inline-block mr-2 text-gray-500" />
              {resumeData.contact.phone}
            </li>
            <li>
              <CiLinkedin className="w-5 h-5 inline-block mr-2 text-gray-500" />
              <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer">
                {resumeData.contact.linkedin}
              </a>
            </li>
          </ul>
          <Divider />

          <h2 className="text-2xl font-medium">Summary</h2>
          <p>{resumeData.summary}</p>
          <Divider className='wspace' />

          <h2 className="text-2xl font-medium">Skills</h2>
          <div className="skills-container flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <Button key={skill} variant="flat" className="text-sm px-4 py-2 rounded-full bg-blue-500 text-white">
                {skill}
              </Button>
            ))}
          </div>

          <h2 className="text-2xl font-medium">Education</h2>
          {resumeData.education.map((edu) => (
            <Card key={edu.degree} className="bg-white shadow-sm rounded-lg p-3 mb-2">
              <h3 className="text-lg font-medium">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
            </Card>
          ))}

          <Divider />
          <h2 className="text-2xl font-medium">Additional</h2>
          {resumeData.additional.map((additional) => (
            <Card key={additional.category} className="bg-white shadow-sm rounded-lg p-3 mb-2">
              <h3 className="text-lg font-medium">{additional.category}</h3>
              <p className="text-sm text-gray-600">{additional.details}</p>
              <h4 className="text-sm font-semibold text-gray-500">{additional.technologies.join(', ')}</h4>
            </Card>
          ))}
          <Divider />
        </div>

        <div className="resume-right p-4 bg-gray-200 shadow-md rounded-lg mb-4">
          <h2 className="text-2xl font-medium">Work Experience</h2>
          {resumeData.workExperience.map((exp) => (
            <Card key={exp.company} className="bg-white shadow-sm rounded-lg p-3 mb-2">

              <h3 className="text-lg font-medium">{exp.company}<span className="text-sm text-gray-600 dates"> {exp.startDate} - {exp.endDate}</span></h3>

              <h4 className="text-sm font-semibold text-gray-500">{exp.title}</h4>

              <ul className="list-disc pl-4 text-sm">
                {exp.responsibilities && Array.isArray(exp.responsibilities) ? (
                  <ul>
                    {exp.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No responsibilities listed.</p>
                )}

// For debugging:
                console.log('exp.responsibilities:', exp.responsibilities);
                console.log('Array check:', Array.isArray(exp.responsibilities));
              </ul>

            </Card>
          ))}
          <Divider />
          <h2 className="text-2xl font-medium">Projects</h2>
          {resumeData.projects.map((project) => (
            <Card key={project.title} className="bg-white shadow-sm rounded-lg p-3 mb-2">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <h4 className="text-sm font-semibold text-gray-500">{project.technologies.join(', ')}</h4>
            </Card>
          ))}

          {showCertifications && (
            <>
              <Divider />
              <h2 className="text-2xl font-medium">Certifications</h2>
              <ul className="list-disc pl-4 text-sm">
                {resumeData.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </>
          )}

          {showAwards && (
            <>
              <Divider />
              <h2 className="text-2xl font-medium">Awards</h2>
              <ul className="list-disc pl-4 text-sm">
                {resumeData.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </>
          )}

          <Divider />
          <h2 className="text-2xl font-medium">Volunteer Experience</h2>
          {resumeData.volunteer.map((vol) => (
            <Card key={vol.organization} className="bg-white shadow-sm rounded-lg p-3 mb-2">
              <div>
                <h3 className="text-lg font-medium">{vol.organization}</h3>
                <p className="text-sm text-gray-600">{vol.startDate} - {vol.endDate}</p>
                <h4 className="text-sm font-semibold text-gray-500">{vol.role}</h4>
                <p className="text-sm text-gray-600">{vol.description}</p>
              </div>
            </Card>
          ))}
          <Divider />
        </div>
      </div>
    </section >
  );


}


