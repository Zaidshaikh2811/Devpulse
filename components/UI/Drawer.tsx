'use client';

import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Button,
} from '@heroui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ResponsiveSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle Button for small screens */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    isIconOnly

                    onClick={() => setIsOpen(true)}
                    aria-label="Open sidebar"
                >
                    click
                    {/* <Bars3Icon className="w-6 h-6 text-gray-700" /> */}
                </Button>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0    z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Card className="h-full shadow-none border-none">
                <aside
                    className={` bg-inherit
          fixed top-0 left-0 z-50 h-full w-64 p-4   shadow-lg transition-transform transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
                >
                    {/* Close button for mobile */}
                    <div className="flex justify-end md:hidden mb-2">
                        <Button
                            isIconOnly
                            variant="light"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close sidebar"
                        >close
                            {/* <XMarkIcon className="w-6 h-6 text-gray-700" /> */}
                        </Button>
                    </div>

                    <CardHeader className="flex gap-3">
                        <Image
                            alt="heroui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-md font-semibold">HeroUI</p>
                            <p className="text-small text-default-500">heroui.com</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex flex-col gap-2">
                        <Link href="#">Home</Link>
                        <Link href="#">Dashboard</Link>
                        <Link href="#">Projects</Link>
                        <Link href="#">Team</Link>
                        <Link href="#">Settings</Link>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link
                            isExternal
                            showAnchorIcon
                            href="https://github.com/heroui-inc/heroui"
                        >
                            Visit source code on GitHub.
                        </Link>
                    </CardFooter>
                </aside>
            </Card>
        </>
    );
}
