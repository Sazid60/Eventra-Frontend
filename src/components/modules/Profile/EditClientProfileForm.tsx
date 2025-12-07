"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputFieldError from "@/components/shared/InputFieldError";
import { ClientProfile } from "@/types/profile.interface";
import { updateMyProfile } from "@/services/user/userProfile";

interface EditClientProfileFormProps {
    profile: ClientProfile;
    email: string;
    onClose: () => void;
}

const interestOptions = [
    "MUSIC", "MOVIE", "THEATER", "COMEDY", "PARTY", "NIGHTLIFE",
    "CONCERT", "FESTIVAL", "SPORTS", "HIKING", "CYCLING", "RUNNING",
    "FITNESS", "CAMPING", "OUTDOOR", "ADVENTURE", "SOCIAL", "NETWORKING",
    "MEETUP", "COMMUNITY", "VOLUNTEERING", "CULTURE", "RELIGION", "FOOD",
    "DINNER", "COOKING", "TASTING", "CAFE", "RESTAURANT", "TECH",
    "WORKSHOP", "SEMINAR", "CONFERENCE", "EDUCATION", "LANGUAGE", "BUSINESS",
    "FINANCE", "ART", "CRAFT", "PHOTOGRAPHY", "PAINTING", "WRITING",
    "DANCE", "GAMING", "ESPORTS", "ONLINE_EVENT", "TRAVEL", "TOUR",
    "ROADTRIP", "OTHER"
];

export default function EditClientProfileForm({
    profile,
    email,
    onClose,
}: EditClientProfileFormProps) {
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
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            defaultValue={profile.name || ""}
                        />
                        <InputFieldError field="name" state={state} />
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

                    {/* Email - Disabled */}
                    <Field>
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

                    {/* Interests */}
                    <Field className="md:col-span-2">
                        <FieldLabel>Interests</FieldLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 max-h-60 overflow-y-auto p-2 border rounded">
                            {interestOptions.map((interest) => (
                                <label key={interest} className="inline-flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        name="interests"
                                        value={interest}
                                        className="h-4 w-4"
                                        defaultChecked={profile.interests?.includes(interest)}
                                    />
                                    <span className="select-none">{interest.toLowerCase()}</span>
                                </label>
                            ))}
                        </div>
                        <FieldDescription className="mt-2 text-xs text-muted-foreground">
                            Choose interests to personalize your experience.
                        </FieldDescription>
                        <InputFieldError field="interests" state={state} />
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
