'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css'; // Include styles

export default function Editor({
    content, setContent
}: {
    content: string;
    setContent?: (content: string) => void;
}) {


    return (
        <div>

            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}
