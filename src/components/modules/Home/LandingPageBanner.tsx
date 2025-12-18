"use client";

import Image from "next/image";
import { LandingPageStats } from "@/services/home/homeServices";
import bannerImage from "@/assets/images/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { becomeHost } from "@/services/user/becomeHost";
import BecomeHostConfirmationDialog from "@/components/shared/BecomeHostConfirmationDialog";

type Props = {
    stats: LandingPageStats;
    userRole?: string;
};

const LandingPageBanner = ({ stats, userRole }: Props) => {
    const [open, setOpen] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    const confirmHost = async () => {
        try {
            setIsRequesting(true);
            const result = await becomeHost();

            if (result.success) {
                toast.success(result.message || "Your Host Request has Been Successful! Please Wait For Admin Approval");
            } else {
                toast.error(result.message || "Failed to Apply Host!");
            }
        } catch {
            toast.error('Request failed');
        } finally {
            setIsRequesting(false);
            setOpen(false);
        }
    }

    return (
        <section className="relative w-full pt-24 pb-12 px-4 md:pt-28 md:pb-16 lg:pt-32 lg:pb-28 overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 ">
                <Image
                    src={bannerImage}
                    alt="Banner Background"
                    fill
                    className="object-cover "
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto relative z-10 px-4">
                {/* Title and CTA Section */}
                <div className="mb-12 flex flex-col justify-center items-center text-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Join Our Growing Event Community
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-6">
                            Discover amazing events and connect with thousands of event enthusiasts worldwide.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/all-events">
                            <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 active:scale-100">
                                <Button
                                    className="px-8 text-sm py-3 text-white rounded-md font-medium bg-transparent border backdrop-blur-md relative z-10 hover:bg-transparent"
                                >
                                    Explore Events
                                </Button>
                            </div>
                        </Link>

                        {/* Become Host Button - Only for CLIENT role */}
                        {userRole === "CLIENT" && (
                            <>
                                <Button
                                    onClick={() => setOpen(true)}
                                    className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-semibold"
                                >
                                    Become a Host
                                </Button>
                                <BecomeHostConfirmationDialog
                                    open={open}
                                    onOpenChange={(v) => setOpen(v)}
                                    isRequesting={isRequesting}
                                    title="Confirm Become Host"
                                    description="This will delete your client data and convert your account to a Host. This action cannot be undone."
                                    onConfirm={confirmHost}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                    {/* Users Stat */}
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            {stats.totalClients}+
                        </div>
                        <div className="text-white/80 font-semibold text-sm md:text-base mt-2">Users</div>
                    </div>

                    {/* Hosts Stat */}
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            {stats.totalHosts}+
                        </div>
                        <div className="text-white/80 font-semibold text-sm md:text-base mt-2">Hosts</div>
                    </div>

                    {/* Total Events Stat */}
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            {stats.totalEvents}+
                        </div>
                        <div className="text-white/80 font-semibold text-sm md:text-base mt-2">Upcoming Events</div>
                    </div>

                    {/* Completed Events Stat */}
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white">
                            {stats.totalCompletedEvents}+
                        </div>
                        <div className="text-white/80 font-semibold text-sm md:text-base mt-2">Completed Events</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingPageBanner;
