// pdfHelper.d.ts
declare module 'pdfHelper' {
  import { RootState } from '@/store/store';
  import { Uint8Array } from 'node:util';

  export default function generateResumePDF(resumeData: RootState['resumeData']): Promise<Uint8Array>;
}
