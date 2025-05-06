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
import { IoHomeOutline } from "react-icons/io5";
import { title } from "../primitives";
import { PiArticle } from "react-icons/pi";
import { FaRegComments } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
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

                        <div className="flex flex-col">
                            <p className="font-bold text-inherit"> <span className={title({ color: "blue", size: "sm" })}>Dev</span>Pulse</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex flex-col gap-2 mt-4 h-[80%]">
                        <Link href="/" className='gap-2'><IoHomeOutline /> <span> Home</span></Link>
                        <Link href="/dashboard" className='gap-2'><PiArticle /><span>Article</span></Link>
                        <Link href="#" className='gap-2'><FaRegComments /> <span> Comments</span></Link>
                        <Link href="#" className='gap-2'><TbBrandGoogleAnalytics /> <span>Analytics</span></Link>
                        <Link href="#" className='gap-2'><IoSettingsOutline /> <span>Settings </span></Link>
                    </CardBody>
                    <Divider />
                    <CardFooter className='bottom-0'>
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
