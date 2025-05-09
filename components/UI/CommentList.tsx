'use client'

import React from 'react'

type Comment = {
    id: string
    body: string
    createdAt: string
    articleId: string
    author: {
        id: string
        name: string
        imageUrl: string
    }
}

export const CommentList = ({ comments }: { comments: Comment[] }) => {
    if (comments.length === 0) {
        return <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet.</p>;
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="flex gap-3 border-b dark:border-gray-700 pb-3 last:border-b-0"
                >
                    <img
                        src={comment.author.imageUrl}
                        alt={comment.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                                {comment.author.name}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 break-words whitespace-pre-wrap">
                            {comment.body}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
