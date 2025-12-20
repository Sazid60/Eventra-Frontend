"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
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
    onCancel?: () => void;
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

const EventForm = ({ event, onSuccess, onCancel }: EventFormProps) => {
    const isEdit = !!event;
    const [state, formAction, isPending] = useActionState(
        isEdit && event?.id ? updateEvent.bind(null, event.id) : createEvent,
        null
    );
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const successToastShownRef = useRef(false);

    const baseValues = useMemo(() => ({
        title: event?.title || "",
        location: event?.location || "",
        date: event?.date ? (() => {
            const d = new Date(event.date);
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');
            const hours = String(d.getUTCHours()).padStart(2, '0');
            const minutes = String(d.getUTCMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        })() : "",
        capacity: event?.capacity !== undefined && event?.capacity !== null ? String(event.capacity) : "",
        joiningFee: event?.joiningFee !== undefined && event?.joiningFee !== null ? String(event.joiningFee) : "",
        description: event?.description || "",
        category: Array.isArray(event?.category) ? event.category : [],
        fileToken: "",
    }), [event]);

    const [formValues, setFormValues] = useState(baseValues);

    useEffect(() => {
        setFormValues(baseValues);
    }, [baseValues]);

    const normalizeCategories = (value: unknown): string[] => {
        if (Array.isArray(value)) return value;
        if (typeof value === "string" && value.length > 0) return [value];
        return [];
    };

    const isDirty = useMemo(() => {
        if (!isEdit) return true;
        const baseCats = (baseValues.category || []).slice().sort().join("|");
        const currentCats = (formValues.category || []).slice().sort().join("|");
        return (
            formValues.fileToken !== "" ||
            formValues.title !== baseValues.title ||
            formValues.location !== baseValues.location ||
            formValues.date !== baseValues.date ||
            formValues.capacity !== baseValues.capacity ||
            formValues.joiningFee !== baseValues.joiningFee ||
            formValues.description !== baseValues.description ||
            currentCats !== baseCats
        );
    }, [baseValues, formValues, isEdit]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
        setFormValues((prev) => ({ ...prev, fileToken: file ? file.name : "" }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryToggle = (category: string) => {
        setFormValues((prev) => {
            const exists = prev.category.includes(category);
            const next = exists ? prev.category.filter((c) => c !== category) : [...prev.category, category];
            return { ...prev, category: next };
        });
    };
    useEffect(() => {
        if (!state) {
            successToastShownRef.current = false;
        }

        if (state?.success && !successToastShownRef.current) {
            successToastShownRef.current = true;
            toast.success(state.message || "Event saved successfully!");
            // Reset form and file on success
            formRef.current?.reset();
            setTimeout(() => {
                setSelectedFile(null);
            }, 0);
            startTransition(() => setFormValues(baseValues));
            onSuccess?.();
        } else if (state && !state.success) {
            toast.error(state.message || "Failed to save event. Please try again.");
        }

        if (selectedFile && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            fileInputRef.current.files = dataTransfer.files;
        }


    }, [state, onSuccess, selectedFile, baseValues]);

    useEffect(() => {
        if (state?.formData) {
            startTransition(() => {
                setFormValues((prev) => ({
                    ...prev,
                    title: state.formData.title ?? prev.title,
                    location: state.formData.location ?? prev.location,
                    date: state.formData.date ?? prev.date,
                    capacity: state.formData.capacity ?? prev.capacity,
                    joiningFee: state.formData.joiningFee ?? prev.joiningFee,
                    description: state.formData.description ?? prev.description,
                    category: normalizeCategories(state.formData.category ?? prev.category),
                }));
            });
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="w-full">
            <FieldGroup className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="title">Event Title</FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter event title"
                            value={formValues.title}
                            onChange={handleChange}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="title" state={state} />
                    </Field>

                    <Field className="col-span-1">
                        <FieldLabel htmlFor="location">Location</FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="City, Country"
                            value={formValues.location}
                            onChange={handleChange}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="location" state={state} />
                    </Field>

                    <Field className="col-span-1">
                        <FieldLabel htmlFor="date">Event Date & Time</FieldLabel>
                        <Input
                            id="date"
                            name="date"
                            type="datetime-local"
                            value={formValues.date}
                            onChange={handleChange}
                            disabled={isPending}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="date" state={state} />
                    </Field>

                    <Field className="col-span-1">
                        <FieldLabel htmlFor="capacity">Capacity</FieldLabel>
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            placeholder="Number of attendees"
                            value={formValues.capacity}
                            onChange={handleChange}
                            disabled={isPending}
                            min={0}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="capacity" state={state} />
                    </Field>

                    <Field className="col-span-1">
                        <FieldLabel htmlFor="joiningFee">Joining Fee</FieldLabel>
                        <Input
                            id="joiningFee"
                            name="joiningFee"
                            type="number"
                            placeholder="Fee amount"
                            value={formValues.joiningFee}
                            onChange={handleChange}
                            disabled={isPending}
                            min={0}
                            className="w-full text-sm"
                        />
                        <InputFieldError field="joiningFee" state={state} />
                    </Field>


                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="image">Event Image</FieldLabel>
                        <Input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            id="image"
                            name="image"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
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
                                        checked={formValues.category.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                        disabled={isPending}
                                    />
                                    <span className="select-none truncate">{category.toLowerCase()}</span>
                                </label>
                            ))}
                        </div>
                        <InputFieldError field="category" state={state} />
                    </Field>

                    <Field className="col-span-1 sm:col-span-2">
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Event description"
                            value={formValues.description}
                            onChange={handleChange}
                            disabled={isPending}
                            className="w-full text-sm resize-none min-h-[100px]"
                            rows={3}
                        />
                        <InputFieldError field="description" state={state} />
                    </Field>
                </div>

                <FieldGroup className="mt-5 sm:mt-6 w-full">
                    <div className="flex gap-3 justify-end">

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
                            disabled={isPending || (isEdit && !isDirty)}
                            className="bg-[#45aaa2] hover:bg-[#3c8f88] text-white font-medium text-sm sm:text-base px-4 py-2 sm:py-2.5 rounded-lg transition-colors duration-200"
                        >
                            {isPending
                                ? isEdit
                                    ? "Updating Event..."
                                    : "Creating Event..."
                                : isEdit
                                    ? "Update Event"
                                    : "Create Event"}
                        </Button>
                    </div>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default EventForm;
