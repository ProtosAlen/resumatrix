import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '@/layouts/default';

import ViewResume from '@/components/resume/ViewResume';
import EditResume from '@/components/resume/EditResume';
import { Button } from '@heroui/react';
import { button as buttonStyles } from '@heroui/theme';
import { RootState } from '@/store/store';
import { setResumeData } from '@/store/reducers/resumeData';
import { ResumeData } from '@/interface/ResumeData';
import '@/styles/globals.css';

export default function ResumeBuilderPage() {
  const [isEditVisible, setIsEditVisible] = useState(true);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const resumeData = useSelector((state: RootState) => state.resumeData);

  useEffect(() => {
    const el = cursorGlowRef.current;
    if (!el) return;
    const setPosition = (e: MouseEvent) => {
      el.style.setProperty('--mouse-x', `${e.clientX}px`);
      el.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    const setInitial = () => {
      el.style.setProperty('--mouse-x', `${typeof window !== 'undefined' ? window.innerWidth / 2 : 0}px`);
      el.style.setProperty('--mouse-y', `${typeof window !== 'undefined' ? window.innerHeight / 2 : 0}px`);
    };
    setInitial();
    window.addEventListener('mousemove', setPosition);
    window.addEventListener('resize', setInitial);
    return () => {
      window.removeEventListener('mousemove', setPosition);
      window.removeEventListener('resize', setInitial);
    };
  }, []);

  const toggleEditVisibility = () => setIsEditVisible((prev) => !prev);

  const exportResume = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${resumeData.contact.name.replace(/\s+/g, '-').toLowerCase() || 'export'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string) as ResumeData;
        // Validate basic structure
        if (importedData.contact && importedData.skills !== undefined) {
          dispatch(setResumeData(importedData));
          alert('Resume imported successfully!');
        } else {
          alert('Invalid resume file format. Please check the file and try again.');
        }
      } catch (error) {
        console.error('Error importing resume:', error);
        alert('Error importing resume. Please check the file format and try again.');
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DefaultLayout>
      <section
        ref={cursorGlowRef}
        className="relative flex flex-col items-center gap-6 py-12 md:py-16 px-6 max-w-7xl mx-auto min-h-[80vh]"
      >
        <div className="cursor-glow" aria-hidden />
        <div className="bg-glow-orb -top-20 -left-20" aria-hidden />
        <div className="bg-glow-orb-right top-1/2 -translate-y-1/2 -right-32 lg:right-0" aria-hidden />

        <div className="relative z-10 flex flex-col items-center w-full gap-6">
          <div className="inline-block text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              <span className="text-gradient-blue">Resume Builder</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              onClick={toggleEditVisibility}
              className={buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'shadow',
                size: 'lg',
                class: 'button-glow',
              })}
            >
              {isEditVisible ? 'Hide Resume Editor' : 'Show Resume Editor'}
            </Button>

            <Button
              onClick={exportResume}
              className={buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'bordered',
                size: 'lg',
                class: 'button-glow-border',
              })}
            >
              Export Resume
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importResume}
              className="hidden"
              aria-label="Import resume file"
            />

            <Button
              onClick={handleImportClick}
              className={buttonStyles({
                color: 'primary',
                radius: 'full',
                variant: 'bordered',
                size: 'lg',
                class: 'button-glow-border',
              })}
            >
              Import Resume
            </Button>
          </div>

          {isEditVisible && (
            <div className="w-full max-w-4xl glass-card rounded-2xl p-6 md:p-8">
              <EditResume />
            </div>
          )}

          <div className="w-full max-w-4xl glass-card rounded-2xl p-6 md:p-8">
            <ViewResume />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
