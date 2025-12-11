"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { becomeHost } from '@/services/user/becomeHost';
// import BecomeHostConfirmationDialog from '@/components/shared/BecomeHostConfirmationDialog';

const Breadcrumb = () => {
    // const [open, setOpen] = useState(false);
    // const [isRequesting, setIsRequesting] = useState(false);

    // const confirmHost = async () => {
    //     try {
    //         setIsRequesting(true);
    //         const result = await becomeHost();

    //         if (result.success) {
    //             toast.success(result.message || "Your Host Request has Been Successful! Please Wait For Admin Approval");
    //         } else {
    //             toast.error(result.message || "Failed to Apply Host!");
    //         }
    //     } catch {
    //         toast.error('Request failed');
    //     } finally {
    //         setIsRequesting(false);
    //         setOpen(false);
    //     }
    // }

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
                {/* <Button
                    onClick={() => setOpen(true)}
                    className="bg-[#45aaa2] hover:bg-[#3c8f88] transition-colors text-white"
                >
                    Become Host
                </Button>
                <BecomeHostConfirmationDialog
                    open={open}
                    onOpenChange={(v) => setOpen(v)}
                    isRequesting={isRequesting}
                    title="Confirm Become Host"
                    description="This will delete your client data and convert your account to a Host. This action cannot be undone."
                    onConfirm={confirmHost}
                /> */}
            </div>
        </div>
    );
};

export default Breadcrumb;