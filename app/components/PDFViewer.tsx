'use client'
import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {

    return (
        <div className='w-[700px] h-[85vh] rounded-full'>
        <Worker workerUrl="/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} />
        </Worker>


        </div>
    );
}

export default PDFViewer;
