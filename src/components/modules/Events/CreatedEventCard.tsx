"use client"
import Image from "next/image";
import React, { useMemo, useTransition, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Edit, Trash2, CheckCircle } from "lucide-react";
import ApiEvent from "@/types/event.interface";
import { toast } from "sonner";
import { deleteEvent, completeEvent } from "@/services/events/events";
import EventFormDialog from "./EventFormDialog";

type CreatedEventCardProps = {
    event: ApiEvent;
};

const formatDate = (iso?: string) => {
    if (!iso) return { date: "", time: "" };
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
        time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    };
};

export default function CreatedEventCard({ event }: CreatedEventCardProps) {
    const [isPending, startTransition] = useTransition();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const title = event?.title || "Untitled Event";
    const image = event?.image || "/images/event-placeholder.jpg";
    const categories: string[] = event?.category || [];
    const { date, time } = formatDate(event?.date);
    const fee = event?.joiningFee ?? 0;
    const capacity = event?.capacity ?? null;
    const status = event?.status || "PENDING";

    // Check if event is today or in the past
    const isEventTodayOrPast = useMemo(() => {
        if (!event?.date) return false;
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate <= today;
    }, [event.date]);

    // Check if event is strictly in the past (today > eventDate)
    const isEventPast = useMemo(() => {
        if (!event?.date) return false;
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return today > eventDate;
    }, [event.date]);

    // Show "Mark as Complete" button if OPEN or FULL and today or past
    const showMarkComplete = useMemo(() => {
        return (status === "OPEN" || status === "FULL") && isEventTodayOrPast;
    }, [status, isEventTodayOrPast]);

    // For PENDING + past date: show Delete only, hide Update
    const showPendingDeleteOnly = useMemo(() => {
        return status === "PENDING" && isEventPast;
    }, [status, isEventPast]);

    // Delete is allowed for PENDING and REJECTED events
    const isDeleteDisabled = useMemo(() => {
        return status !== "PENDING" && status !== "REJECTED";
    }, [status]);

    // Update is disabled for COMPLETED and REJECTED events
    const isUpdateDisabled = useMemo(() => {
        return status === "COMPLETED" || status === "REJECTED";
    }, [status]);

    const handleUpdate = () => {
        if (isUpdateDisabled) return;
        setIsUpdateModalOpen(true);
    };

    const handleDelete = () => {
        if (isDeleteDisabled || isPending) return;
        startTransition(async () => {
            const result = await deleteEvent(event.id);
            if (result.success) {
                toast.success(result.message || "Event deleted successfully");
                window.location.reload();
            } else {
                toast.error(result.message || "Failed to delete event");
            }
        });
    };

    const handleMarkComplete = () => {
        if (isPending) return;
        startTransition(async () => {
            const result = await completeEvent(event.id);
            if (result.success) {
                toast.success(result.message || "Event marked as complete");
                window.location.reload();
            } else {
                toast.error(result.message || "Failed to mark event as complete");
            }
        });
    };

    return (
        <>
            <Card className="overflow-hidden border rounded-lg p-0 bg-background hover:cursor-pointer hover:scale-101 transition-shadow duration-600 gap-2">
                {/* Image area with overlays */}
                <div className="relative w-full h-56">
                    <div className="relative w-full h-56 overflow-hidden rounded-lg border">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    {/* Left stacked badges: status, capacity, fee */}
                    <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                        <Badge className={`backdrop-blur-xs px-3 py-1 rounded-md ${status === 'OPEN' ? 'bg-green-600/80 text-white' :
                            status === 'FULL' ? 'bg-orange-600/80 text-white' :
                                status === 'COMPLETED' ? 'bg-blue-600/80 text-white' :
                                    status === 'CANCELLED' ? 'bg-red-600/80 text-white' :
                                        status === 'PENDING' ? 'bg-yellow-600/80 text-white' :
                                            'bg-gray-600/80 text-white'
                            }`}>{status}</Badge>
                        <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Capacity: {capacity ?? 'N/A'}</Badge>
                        <Badge className="bg-black/60 backdrop-blur-xs text-emerald-600 px-3 py-1 rounded-md">Fee: {fee ? `${fee} BDT` : 'Free'}</Badge>
                    </div>

                    {/* Right stacked small info: location, date, time */}
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-xs">{event?.location || 'TBD'}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span className="text-xs">{date}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                                <Clock className="w-4 h-4 text-orange-500" />
                                <span className="text-xs">{time}</span>
                            </div>
                        </div>
                    </div>

                    {/* Category strip centered at bottom of image */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-black/90 backdrop-blur-xs px-3 py-2 rounded-full shadow-sm">
                        <div className="flex gap-3 items-center">
                            {categories.slice(0, 6).map((c: string) => (
                                <span key={c} className="text-xs text-orange-700 font-semibold">#{c.toLowerCase()}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content below image */}
                <CardContent className="space-y-2 mb-6 mt-3">
                    <h3 className="text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.8rem]">
                        {event?.description
                            ? (event.description.length > 160
                                ? `${event.description.slice(0, 157)}...`
                                : event.description)
                            : ""}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-600">
                                Event ID: <span className="font-semibold text-foreground">{event.id.slice(0, 8)}...</span>
                            </div>
                        </div>

                        {/* Conditionally show buttons based on status and date */}
                        {showMarkComplete ? (
                            <div className="ml-auto">
                                <Button
                                    size="sm"
                                    onClick={handleMarkComplete}
                                    disabled={isPending}
                                    className="text-sm font-medium px-4 py-2 text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 rounded-md transition-colors duration-200"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {isPending ? "Marking..." : "Mark Complete"}
                                </Button>
                            </div>
                        ) : showPendingDeleteOnly ? (
                            <div className="ml-auto">
                                <Button
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleteDisabled || isPending}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isDeleteDisabled || isPending
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        ) : (
                            <div className="ml-auto flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={handleUpdate}
                                    disabled={isUpdateDisabled}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isUpdateDisabled
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-[#45aaa2] hover:bg-[#3c8f88]"
                                        }`}
                                >
                                    <Edit className="w-4 h-4" />
                                    Update
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleteDisabled || isPending}
                                    className={`text-sm font-medium px-4 py-2 text-white flex items-center gap-2 rounded-md transition-colors duration-200 ${isDeleteDisabled || isPending
                                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <EventFormDialog
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                event={event}
                onSuccess={() => window.location.reload()}
            />
        </>
    );
}