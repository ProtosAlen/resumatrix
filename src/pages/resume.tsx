import { useState } from 'react';
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';

import ViewResume from '@/components/resume/ViewResume';
import EditResume from '@/components/resume/EditResume';
import { Divider, Button } from '@heroui/react';

export default function ResumeBuilderPage() {
  // State to handle the visibility of the edit resume section
  const [isEditVisible, setIsEditVisible] = useState(true);

  // Toggle function for the edit resume section
  const toggleEditVisibility = () => {
    setIsEditVisible((prevState) => !prevState);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

        <div className="inline-block max-w-lg text-center justify-center">
          <div className={title()}>
            <h1 className={title({ color: "blue" })}>Resume Builder</h1>
          </div>
        </div>
        <Divider />

        {/* Button to toggle edit resume visibility */}
        <Button
          onClick={toggleEditVisibility}
          color="primary"
          className="mb-4"
        >
          {isEditVisible ? 'Hide Resume Editor' : 'Show Resume Editor'}
        </Button>

        {/* Conditionally render the edit resume section */}
        {isEditVisible && (
          <div className="w-full max-w-4xl">
            <EditResume />
          </div>
        )}

        {/* Resume preview component */}
        <div className="w-full max-w-4xl">
          <ViewResume />
        </div>
      </section>
    </DefaultLayout>
  );
}
