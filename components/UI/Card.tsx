"use client";

import { timeAgo } from "@/lib/TimeCalculate";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Avatar,
} from "@heroui/react";
import Link from "next/link";

export default function CardComponent({
    id,
    title,
    category,
    featuredImage,
    createdAt,
    authorName,
    authorImageUrl,
}: {
    id: string;
    title: string;
    category: string;
    featuredImage: string;
    createdAt: string;
    authorName: string;
    authorImageUrl: string;
}) {
    return (
        <Link href={`/article/${id}`} className="block">
            <Card className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-content1 text-foreground">
                <CardHeader className="p-4 flex justify-center items-center">
                    <Image
                        src={featuredImage}
                        alt={title}
                        fallbackSrc="https://heroui.com/images/hero-card-complete.jpeg"
                        className="max-h-40 object-contain"
                    />
                </CardHeader>

                <CardBody className="p-4 space-y-2">
                    <div className="flex items-center gap-2">

                    </div>

                    <h1 className="text-lg font-semibold">{title}</h1>
                    <p className="text-sm text-muted">{category}</p>
                </CardBody>

                <CardFooter className="px-4 pb-4 pt-0 flex justify-between text-xs text-muted">
                    <span>{new Date(createdAt).toDateString()}</span>
                    <span>{timeAgo(createdAt)}</span>
                </CardFooter>
            </Card>
        </Link>
    );
}
