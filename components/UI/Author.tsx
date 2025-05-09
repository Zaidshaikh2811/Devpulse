"use client"

import { Avatar } from '@heroui/react'
import React from 'react'

const Author = ({
    authorName,
    authorImageUrl
}: {
    authorName: string;
    authorImageUrl: string;
}) => {
    return (
        <div>
            <Avatar
                name={authorName}
                src={authorImageUrl}
                size="sm"
                className="bg-primary text-primary-foreground text-sm"
            />
            <p className="text-sm font-medium">{authorName}</p>
        </div>
    )
}

export default Author
