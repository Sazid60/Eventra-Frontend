"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { HostProfile } from "@/types/profile.interface";
import { updateMyProfile } from "@/services/user/userProfile";

interface EditHostProfileFormProps {
    profile: HostProfile;
    email: string;
    onClose: () => void;
}

export default function EditHostProfileForm({
    profile,
    email,
    onClose,
}: EditHostProfileFormProps) {
    const [state, formAction, isPending] = useActionState(updateMyProfile, null);
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const hasShownToast = useRef(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    useEffect(() => {
        if (!state) {
            hasShownToast.current = false;
            return;
        }

        if (state.success && !hasShownToast.current) {
            hasShownToast.current = true;
            toast.success(state.message || "Profile updated successfully!");
            formRef.current?.reset();
            onClose();
        } else if (!state.success && state.message) {
            toast.error(state.message);
            hasShownToast.current = false;
        }

        if (selectedFile && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [state, selectedFile, onClose]);

    return (
        <form ref={formRef} action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email - Disabled */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={email}
                            disabled
                            className="bg-slate-100 cursor-not-allowed"
                        />
                    </Field>

                    {/* Profile Photo */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
                        <Input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            id="profilePhoto"
                            name="profilePhoto"
                            type="file"
                            accept="image/*"
                        />
                        <FieldDescription className="text-xs text-muted-foreground">
                            Leave empty to keep current photo
                        </FieldDescription>
                        <InputFieldError field="profilePhoto" state={state} />
                    </Field>

                    {/* Contact Number */}
                    <Field>
                        <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="text"
                            placeholder="e.g. +8801XXXXXXXXX"
                            defaultValue={profile.contactNumber || ""}
                        />
                        <InputFieldError field="contactNumber" state={state} />
                    </Field>

                    {/* Location */}
                    <Field>
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="City, Country"
                            defaultValue={profile.location || ""}
                        />
                        <InputFieldError field="location" state={state} />
                    </Field>

                    {/* Bio */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Short bio or description"
                            defaultValue={profile.bio || ""}
                            rows={4}
                        />
                        <InputFieldError field="bio" state={state} />
                    </Field>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#45aaa2] hover:bg-[#3c8f88]"
                    >
                        {isPending ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
