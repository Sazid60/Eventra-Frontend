"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createEvent, updateEvent } from "@/services/events/events";
import ApiEvent from "@/types/event.interface";
import Image from "next/image";

interface EventFormProps {
    event?: ApiEvent;
    onSuccess?: () => void;
}

const EVENT_CATEGORIES = [
    "MUSIC",
    "MOVIE",
    "THEATER",
    "COMEDY",
    "PARTY",
    "NIGHTLIFE",
    "CONCERT",
    "FESTIVAL",
    "SPORTS",
    "HIKING",
    "CYCLING",
    "RUNNING",
    "FITNESS",
    "CAMPING",
    "OUTDOOR",
    "ADVENTURE",
    "SOCIAL",
    "NETWORKING",
    "MEETUP",
    "COMMUNITY",
    "VOLUNTEERING",
    "CULTURE",
    "RELIGION",
    "FOOD",
    "DINNER",
    "COOKING",
    "TASTING",
    "CAFE",
    "RESTAURANT",
    "TECH",
    "WORKSHOP",
    "SEMINAR",
    "CONFERENCE",
    "EDUCATION",
    "LANGUAGE",
    "BUSINESS",
    "FINANCE",
    "ART",
    "CRAFT",
    "PHOTOGRAPHY",
    "PAINTING",
    "WRITING",
    "DANCE",
    "GAMING",
    "ESPORTS",
    "ONLINE_EVENT",
    "TRAVEL",
    "TOUR",
    "ROADTRIP",
    "OTHER",
];

const EventForm = ({ event, onSuccess }: EventFormProps) => {
    const isEdit = !!event;
    const [state, formAction, isPending] = useActionState(
        isEdit && event?.id ? updateEvent.bind(null, event.id) : createEvent,
        null
    );
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const successToastShownRef = useRef(false);

    console.log(state);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    // Handle file persistence in input

    // Handle state changes - error toast and success callback
    useEffect(() => {
        if (state?.success && !successToastShownRef.current) {
            successToastShownRef.current = true;
            toast.success(state.message || "Event saved successfully!");
            // Reset form and file on success
            formRef.current?.reset();
            setTimeout(() => {
                setSelectedFile(null);
            }, 0);
            onSuccess?.();
        }

        if (selectedFile && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            fileInputRef.current.files = dataTransfer.files;
        }

        // Reset the toast guard when state becomes falsy so future submissions can show again
        if (!state) {
            successToastShownRef.current = false;
        }
    }, [state, onSuccess, selectedFile]);

    return (
        <form ref={formRef} action={formAction} className="w-full">
            <FieldGroup className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                    {/* Title */}
                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="title">Event Title</FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter event title"
                            defaultValue={state?.formData?.title || (isEdit ? event?.title : "")}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="title" state={state} />
                    </Field>

                    {/* Location */}
                    <Field className="col-span-1">
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="City, Country"
                            defaultValue={state?.formData?.location || (isEdit ? event?.location : "")}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="location" state={state} />
                    </Field>

                    {/* Date */}
                    <Field className="col-span-1">
                        <FieldLabel htmlFor="date">Event Date & Time</FieldLabel>
                        <Input
                            id="date"
                            name="date"
                            type="datetime-local"
                            defaultValue={
                                state?.formData?.date ||
                                (isEdit && event?.date
                                    ? new Date(event.date).toISOString().slice(0, 16)
                                    : "")
                            }
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="date" state={state} />
                    </Field>

                    {/* Capacity */}
                    <Field className="col-span-1">
                        <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            placeholder="Number of attendees"
                            defaultValue={state?.formData?.capacity || (isEdit ? event?.capacity : "")}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="capacity" state={state} />
                    </Field>

                    {/* Joining Fee */}
                    <Field className="col-span-1">
                        <FieldLabel htmlFor="joiningFee">Joining Fee</FieldLabel>
                        <Input
                            id="joiningFee"
                            name="joiningFee"
                            type="number"
                            placeholder="Fee amount"
                            defaultValue={state?.formData?.joiningFee || (isEdit ? event?.joiningFee : "")}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="joiningFee" state={state} />
                    </Field>

                    {/* Event Image */}
                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="image">Event Image</FieldLabel>
                        <Input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="image" state={state} />
                        <div className="mt-3 flex flex-col gap-3">
                            {selectedFile && (
                                <div className="relative w-full h-48 shrink-0">
                                    <Image
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}
                            {isEdit && event?.image && !selectedFile && (
                                <div className="relative w-full h-48 shrink-0">
                                    <Image
                                        src={event.image}
                                        alt="Event image"
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </Field>

                    {/* Categories - checkboxes */}
                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel>Categories</FieldLabel>
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 mt-2">
                            {EVENT_CATEGORIES.map((category) => (
                                <label
                                    key={category}
                                    className="inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value={category}
                                        className="h-4 w-4 accent-[#45aaa2]"
                                        defaultChecked={
                                            state?.formData?.category?.includes(category) ||
                                            (isEdit && event?.category?.includes(category))
                                        }
                                        disabled={isPending}
                                    />
                                    <span className="select-none truncate">{category.toLowerCase()}</span>
                                </label>
                            ))}
                        </div>
                        <InputFieldError field="category" state={state} />
                    </Field>

                    {/* Description */}
                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Event description"
                            defaultValue={state?.formData?.description || (isEdit ? event?.description : "")}
                            disabled={isPending}
                            className="w-full text-sm resize-none min-h-[100px]"
                            rows={3}
                        />
                        <InputFieldError field="description" state={state} />
                    </Field>
                </div>

                {/* Submit Button */}
                <FieldGroup className="mt-5 sm:mt-6 w-full">
                    <Field className="w-full">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium text-sm sm:text-base py-2 sm:py-2.5 rounded-lg transition-colors duration-200"
                        >
                            {isPending
                                ? isEdit
                                    ? "Updating Event..."
                                    : "Creating Event..."
                                : isEdit
                                    ? "Update Event"
                                    : "Create Event"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default EventForm;
