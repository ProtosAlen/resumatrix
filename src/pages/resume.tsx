import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';

import ViewResume from '@/components/resume/ViewResume'; 
import EditResume from '@/components/resume/EditResume';

export default function ResumeBuilderPage() {

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Resume Builder</h1>
        </div>

        {/* Resume preview component */}
        <div className="w-full max-w-4xl">
          <EditResume />
        </div>

        {/* Resume preview component */}
        <div className="w-full max-w-4xl">
          <ViewResume />
        </div>

      </section>
    </DefaultLayout>
  );
}




{/* <div className="w-full max-w-3xl">
           Personal information section 
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <input
              type="text"
              name="name"
              value={resumeData.contact.name}
              onChange={handleContactNameChange}
              className="border border-gray-300 p-2 rounded"
            />
        
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Education</h2>
      
          </div>
        </div> */}