import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { useContext } from 'react';

import TestResume from '@/components/resume/ViewResume'; // Assuming TestResume uses ResumeData
import ResumeContext from '@/context/ResumeContext';
import { ResumeData } from '@/interface/ResumeData';

export default function ResumeBuilderPage() {
  const { resumeData, setResumeData } = useContext(ResumeContext);

const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setResumeData({
    ...resumeData,
    contact: {
      name: e.target.value,
      email: '',
      phone: '',
      linkedin: ''
    },
  });
  console.log('Updated resumeData:', resumeData);
};

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Resume Builder</h1>
        </div>

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
            {/* ... other input fields */}
          </div>

          {/* Education section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            {/* ... education section logic */}
          </div>

          {/* ... other sections */}
        </div>

        {/* Resume preview component */}
        <div className="w-full max-w-4xl">
          <TestResume />
        </div>
      </section>
    </DefaultLayout>
  );
}
