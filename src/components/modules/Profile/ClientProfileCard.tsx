"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClientProfile } from "@/types/profile.interface";
import { Mail, Phone, MapPin, Hash } from "lucide-react";
import Image from "next/image";
import EditProfileDialog from "./EditProfileDialog";

interface ClientProfileCardProps {
    profile: ClientProfile;
    email: string;
    status: string;
}

export const ClientProfileCard = ({
    profile,
    email,
    status,
}: ClientProfileCardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full md:max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">

            <div className="relative flex flex-col items-center pt-10 pb-6">
                <div className="absolute top-4 right-4">
                    <Button
                        onClick={() => setOpen(true)}
                        size="sm"
                        className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium px-4 py-1 rounded-full shadow"
                    >
                        Edit
                    </Button>
                </div>
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-700 shadow mb-4">
                    <Image
                        src={profile.profilePhoto}
                        alt={profile.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {profile.name}
                </h1>
                <div className="text-slate-500 dark:text-slate-400 text-sm gap-2 mt-2">
                    Event Enthusiast
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mt-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full" />
                    Status: <span>{status}</span>
                </span>
            </div>


            <div className="p-4 md:p-10 space-y-4 md:space-y-8">

                {profile.bio && (
                    <div className="border rounded-xl p-4">
                        <p className="text-xs text-slate-400 font-medium mb-2">Bio</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            {profile.bio}
                        </p>
                    </div>
                )}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex gap-4 items-center border rounded-xl p-4 shadow">
                        <div className="shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center">
                            <Mail className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold">Email</p>
                            <p className="text-base font-bold text-slate-900 dark:text-slate-200 break-all">
                                {email}
                            </p>
                        </div>
                    </div>


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


                    <div className="flex gap-4 items-center border rounded-xl p-4 shadow col-span-2">
                        <div className="shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="">
                            <p className="text-xs text-slate-400 font-semibold">Location</p>
                            <p className="text-base font-bold text-slate-900 dark:text-slate-200">
                                {profile.location}
                            </p>
                        </div>
                    </div>
                </div>


                {profile.interests && profile.interests.length > 0 && (
                    <div className="flex gap-4 border rounded-xl p-4">
                        <div className="shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center">
                            <Hash className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium mb-2">
                                Interests
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded"
                                    >
                                        #{interest.toLowerCase()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <EditProfileDialog
                open={open}
                onClose={() => setOpen(false)}
                onSuccess={() => setOpen(false)}
                role="CLIENT"
                profile={profile}
                email={email}
            />
        </div>
    );
};
