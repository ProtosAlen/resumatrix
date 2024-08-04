import { NextResponse } from 'next/server';
import generateResumePDF from '../../pdfHelper'; // Assuming pdfHelper.tsx is in the root directory

export async function POST(request) {
    const { resumeData } = await request.json();
    const buffer = await generateResumePDF(resumeData);

    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const response = new NextResponse(blob, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="resume.pdf"`,
        },
    });
    response.headers.set('Content-Length', buffer.length.toString());
    return response;
}
