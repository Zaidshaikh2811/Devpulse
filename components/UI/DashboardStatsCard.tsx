"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";

interface DashboardStatsCardProps {
    icon: React.ReactNode;
    value: string;
    title: string;
    description: string;
    accentColor?: string; // Optional color override
}

export default function DashboardStatsCard({
    icon,
    value,
    title,
    description,
    accentColor = "from-[#5EA2EF] to-[#0072F5]",
}: DashboardStatsCardProps) {
    return (
        <Card className="w-full max-w-sm rounded-2xl shadow-lg border border-default-200 hover:shadow-xl transition duration-300">
            <CardHeader className="flex items-center gap-4">
                <div
                    className={`p-3 bg-gradient-to-br ${accentColor} text-white rounded-xl text-2xl shadow-inner`}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-default-900">{value}</p>
                    <p className="text-sm text-default-500 font-medium">{title}</p>
                </div>
            </CardHeader>
            <CardBody>
                <p className="text-sm text-default-600">{description}</p>
            </CardBody>
        </Card>
    );
}
