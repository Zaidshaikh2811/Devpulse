"use client"

import { addComment } from '@/actions/comments/add-comment'
import { Button } from '@heroui/button'
import { Textarea } from '@heroui/input'
import { addToast } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CommentForm = ({
    articleId,
    userId
}: {
    articleId: string,
    userId: string
}) => {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !userId) return;

        setLoading(true);
        try {
            await addComment({ articleId, userId, comment: content });


            setContent('');
            addToast({ variant: "flat", color: "success", title: "Success", description: "Comment added successfully" });
        } catch (error) {
            console.error('Error adding comment:', error);
            addToast({ variant: "flat", color: "danger", title: "Error", description: "Failed to create comment" });
        } finally {
            setLoading(false);
        }
    };

    if (!userId) {
        return <p className="text-sm text-gray-500">Please sign in to leave a comment.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <h3 className="text-lg font-semibold mb-3">Leave a comment</h3>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)

            } placeholder="Write your comment here..." className="mb-4"
                rows={4}
                required
            />
            <div className="text-right">
                <Button type="submit" disabled={loading} color="primary" variant="ghost">
                    {loading ? 'Posting...' : 'Post Comment'}
                </Button>
            </div>
        </form>
    )
}

export default CommentForm
