// @/components/EditResume.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

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
} from '@/store/reducers/resumeData';

import {
  ResumeData
} from '@/interface/ResumeData';

import { Card, Divider } from '@heroui/react';

// --- Reusable Input and Button Components (no change) ---

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder, rows }) => (
  <div className="mb-2">
    {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full"
        placeholder={placeholder}
        rows={rows}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full"
        placeholder={placeholder}
      />
    )}
  </div>
);

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, className = 'text-blue-500 mt-2' }) => (
  <button type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-red-500 ml-2">
    Remove
  </button>
);

// --- Main Component ---

export default function EditResume() {
  const dispatch = useDispatch();
  const resumeData = useSelector((state: RootState) => state.resumeData);

  // --- Helper Functions for Indexed Updates ---

  // REVISED: Define a type for a generic Redux Toolkit action creator that updates an indexed item.
  // This is generic enough to handle both string and string[] values in the payload.
  type UpdateIndexedActionCreator<TItem extends object> = (payload: {
    index: number;
    field: keyof TItem;
    value: TItem[keyof TItem]; // The value can be any type of property on TItem
  }) => {
    payload: { index: number; field: keyof TItem; value: TItem[keyof TItem] };
    type: string;
  };


  // Helper for fields that are simple strings (e.g., degree, company, title)
  const handleStringFieldChange = <
    TItem extends object, // TItem is any object
    TField extends { [K in keyof TItem]: TItem[K] extends string ? K : never }[keyof TItem] // TField must be a key whose value is a string
  >(
    actionCreator: UpdateIndexedActionCreator<TItem>, // Use the generic action creator type
    index: number,
    field: TField, // The specific field, now guaranteed to be a string-valued key
    value: string // The input value is a string
  ) => {
    dispatch(actionCreator({ index, field: field as keyof TItem, value: value as TItem[keyof TItem] }));
  };

  // Helper for fields that are string arrays in Redux state, but edited as a single string
  const handleStringArrayFieldChange = <
    TItem extends object, // TItem is any object
    TField extends { [K in keyof TItem]: TItem[K] extends string[] ? K : never }[keyof TItem] // TField must be a key whose value is a string[]
  >(
    actionCreator: UpdateIndexedActionCreator<TItem>, // Use the generic action creator type
    index: number,
    field: TField, // The specific field, now guaranteed to be a string[]-valued key
    inputValue: string // The value from the input field
  ) => {
    const processedValue: string[] = inputValue.split(',').map(item => item.trim());
    dispatch(actionCreator({ index, field: field as keyof TItem, value: processedValue as TItem[keyof TItem] }));
  };

  // --- Section Renderers ---

  const renderPersonalInformation = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <InputField
        label="Full Name"
        type="text"
        name="name"
        value={resumeData.contact.name}
        onChange={(e) => dispatch(updateContactName(e.target.value))}
        placeholder="Your Full Name"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={resumeData.contact.email}
        onChange={(e) => dispatch(updateContactEmail(e.target.value))}
        placeholder="your.email@example.com"
      />
      <InputField
        label="Phone"
        type="tel"
        name="phone"
        value={resumeData.contact.phone}
        onChange={(e) => dispatch(updateContactPhone(e.target.value))}
        placeholder="e.g., +386 41 888 245"
      />
      <InputField
        label="LinkedIn Profile"
        type="text"
        name="linkedin"
        value={resumeData.contact.linkedin}
        onChange={(e) => dispatch(updateContactLinkedin(e.target.value))}
        placeholder="LinkedIn Profile URL"
      />
    </div>
  );

  const renderSummary = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <InputField
        label="Professional Summary"
        type="textarea"
        name="summary"
        value={resumeData.summary}
        onChange={(e) => dispatch(updateSummary(e.target.value))}
        placeholder="A concise overview of your skills and experience."
        rows={4}
      />
    </div>
  );

  const renderSkills = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      {resumeData.skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <InputField
            type="text"
            name={`skill-${index}`}
            value={skill}
            onChange={(e) => dispatch(updateSkill({ index, value: e.target.value }))}
            placeholder="e.g., JavaScript, React"
          />
          <RemoveButton onClick={() => dispatch(removeSkill(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addSkill(''))}>Add Skill</ActionButton>
    </div>
  );

  const renderEducation = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Education</h2>
      {resumeData.education.map((edu, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <InputField
            label="Degree"
            type="text"
            name={`degree-${index}`}
            value={edu.degree}
            onChange={(e) => handleStringFieldChange<ResumeData['education'][number], 'degree'>(updateEducation, index, 'degree', e.target.value)}
            placeholder="e.g., Master of Science"
          />
          <InputField
            label="Institution"
            type="text"
            name={`institution-${index}`}
            value={edu.institution}
            onChange={(e) => handleStringFieldChange<ResumeData['education'][number], 'institution'>(updateEducation, index, 'institution', e.target.value)}
            placeholder="University Name"
          />
          <InputField
            label="Year"
            type="text"
            name={`year-${index}`}
            value={edu.year}
            onChange={(e) => handleStringFieldChange<ResumeData['education'][number], 'year'>(updateEducation, index, 'year', e.target.value)}
            placeholder="e.g., 2020"
          />
          <RemoveButton onClick={() => dispatch(removeEducation(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addEducation({ degree: '', institution: '', year: '' }))}>
        Add Education
      </ActionButton>
    </div>
  );

  const renderWorkExperience = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      {resumeData.workExperience.map((exp, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <InputField
            label="Company"
            type="text"
            name={`company-${index}`}
            value={exp.company}
            onChange={(e) => handleStringFieldChange<ResumeData['workExperience'][number], 'company'>(updateWorkExperience, index, 'company', e.target.value)}
            placeholder="Company Name"
          />
          <InputField
            label="Title"
            type="text"
            name={`title-${index}`}
            value={exp.title}
            onChange={(e) => handleStringFieldChange<ResumeData['workExperience'][number], 'title'>(updateWorkExperience, index, 'title', e.target.value)}
            placeholder="Your Title"
          />
          <InputField
            label="Start Date"
            type="text"
            name={`startDate-${index}`}
            value={exp.startDate}
            onChange={(e) => handleStringFieldChange<ResumeData['workExperience'][number], 'startDate'>(updateWorkExperience, index, 'startDate', e.target.value)}
            placeholder="Month.Year (e.g., 8.2023)"
          />
          <InputField
            label="End Date"
            type="text"
            name={`endDate-${index}`}
            value={exp.endDate}
            onChange={(e) => handleStringFieldChange<ResumeData['workExperience'][number], 'endDate'>(updateWorkExperience, index, 'endDate', e.target.value)}
            placeholder="Month.Year or Present"
          />
          <InputField
            label="Responsibilities"
            type="textarea"
            name={`responsibilities-${index}`}
            value={exp.responsibilities.join(', ')} // Display as comma-separated string
            onChange={(e) =>
              handleStringArrayFieldChange<ResumeData['workExperience'][number], 'responsibilities'>(
                updateWorkExperience,
                index,
                'responsibilities',
                e.target.value
              )
            }
            placeholder="Responsibilities (comma separated)"
            rows={3}
          />
          <RemoveButton onClick={() => dispatch(removeWorkExperience(index))} />

          {/* Optional: Card for live preview */}
          <Card className="bg-white shadow-sm rounded-lg p-3 mt-4 border border-gray-200">
            <h3 className="text-lg font-medium">
              {exp.company}
              <span className="text-sm text-gray-600 ml-2">
                {exp.startDate} - {exp.endDate}
              </span>
            </h3>
            <h4 className="text-sm font-semibold text-gray-500">{exp.title}</h4>
            <ul className="list-disc pl-4 text-sm">
              {exp.responsibilities && exp.responsibilities.length > 0 ? (
                exp.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))
              ) : (
                <li>No responsibilities listed.</li>
              )}
            </ul>
          </Card>
          <Divider className="my-4" />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addWorkExperience({ company: '', title: '', startDate: '', endDate: '', responsibilities: [] }))}>
        Add Work Experience
      </ActionButton>
    </div>
  );

  const renderProjects = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <InputField
            label="Title"
            type="text"
            name={`projectTitle-${index}`}
            value={project.title}
            onChange={(e) => handleStringFieldChange<ResumeData['projects'][number], 'title'>(updateProject, index, 'title', e.target.value)}
            placeholder="Project Title"
          />
          <InputField
            label="Description"
            type="textarea"
            name={`projectDescription-${index}`}
            value={project.description}
            onChange={(e) => handleStringFieldChange<ResumeData['projects'][number], 'description'>(updateProject, index, 'description', e.target.value)}
            placeholder="Project Description"
            rows={3}
          />
          <InputField
            label="Technologies"
            type="text"
            name={`projectTechnologies-${index}`}
            value={project.technologies.join(', ')}
            onChange={(e) =>
              handleStringArrayFieldChange<ResumeData['projects'][number], 'technologies'>(
                updateProject,
                index,
                'technologies',
                e.target.value
              )
            }
            placeholder="Technologies (comma separated)"
          />
          <RemoveButton onClick={() => dispatch(removeProject(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addProject({ title: '', description: '', technologies: [] }))}>
        Add Project
      </ActionButton>
    </div>
  );

  const renderCertifications = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <InputField
            type="text"
            name={`certification-${index}`}
            value={cert}
            onChange={(e) => dispatch(updateCertification({ index, value: e.target.value }))}
            placeholder="Certification Name"
          />
          <RemoveButton onClick={() => dispatch(removeCertification(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addCertification(''))}>Add Certification</ActionButton>
    </div>
  );

  const renderAwards = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Awards</h2>
      {resumeData.awards.map((award, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <InputField
            type="text"
            name={`award-${index}`}
            value={award}
            onChange={(e) => dispatch(updateAward({ index, value: e.target.value }))}
            placeholder="Award Name"
          />
          <RemoveButton onClick={() => dispatch(removeAward(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addAward(''))}>Add Award</ActionButton>
    </div>
  );

  const renderAdditionalInformation = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Additional Information</h2>
      {resumeData.additional.map((additional, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <InputField
            label="Category"
            type="text"
            name={`additionalCategory-${index}`}
            value={additional.category}
            onChange={(e) => handleStringFieldChange<ResumeData['additional'][number], 'category'>(updateAdditional, index, 'category', e.target.value)}
            placeholder="e.g., Languages, Interests"
          />
          <InputField
            label="Details"
            type="textarea"
            name={`additionalDetails-${index}`}
            value={additional.details}
            onChange={(e) => handleStringFieldChange<ResumeData['additional'][number], 'details'>(updateAdditional, index, 'details', e.target.value)}
            placeholder="Details (e.g., Fluent in Spanish)"
            rows={2}
          />
          <InputField
            label="Technologies (if applicable)"
            type="text"
            name={`additionalTechnologies-${index}`}
            value={additional.technologies.join(', ')}
            onChange={(e) =>
              handleStringArrayFieldChange<ResumeData['additional'][number], 'technologies'>(
                updateAdditional,
                index,
                'technologies',
                e.target.value
              )
            }
            placeholder="Technologies (comma separated)"
          />
          <RemoveButton onClick={() => dispatch(removeAdditional(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addAdditional({ category: '', details: '', technologies: [] }))}>
        Add Additional Information
      </ActionButton>
    </div>
  );

  const renderVolunteerExperience = () => (
    <div className="mb-8 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Volunteer Experience</h2>
      {resumeData.volunteer.map((vol, index) => (
        <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
          <InputField
            label="Organization"
            type="text"
            name={`volunteerOrganization-${index}`}
            value={vol.organization}
            onChange={(e) => handleStringFieldChange<ResumeData['volunteer'][number], 'organization'>(updateVolunteerExperience, index, 'organization', e.target.value)}
            placeholder="Organization Name"
          />
          <InputField
            label="Role"
            type="text"
            name={`volunteerRole-${index}`}
            value={vol.role}
            onChange={(e) => handleStringFieldChange<ResumeData['volunteer'][number], 'role'>(updateVolunteerExperience, index, 'role', e.target.value)}
            placeholder="Your Role"
          />
          <InputField
            label="Start Date"
            type="text"
            name={`volunteerStartDate-${index}`}
            value={vol.startDate}
            onChange={(e) => handleStringFieldChange<ResumeData['volunteer'][number], 'startDate'>(updateVolunteerExperience, index, 'startDate', e.target.value)}
            placeholder="Month.Year"
          />
          <InputField
            label="End Date"
            type="text"
            name={`volunteerEndDate-${index}`}
            value={vol.endDate}
            onChange={(e) => handleStringFieldChange<ResumeData['volunteer'][number], 'endDate'>(updateVolunteerExperience, index, 'endDate', e.target.value)}
            placeholder="Month.Year or Present"
          />
          <InputField
            label="Description"
            type="textarea"
            name={`volunteerDescription-${index}`}
            value={vol.description}
            onChange={(e) => handleStringFieldChange<ResumeData['volunteer'][number], 'description'>(updateVolunteerExperience, index, 'description', e.target.value)}
            placeholder="Description of your volunteer work"
            rows={3}
          />
          <RemoveButton onClick={() => dispatch(removeVolunteerExperience(index))} />
        </div>
      ))}
      <ActionButton onClick={() => dispatch(addVolunteerExperience({ organization: '', role: '', startDate: '', endDate: '', description: '' }))}>
        Add Volunteer Experience
      </ActionButton>
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <h1 className="text-3xl font-bold text-gray-800">Edit Your Resume</h1>
      <div className="w-full max-w-3xl space-y-8">
        {renderPersonalInformation()}
        {renderSummary()}
        {renderSkills()}
        {renderEducation()}
        {renderWorkExperience()}
        {renderProjects()}
        {renderCertifications()}
        {renderAwards()}
        {renderAdditionalInformation()}
        {renderVolunteerExperience()}
      </div>
    </section>
  );
}