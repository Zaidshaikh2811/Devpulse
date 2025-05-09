"use client";

import React, { useEffect, useState, useRef } from "react";
import { getArticleCommentById } from "@/actions/comments/get-comments";
import { CommentList } from "./CommentList";

const PAGE_SIZE = 5;

const CommentShow = ({ articleId }: { articleId: string }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadComments = async () => {
            setLoading(true);
            try {
                const newComments = await getArticleCommentById(
                    articleId,
                    PAGE_SIZE,
                    page * PAGE_SIZE
                );
                setComments((prev) => [...prev, ...newComments]);
                if (newComments.length < PAGE_SIZE) setHasMore(false);
            } catch (error) {
                console.error("Failed to load comments:", error);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [articleId, page]);

    useEffect(() => {
        if (!loaderRef.current || !hasMore || loading) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loaderRef.current, hasMore, loading]);

    return (
        <div className="max-h-96 overflow-y-auto p-4 border rounded-md shadow-sm bg-white dark:bg-black dark:border-gray-700 space-y-4">
            <CommentList comments={comments} />

            {loading && (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
                    Loading...
                </p>
            )}
            {!hasMore && (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
                    No more comments.
                </p>
            )}

            {/* Spacer for observer */}
            <div ref={loaderRef} className="h-6" />
        </div>
    );
};

export default CommentShow;
