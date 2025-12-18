"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminProfile } from "@/types/profile.interface";
import { Mail, Phone, Shield } from "lucide-react";
import Image from "next/image";
import EditProfileDialog from "./EditProfileDialog";

interface AdminProfileCardProps {
    profile: AdminProfile;
    email: string;
    status: string;
}

export const AdminProfileCard = ({
    profile,
    email,
    status,
}: AdminProfileCardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full md:max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header Section */}
            <div className="relative flex flex-col items-center pt-12 pb-8 ">
                <div className="absolute top-4 right-4">
                    <Button
                        onClick={() => setOpen(true)}
                        size="sm"
                        className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium px-4 py-1 rounded-full shadow"
                    >
                        Edit
                    </Button>
                </div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-700 shadow-xl mb-4">
                    <Image
                        src={profile.profilePhoto}
                        alt={profile.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight drop-shadow-lg">
                    {profile.name}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <span className="text-base text-slate-500 dark:text-slate-400 font-semibold">
                        Administrator
                    </span>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold mt-2 shadow">
                    <span className="h-2 w-2 bg-green-500 rounded-full" />
                    Status: <span>{status}</span>
                </span>
            </div>

            {/* Details Section */}
            <div className="p-4 md:p-10 space-y-4 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email */}
                    <div className="flex gap-4 items-center border rounded-xl p-4 shadow">
                        <div className="shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center">
                            <Mail className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                Email
                            </p>
                            <p className="text-base font-bold text-slate-900 dark:text-slate-200 break-all">
                                {email}
                            </p>
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div className="flex gap-4 items-center border rounded-xl p-4 shadow">
                        <div className="shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center">
                            <Phone className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold">
                                Contact Number
                            </p>
                            <p className="text-base font-bold text-slate-900 dark:text-slate-200">
                                {profile.contactNumber}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileDialog
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={() => setOpen(false)}
                role="ADMIN"
                profile={profile}
                email={email}
            />
        </div>
    );
};
