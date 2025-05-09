"use client";

import { Card, CardFooter, Button } from "@heroui/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import devopsImage from "../../public/devops.avif";
import webImage from "../../public/website.jpeg";
import cloudImage from "../../public/cloud.jpg";
import aimlImage from "../../public/aiml.jpeg";


const FeaturedCategorie = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <h3 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                Featured Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        isFooterBlurred
                        className="w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] h-[340px] rounded-2xl overflow-hidden relative shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <Image
                            alt={category.name}
                            className="object-cover w-full h-full"
                            height={300}
                            src={category.image}
                            width={300}
                        />
                        <CardFooter className="absolute bottom-0 w-full bg-black/50 text-white backdrop-blur-md flex justify-between items-center py-3 px-4">
                            <div>
                                <h4 className="text-base font-semibold">{category.name}</h4>
                                <p className="text-xs opacity-80 line-clamp-2">
                                    {category.description}
                                </p>
                            </div>
                            <Link href={category.href}>
                                <Button
                                    className="text-xs bg-white/10 text-white"
                                    radius="lg"
                                    size="sm"
                                    variant="flat"
                                >
                                    Explore
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategorie;
const categories = [
    {
        name: "Web Development",
        description: "Modern frameworks, best practices, and practical tutorials",
        href: "/article?page=1&search=web-development",
        image: webImage, // Code + screen
    },
    {
        name: "Cloud Architecture",
        description: "Scale your applications with cloud-native solutions",
        href: "/article?page=1&search=cloud",
        image: cloudImage, // Cloud server
    },
    {
        name: "DevOps & Tools",
        description: "Automation, CI/CD, and development workflows",
        href: "/article?page=1&search=devops",
        image: devopsImage, // DevOps terminal/tools
    },
    {
        name: "AI & Engineering",
        description: "ML models, LLM integrations, and engineering at scale",
        href: "/article?page=1&search=ai-engineering",
        image: aimlImage, // AI abstract art
    },
];
