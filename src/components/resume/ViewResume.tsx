import { RootState } from '@/store/store';

import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { useSelector } from 'react-redux';

import { CiMail, CiPhone, CiLinkedin } from "react-icons/ci";
import GenerateResumePDF from './pdfHelper';

import styles from './ViewResume.module.css'; // Correct import

export default function ViewResume() {
  const resumeData = useSelector((state: RootState) => state.resumeData);

  const handleDownloadPDF = async () => {
    try {
      const buffer = await GenerateResumePDF(resumeData);
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  const showCertifications = false;
  const showAwards = false;

  return (
    <section className="py-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <h3 className="text-3xl font-bold text-gray-800">Pregled življenjepisa</h3>
        <Button onClick={handleDownloadPDF} color="primary" className="mt-4">
          Prenesi PDF
        </Button>
      </div>

      {/* Apply CSS Module class here */}
      <div className={styles.resumeContainer}>
        {/* Left Column - Apply CSS Module class here */}
        <div className={styles.resumeColumn}>
          <h1 className="text-4xl font-bold mb-4">{resumeData.contact.name}</h1>
          {/* Apply CSS Module class and combine with Tailwind */}
          <ul className={`${styles.contactInfo} space-y-2 mb-6`}>
            <li className="flex items-center text-gray-700">
              <CiMail className="w-5 h-5 mr-3 text-gray-600" />
              {resumeData.contact.email}
            </li>
            <li className="flex items-center text-gray-700">
              <CiPhone className="w-5 h-5 mr-3 text-gray-600" />
              {resumeData.contact.phone}
            </li>
            <li className="flex items-center text-gray-700">
              <CiLinkedin className="w-5 h-5 mr-3 text-gray-600" />
              <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {resumeData.contact.linkedin}
              </a>
            </li>
          </ul>

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Povzetek</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Spretnosti</h2>
          {/* Apply CSS Module class and combine with Tailwind */}
          <div className={`${styles.skillsContainer} flex flex-wrap gap-2 mt-4`}>
            {resumeData.skills.map((skill) => (
              <Button
                key={skill}
                variant="solid"
                className="text-sm px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                {skill}
              </Button>
            ))}
          </div>

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Izobrazba</h2>
          {resumeData.education.map((edu) => (
            <Card key={edu.degree} className={`${styles.cardSpacing} bg-white shadow-sm rounded-lg p-4 border border-gray-100`}>
              <h3 className="text-lg font-medium text-gray-800">{edu.degree}</h3>
              <p className="text-sm text-gray-600 mt-1">{edu.institution} - {edu.year}</p>
            </Card>
          ))}

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Dodatno</h2>
          {resumeData.additional.map((additional) => (
            <Card key={additional.category} className={`${styles.cardSpacing} bg-white shadow-sm rounded-lg p-4 border border-gray-100`}>
              <h3 className="text-lg font-medium text-gray-800">{additional.category}</h3>
              <p className="text-sm text-gray-600 mt-1">{additional.details}</p>
              <h4 className="text-sm font-semibold text-gray-500 mt-2">{additional.technologies.join(', ')}</h4>
            </Card>
          ))}
        </div>

        {/* Right Column - Apply CSS Module class here */}
        <div className={styles.resumeColumn}>
          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Delovne izkušnje</h2>
          {resumeData.workExperience.map((exp) => (
            <Card key={exp.company} className={`${styles.cardSpacing} bg-white shadow-sm rounded-lg p-4 border border-gray-100`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-medium text-gray-800">{exp.company}</h3>
                <span className="text-sm text-gray-600 flex-shrink-0 ml-4">{exp.startDate} - {exp.endDate}</span>
              </div>

              <h4 className="text-sm font-semibold text-gray-700 mb-2">{exp.title}</h4>

              {exp.responsibilities && Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 ? (
                <ul className={`${styles.jobEntry} list-disc pl-5 text-sm text-gray-700`}> {/* Apply CSS Module class here */}
                  {exp.responsibilities.map((responsibility, index) => (
                    <li key={index} className="mb-1">{responsibility}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Ni navedenih odgovornosti.</p>
              )}
            </Card>
          ))}

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Projekti</h2>
          {resumeData.projects.map((project) => (
            <Card key={project.title} className={`${styles.cardSpacing} bg-white shadow-sm rounded-lg p-4 border border-gray-100`}>
              <h3 className="text-lg font-medium text-gray-800">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              <h4 className="text-sm font-semibold text-gray-500 mt-2">{project.technologies.join(', ')}</h4>
            </Card>
          ))}

          {showCertifications && (
            <>
              <Divider className="my-6" />
              {/* Apply CSS Module class and combine with Tailwind */}
              <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Certifications</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {resumeData.certifications.map((cert) => (
                  <li key={cert} className="mb-1">{cert}</li>
                ))}
              </ul>
            </>
          )}

          {showAwards && (
            <>
              <Divider className="my-6" />
              {/* Apply CSS Module class and combine with Tailwind */}
              <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Awards</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {resumeData.awards.map((award) => (
                  <li key={award} className="mb-1">{award}</li>
                ))}
              </ul>
            </>
          )}

          <Divider className="my-6" />

          {/* Apply CSS Module class and combine with Tailwind */}
          <h2 className={`text-2xl font-semibold text-gray-800 mb-4 ${styles.sectionTitle}`}>Prostovoljne izkušnje</h2>
          {resumeData.volunteer.map((vol) => (
            <Card key={vol.organization} className={`${styles.cardSpacing} bg-white shadow-sm rounded-lg p-4 border border-gray-100`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-medium text-gray-800">{vol.organization}</h3>
                <p className="text-sm text-gray-600 flex-shrink-0 ml-4">{vol.startDate} - {vol.endDate}</p>
              </div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">{vol.role}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{vol.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}