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
        <div className="w-full max-w-2xl mx-auto border rounded-md">
            {/* Header Card */}
            <div className=" rounded-t-2xl pt-8 text-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                            src={profile.profilePhoto}
                            alt={profile.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 pb-2 text-center">
                        <h1 className="text-xl lg:text-3xl font-bold">{profile.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Shield className="h-4 w-4" />
                            <p className="text-slate-100">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details Card */}
            <div className=" rounded-b-2xl shadow-lg p-8 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <span className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-slate-300">
                        Status: <span className="text-green-400">{status}</span>
                    </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 bg-[#45aaa2]/20 rounded-lg flex items-center justify-center">
                            <Mail className="h-5 w-5 text-[#45aaa2]" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">EMAIL</p>
                            <p className="text-sm font-semibold text-slate-200 break-all">{email}</p>
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 bg-[#45aaa2]/20 rounded-lg flex items-center justify-center">
                            <Phone className="h-5 w-5 text-[#45aaa2]" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">CONTACT NUMBER</p>
                            <p className="text-sm font-semibold text-slate-200">{profile.contactNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Update Profile Button */}
                <div className="pt-4 border-t border-slate-700">
                    <Button
                        onClick={() => setOpen(true)}
                        className="w-full bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium"
                    >
                        Edit Profile
                    </Button>
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
