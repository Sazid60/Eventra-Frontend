"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { AdminProfile } from "@/types/profile.interface";
import { updateMyProfile } from "@/services/user/userProfile";

interface EditAdminProfileFormProps {
    profile: AdminProfile;
    email: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function EditAdminProfileForm({
    profile,
    email,
    onSuccess,
    onCancel,
}: EditAdminProfileFormProps) {
    const [state, formAction, isPending] = useActionState(updateMyProfile, null);
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const successToastShownRef = useRef(false);
    const [formValues, setFormValues] = useState({
        contactNumber: profile.contactNumber || "",
        fileToken: "",
    });

    const isDirty = useMemo(() => {
        const baseContact = profile.contactNumber || "";
        return formValues.fileToken !== "" || formValues.contactNumber !== baseContact;
    }, [formValues, profile.contactNumber]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
        setFormValues((prev) => ({ ...prev, fileToken: file ? file.name : "" }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!state) {
            successToastShownRef.current = false;
        }

        if (state?.success && !successToastShownRef.current) {
            successToastShownRef.current = true;
            toast.success(state.message || "Profile updated successfully!");
            formRef.current?.reset();
            setTimeout(() => setSelectedFile(null), 0);
            startTransition(() => {
                setFormValues({
                    contactNumber: profile.contactNumber || "",
                    fileToken: "",
                });
            });
            onSuccess?.();
        }

        if (selectedFile && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [state, onSuccess, selectedFile, profile.contactNumber]);

    useEffect(() => {
        if (state?.formData) {
            startTransition(() => {
                setFormValues((prev) => ({
                    ...prev,
                    contactNumber: state.formData.contactNumber ?? prev.contactNumber,
                }));
            });
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction}>
            <input type="hidden" name="role" value="ADMIN" />
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
                            disabled={isPending}
                        />
                        <FieldDescription className="text-xs text-muted-foreground">
                            Leave empty to keep current photo
                        </FieldDescription>
                        <InputFieldError field="profilePhoto" state={state} />
                    </Field>

                    {/* Contact Number - Only editable field for admin */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="text"
                            placeholder="e.g. +8801XXXXXXXXX"
                            value={formValues.contactNumber}
                            onChange={handleChange}
                            disabled={isPending}
                        />
                        <InputFieldError field="contactNumber" state={state} />
                    </Field>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending || !isDirty}
                        className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white"
                    >
                        {isPending ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
