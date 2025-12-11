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
                    <Button variant="outline" className="bg-[#45aaa2] hover:bg-[#3c8f88] transition-colors">
                        Browse Events
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Breadcrumb;