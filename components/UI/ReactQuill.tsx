'use client'

import React, { useState } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

interface Props {
    value: string
    onChange: (value: string) => void
    error?: string
}

const ReactQuillComponent: React.FC<Props> = ({ value, onChange, error }) => {
    return (
        <div className="w-full">

            <div className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                <ReactQuill

                    theme="snow"
                    value={value}
                    onChange={onChange}
                    className="min-h-[200px]"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default ReactQuillComponent
