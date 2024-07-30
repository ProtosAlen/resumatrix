import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { useDispatch, useSelector } from 'react-redux';

import TestResume from '@/components/resume/ViewResume'; // Assuming TestResume uses ResumeData
import { RootState } from '@/store/store'; // Import the RootState type
import { updateContactName } from '@/store/reducers/resumeData';

export default function EditResume() {
  const dispatch = useDispatch();
  const resumeData = useSelector((state: RootState) => state.resumeData);

  const handleContactNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch an action to update the contact name
    dispatch(updateContactName(e.target.value)); // Assuming updateContactName is your action creator
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
