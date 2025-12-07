"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminProfile, ClientProfile, HostProfile } from "@/types/profile.interface";
import EditClientProfileForm from "./EditClientProfileForm";
import EditAdminProfileForm from "./EditAdminProfileForm";
import EditHostProfileForm from "./EditHostProfileForm";


interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    role: "ADMIN" | "HOST" | "CLIENT";
    profile: AdminProfile | HostProfile | ClientProfile;
    email: string;
}

export default function EditProfileDialog({
    open,
    onClose,
    role,
    profile,
    email,
}: EditProfileDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                {role === "ADMIN" && (
                    <EditAdminProfileForm
                        profile={profile as AdminProfile}
                        email={email}
                        onClose={onClose}
                    />
                )}

                {role === "HOST" && (
                    <EditHostProfileForm
                        profile={profile as HostProfile}
                        email={email}
                        onClose={onClose}
                    />
                )}

                {role === "CLIENT" && (
                    <EditClientProfileForm
                        profile={profile as ClientProfile}
                        email={email}
                        onClose={onClose}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
