'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { toggleArticleLike } from '@/actions/likes/toggle-like';
import { addToast } from '@heroui/react';
import { getLikeStatusAndCount } from '@/actions/likes/getUserLikeStatus';

const LikeButton = ({ articleId, userId }: { articleId: string; userId: string | null }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState<number | null>(null);


    useEffect(() => {
        const fetchLikeData = async () => {
            try {

                const data = await getLikeStatusAndCount(articleId, userId);


                setLiked(data.liked);
                setLikesCount(data.likesCount);
            } catch (error) {
                addToast({ variant: 'flat', color: 'danger', title: 'Error', description: 'Failed to load like data' });
            }
        };
        fetchLikeData();
    }, [articleId, userId]);


    const toggleLike = async () => {
        setLiked((prev) => !prev);
        setLikesCount((count) => (count ?? 0) + (liked ? -1 : 1));
        try {

            if (userId) {
                await toggleArticleLike(articleId, userId);
            } else {
                addToast({ variant: "flat", color: "danger", title: "Error", description: "User ID is required to toggle like" });
            }
            addToast({ variant: "flat", color: "success", title: "Success", description: "Like toggled successfully" });
        }
        catch (error) {
            addToast({ variant: "flat", color: "danger", title: "Error", description: "Failed to toggle like" });
        }
    };

    return (
        <Button
            disabled={!userId}
            variant={liked ? 'solid' : 'bordered'}
            onClick={toggleLike}
            className={`flex items-center gap-2 ${liked ? 'text-red-500' : ''}`}
        >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 stroke-red-500' : ''}`} />
            {likesCount !== null && likesCount > 0 ? likesCount : 'Like'}
        </Button>
    );
};

export default LikeButton;
