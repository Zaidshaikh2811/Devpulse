"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Input,
    Button,
    Select,
    SelectItem,
    addToast,
} from "@heroui/react";
import ReactQuillComponent from "@/components/UI/ReactQuill";
import { createArticle } from "@/actions/create-article";
import { useRouter } from "next/navigation";

export const categories = [
    { key: "Web Development", label: "Web Development" },
    { key: "Mobile Development", label: "Mobile Development" },
    { key: "AI & Machine Learning", label: "AI & Machine Learning" },
    { key: "Cybersecurity", label: "Cybersecurity" },
    { key: "Cloud Computing", label: "Cloud Computing" },
    { key: "DevOps", label: "DevOps" },
    { key: "Data Science", label: "Data Science" },
    { key: "Programming Languages", label: "Programming Languages" },
    { key: "Blockchain", label: "Blockchain" },
    { key: "Tech News", label: "Tech News" },
    { key: "Productivity Tools", label: "Productivity Tools" },
    { key: "Career Advice", label: "Career Advice" },
    { key: "Startups & Entrepreneurship", label: "Startups & Entrepreneurship" },
] as const;

type FormErrors = {
    title?: string[];
    category?: string[];
    description?: string[];
    content?: string[];
    general?: string[];
};

const Page = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("content", content);

            const result = await createArticle(formData);

            if (result.errors && Object.keys(result.errors).length > 0) {
                setErrors(result.errors);
            } else if (result.success) {
                addToast({
                    title: "Success",
                    description: "Article created successfully",
                    color: "success",
                    variant: "bordered"

                });
                // router.push("/dashboard");
            }
        } catch (error) {
            setErrors({
                general: ["An unexpected error occurred. Please try again."],
            });
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center p-6 min-h-screen ">
            <Card className="w-full max-w-3xl shadow-lg rounded-xl">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-default-800">
                        Create New Article
                    </h2>
                </CardHeader>

                <Divider />

                <CardBody className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors?.general && (
                            <div className="text-red-500 text-sm">
                                {errors.general[0]}
                            </div>
                        )}

                        <div className="space-y-1">
                            <label htmlFor="title" className="text-sm font-medium text-default-600">
                                Title
                            </label>
                            <Input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                isInvalid={!!errors?.title}
                            />
                            {errors?.title && (
                                <p className="text-red-500 text-sm">{errors.title[0]}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="category" className="text-sm font-medium text-default-600">
                                Category
                            </label>
                            <Select
                                name="category"
                                selectedKeys={category ? [category] : []}
                                onSelectionChange={(keys) => {
                                    const keyArray = Array.from(keys);
                                    setCategory(keyArray[0] as string);
                                }}
                                isInvalid={!!errors?.category}
                            >
                                {categories.map((cat) => (
                                    <SelectItem key={cat.key}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            {errors?.category && (
                                <p className="text-red-500 text-sm">{errors.category[0]}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="description" className="text-sm font-medium text-default-600">
                                Description
                            </label>
                            <Input
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                isInvalid={!!errors?.description}
                            />
                            {errors?.description && (
                                <p className="text-red-500 text-sm">{errors.description[0]}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="content" className="text-sm font-medium text-default-600">
                                Content
                            </label>
                            <ReactQuillComponent value={content} onChange={setContent} />
                            <input type="hidden" name="content" value={content} />
                            {errors?.content && (
                                <p className="text-red-500 text-sm">{errors.content[0]}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-2">
                            <Button
                                type="button"
                                variant="flat"
                                onPress={() => router.push("/dashboard")}
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="ghost"
                                isLoading={isLoading}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Page;