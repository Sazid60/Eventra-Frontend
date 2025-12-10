"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminProfile, ClientProfile, HostProfile } from "@/types/profile.interface";
import EditClientProfileForm from "./EditClientProfileForm";
import EditAdminProfileForm from "./EditAdminProfileForm";
import EditHostProfileForm from "./EditHostProfileForm";
import { useEffect, useRef, useState } from "react";


interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    role: "ADMIN" | "HOST" | "CLIENT";
    profile: AdminProfile | HostProfile | ClientProfile;
    email: string;
}

export default function EditProfileDialog({
    open,
    onClose,
    onSuccess,
    role,
    profile,
    email,
}: EditProfileDialogProps) {
    const [formKey, setFormKey] = useState(0);
    const prevOpenRef = useRef(open);

    useEffect(() => {
        if (!open && prevOpenRef.current) {
            setTimeout(() => setFormKey((prev) => prev + 1), 0);
        }
        prevOpenRef.current = open;
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div key={formKey} className="py-2">
                    {role === "ADMIN" && (
                        <EditAdminProfileForm
                            profile={profile as AdminProfile}
                            email={email}
                            onSuccess={handleSuccess}
                            onCancel={handleClose}
                        />
                    )}

                    {role === "HOST" && (
                        <EditHostProfileForm
                            profile={profile as HostProfile}
                            email={email}
                            onSuccess={handleSuccess}
                            onCancel={handleClose}
                        />
                    )}

                    {role === "CLIENT" && (
                        <EditClientProfileForm
                            profile={profile as ClientProfile}
                            email={email}
                            onSuccess={handleSuccess}
                            onCancel={handleClose}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
