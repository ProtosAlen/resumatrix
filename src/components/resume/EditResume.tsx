import { title } from '@/components/primitives';
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

  removeWorkExperience,
  // Add similar action creators for other sections
} from '@/store/reducers/resumeData';

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

  // ... other handlers for skills, education, work experience, etc.

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
          {/* ... other input fields for phone and linkedin */}
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
          {/* ... skills section logic */}
        </div>

        {/* Education section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Education</h2>
          {/* ... education section logic */}
        </div>

        {/* Work Experience section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Work Experience</h2>
          {/* ... work experience section logic */}
        </div>

        {/* ... other sections */}
      </div>
    </section>
  );
}
