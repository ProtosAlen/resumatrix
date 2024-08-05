import { NextResponse } from 'next/server';
import generateResumePDF from '@/components/resume/pdfHelper';

export async function GET() {


    console.error('Server-side: Starting PDF generation'); // Use Node.js console

    const buffer = await generateResumePDF();
    console.error('Server-side: PDF generated ' + buffer);

    const blob = new Blob([buffer], { type: 'application/pdf' });

    const response = new NextResponse(blob, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume.pdf"`,
            'Access-Control-Allow-Origin': '*'
        },
    });
    response.headers.set('Content-Length', buffer.length.toString());
    response.headers.set('Message', buffer.toString());

    console.error('Server-side: Response status:', response.status);
    console.error('Server-side: Response headers:', response.headers);

    return response;
}
