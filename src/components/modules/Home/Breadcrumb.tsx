"use client";

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Breadcrumb = () => {


    return (
        <div className="rounded-2xl  p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl  uppercase font-semibold mb-4">
                Ready to Get Started?
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-6">
                Explore amazing events happening around you and make unforgettable memories
            </p>
            <div className="flex flex-row gap-4 justify-center">

                <Link href="/all-events">
                    <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 active:scale-100">
                        <Button
                            className="px-8 text-sm py-3 text-white rounded-md font-medium bg-transparent border backdrop-blur-md relative z-10 hover:bg-transparent"
                        >
                            Explore Events
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Breadcrumb;