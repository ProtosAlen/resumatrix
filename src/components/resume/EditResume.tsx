import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Import the RootState type
import {
  updateContactName,
  updateContactEmail,
  updateContactPhone,
  updateContactLinkedin,
  updateSummary,
  addSkill,
  removeSkill,
  updateSkill,
  addEducation,
  updateEducation,
  removeEducation,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  addAward,
  updateAward,
  removeAward,
  addAdditional,
  updateAdditional,
  removeAdditional,
  addVolunteerExperience,
  updateVolunteerExperience,
  removeVolunteerExperience,
  //loadResume
} from '@/store/reducers/resumeData';
import { Card, Divider } from '@heroui/react';

export default function EditResume() {
  const dispatch = useDispatch();
  const resumeData = useSelector((state: RootState) => state.resumeData);

  const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactName(e.target.value));
  };

  const handleContactEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactEmail(e.target.value));
  };

  const handleContactPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactPhone(e.target.value));
  };

  const handleContactLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactLinkedin(e.target.value));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateSummary(e.target.value));
  };

  const handleSkillChange = (index: number, value: string) => {
    dispatch(updateSkill({ index, value }));
  };

  const handleAddSkill = () => {
    dispatch(addSkill(''));
  };

  const handleRemoveSkill = (index: number) => {
    dispatch(removeSkill(index));
  };

  const handleEducationChange = (index: number, field: 'degree' | 'institution' | 'year', value: string) => {
    dispatch(updateEducation({ index, field, value }));
  };


  const handleAddEducation = () => {
    dispatch(addEducation({ degree: '', institution: '', year: '' }));
  };

  const handleRemoveEducation = (index: number) => {
    dispatch(removeEducation(index));
  };

  const handleWorkExperienceChange = (index: number, field: 'company' | 'title' | 'startDate' | 'endDate' | 'responsibilities', value: string | string[]) => {
    if (field === 'responsibilities') {
      const updatedResponsibilities = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
      dispatch(updateWorkExperience({ index, field, value: updatedResponsibilities }));
    } else {
      dispatch(updateWorkExperience({ index, field, value }));
    }
  };





  const handleAddWorkExperience = () => {
    dispatch(addWorkExperience({ company: '', title: '', startDate: '', endDate: '', responsibilities: [] }));
  };

  const handleRemoveWorkExperience = (index: number) => {
    dispatch(removeWorkExperience(index));
  };

  const handleProjectChange = (index: number, field: 'title' | 'description' | 'technologies', value: string | string[]) => {
    dispatch(updateProject({ index, field, value }));
  };

  const handleAddProject = () => {
    dispatch(addProject({ title: '', description: '', technologies: [] }));
  };

  const handleRemoveProject = (index: number) => {
    dispatch(removeProject(index));
  };

  const handleCertificationChange = (index: number, value: string) => {
    dispatch(updateCertification({ index, value }));
  };

  const handleAddCertification = () => {
    dispatch(addCertification(''));
  };

  const handleRemoveCertification = (index: number) => {
    dispatch(removeCertification(index));
  };

  const handleAwardChange = (index: number, value: string) => {
    dispatch(updateAward({ index, value }));
  };

  const handleAddAward = () => {
    dispatch(addAward(''));
  };

  const handleRemoveAward = (index: number) => {
    dispatch(removeAward(index));
  };

  const handleAdditionalChange = (index: number, field: 'technologies' | 'category' | 'details', value: string | string[]) => {
    dispatch(updateAdditional({ index, field, value }));
  };


  const handleAddAdditional = () => {
    dispatch(addAdditional({ category: '', details: '', technologies: [] }));
  };

  const handleRemoveAdditional = (index: number) => {
    dispatch(removeAdditional(index));
  };

  const handleVolunteerExperienceChange = (index: number, field: 'startDate' | 'endDate' | 'description' | 'organization' | 'role', value: string) => {
    dispatch(updateVolunteerExperience({ index, field, value }));
  };

  const handleAddVolunteerExperience = () => {
    dispatch(addVolunteerExperience({ organization: '', role: '', startDate: '', endDate: '', description: '' }));
  };

  const handleRemoveVolunteerExperience = (index: number) => {
    dispatch(removeVolunteerExperience(index));
  };



  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h3>Edit</h3>


      <div className="w-full max-w-3xl">
        {/* Personal information section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <input
            type="text"
            name="name"
            value={resumeData.contact.name}
            onChange={handleContactNameChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={resumeData.contact.email}
            onChange={handleContactEmailChange}
            className="border border-gray-300 p-2 rounded mt-2"
          />
          <input
            type="tel"
            name="phone"
            value={resumeData.contact.phone}
            onChange={handleContactPhoneChange}
            className="border border-gray-300 p-2 rounded mt-2"
          />
          <input
            type="text"
            name="linkedin"
            value={resumeData.contact.linkedin}
            onChange={handleContactLinkedinChange}
            className="border border-gray-300 p-2 rounded mt-2"
          />
        </div>

        {/* Summary section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <textarea
            name="summary"
            value={resumeData.summary}
            onChange={handleSummaryChange}
            className="border border-gray-300 p-2 rounded"
            rows={4}
          />
        </div>

        {/* Skills section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <button onClick={() => handleRemoveSkill(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddSkill} className="text-blue-500">Add Skill</button>
        </div>

        {/* Education section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Degree"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Institution"
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Year"
              />
              <button onClick={() => handleRemoveEducation(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddEducation} className="text-blue-500">Add Education</button>
        </div>

        {/* Work Experience section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Work Experience</h2>
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Company"
              />
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Start Date"
              />
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="End Date"
              />
              <textarea
                value={exp.responsibilities} // seperate by comma AND space
                onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Responsibilities (comma separated)"
              />
              <button onClick={() => handleRemoveWorkExperience(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddWorkExperience} className="text-blue-500">Add Work Experience</button>

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
              </ul>

            </Card>
          ))}
          <Divider />

        </div>

        {/* Projects section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Title"
              />
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Description"
              />
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => {
                  const technologies = e.target.value.split(', ').join(','); // Split and join back to string
                  handleProjectChange(index, 'technologies', technologies);
                }}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Technologies (comma separated)"
              />
              <button onClick={() => handleRemoveProject(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddProject} className="text-blue-500">Add Project</button>
        </div>

        {/* Certifications section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={cert}
                onChange={(e) => handleCertificationChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <button onClick={() => handleRemoveCertification(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddCertification} className="text-blue-500">Add Certification</button>
        </div>

        {/* Awards section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Awards</h2>
          {resumeData.awards.map((award, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={award}
                onChange={(e) => handleAwardChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <button onClick={() => handleRemoveAward(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddAward} className="text-blue-500">Add Award</button>
        </div>

        {/* Additional Information section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Additional Information</h2>
          {resumeData.additional.map((additional, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={additional.category}
                onChange={(e) => handleAdditionalChange(index, 'category', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Category"
              />
              <textarea
                value={additional.details}
                onChange={(e) => handleAdditionalChange(index, 'details', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Details"
              />
              <input
                type="text"
                value={additional.technologies}
                onChange={(e) => {
                  const technologies = e.target.value.split(', ').join(','); // Split and join back to string
                  handleAdditionalChange(index, 'technologies', technologies);
                }}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Technologies (comma separated)"
              />
              <button onClick={() => handleRemoveAdditional(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddAdditional} className="text-blue-500">Add Additional Information</button>
        </div>

        {/* Volunteer Experience section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Volunteer Experience</h2>
          {resumeData.volunteer.map((vol, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={vol.organization}
                onChange={(e) => handleVolunteerExperienceChange(index, 'organization', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Organization"
              />
              <input
                type="text"
                value={vol.role}
                onChange={(e) => handleVolunteerExperienceChange(index, 'role', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Role"
              />
              <input
                type="text"
                value={vol.startDate}
                onChange={(e) => handleVolunteerExperienceChange(index, 'startDate', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Start Date"
              />
              <input
                type="text"
                value={vol.endDate}
                onChange={(e) => handleVolunteerExperienceChange(index, 'endDate', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="End Date"
              />
              <textarea
                value={vol.description}
                onChange={(e) => handleVolunteerExperienceChange(index, 'description', e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
                placeholder="Description"
              />
              <button onClick={() => handleRemoveVolunteerExperience(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={handleAddVolunteerExperience} className="text-blue-500">Add Volunteer Experience</button>
        </div>
      </div>
    </section>
  );
}
