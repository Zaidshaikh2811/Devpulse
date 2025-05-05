"use client";

import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Divider,
    CardFooter,
    Input,
    Button,
    Select,
    SelectItem,
} from "@heroui/react";
import ReactQuillComponent from "@/components/UI/ReactQuill";

export const categories = [
    { key: "web-dev", label: "Web Development" },
    { key: "mobile-dev", label: "Mobile Development" },
    { key: "ai-ml", label: "AI & Machine Learning" },
    { key: "cybersecurity", label: "Cybersecurity" },
    { key: "cloud", label: "Cloud Computing" },
    { key: "devops", label: "DevOps" },
    { key: "data-science", label: "Data Science" },
    { key: "programming", label: "Programming Languages" },
    { key: "blockchain", label: "Blockchain" },
    { key: "tech-news", label: "Tech News" },
    { key: "productivity", label: "Productivity Tools" },
    { key: "career", label: "Career Advice" },
    { key: "startups", label: "Startups & Entrepreneurship" },
];

const Page = () => {
    return (
        <div className="flex justify-center p-6   min-h-screen">
            <Card className="w-full max-w-3xl shadow-lg rounded-xl">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-default-800">
                        Create New Article
                    </h2>
                </CardHeader>

                <Divider />

                <CardBody className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-default-600">
                            Title
                        </label>
                        <Input placeholder="Enter title..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-default-600">
                            Category
                        </label>
                        <Select label="Select an categories (Category)">
                            {categories.map((categories) => (
                                <SelectItem key={categories.key}>{categories.label}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="image" className="text-sm font-medium text-default-600">
                            Image Upload
                        </label>
                        <Input id="image" type="file" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-default-600">
                            Content
                        </label>
                        <ReactQuillComponent />
                    </div>
                </CardBody>

                <Divider />

                <CardFooter className="flex justify-end gap-4">
                    <Button color="danger" variant="flat">
                        Cancel
                    </Button>
                    <Button color="success" variant="ghost">Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;
