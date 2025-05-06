"use client";

import React, { useState, useEffect } from "react";
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
    Image,
} from "@heroui/react";
import ReactQuillComponent from "@/components/UI/ReactQuill";
import { createArticle } from "@/actions/create-article";
import { useRouter } from "next/navigation";
import { editArticle } from "@/actions/edit-articles";

const categories = [
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
    image?: string[];
};

const EditArticlePage = ({
    id,
    title,
    category,
    content,
    image,
    description,
}: {
    id: string;
    title: string;
    category: string;
    content: string;
    image: string;
    description: string;
}) => {
    const router = useRouter();
    const [editedTitle, setTitle] = useState(title);
    const [editedCategory, setCategory] = useState(category);
    const [editedContent, setContent] = useState(content);
    const [editedDescription, setDescription] = useState(description);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [editedImage, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(image);

    // Effect to update image preview if a new image is selected
    useEffect(() => {
        if (editedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(editedImage);
        }
    }, [editedImage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", editedTitle);
            formData.append("category", editedCategory);
            formData.append("description", editedDescription);
            formData.append("content", editedContent);
            if (editedImage) {
                formData.append("image", editedImage);
            }

            const result = await editArticle(formData);

            if (result.errors && Object.keys(result.errors).length > 0) {
                setErrors(result.errors);
            } else if (result.success) {
                addToast({
                    title: "Success",
                    description: "Article created successfully",
                    color: "success",
                    variant: "bordered",
                });

                router.push("/dashboard");
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
                        Edit Article
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
                                value={editedTitle}
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
                                aria-label="Select Category"
                                name="category"
                                selectedKeys={editedCategory ? [editedCategory] : []}
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
                                value={editedDescription}
                                onChange={(e) => setDescription(e.target.value)}
                                isInvalid={!!errors?.description}
                            />
                            {errors?.description && (
                                <p className="text-red-500 text-sm">{errors.description[0]}</p>
                            )}
                        </div>

                        <div className="space-y-1 ">
                            <label htmlFor="image" className="text-sm font-medium text-default-600">
                                Thumbnail Image
                            </label>
                            <div className="flex gap-2">

                                {imagePreview && (
                                    <Image
                                        isBlurred
                                        isZoomed

                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-36 h-32 object-cover mb-2"
                                    />
                                )}
                                <Input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    isInvalid={!!errors?.image}
                                />
                            </div>
                            {errors?.image && (
                                <p className="text-red-500 text-sm">{errors.image[0]}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="content" className="text-sm font-medium text-default-600">
                                Content
                            </label>
                            <ReactQuillComponent value={editedContent} onChange={setContent} />
                            <input type="hidden" name="content" value={editedContent} />
                            {errors?.content && (
                                <p className="text-red-500 text-sm">{errors.content[0]}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-2">
                            <Button
                                type="button"
                                variant="flat"
                                color="danger"
                                onPress={() => router.push("/dashboard")}
                                isDisabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="success"
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

export default EditArticlePage;
