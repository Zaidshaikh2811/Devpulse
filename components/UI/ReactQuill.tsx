

"use client"


import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const ReactQuillComponent = () => {
    const [value, setValue] = useState('');

    return <ReactQuill className='h-[100%]' theme="snow" value={value} onChange={setValue} />;
}

export default ReactQuillComponent
