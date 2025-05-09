'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getArticleStats } from '@/actions/likes/get-comment-count';

const CommentCount = ({ articleId }: { articleId: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const { comments } = await getArticleStats(articleId);
                setCount(comments);
            } catch (err) {
                console.error('Error fetching comment count', err);
            }
        };
        fetchCount();
    }, [articleId]);

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700   rounded-md
        px-6 py-3  ">
            <MessageCircle className="w-4 h-4" />
            {count} comment{count !== 1 ? 's' : ''}
        </div>
    );
};

export default CommentCount;
