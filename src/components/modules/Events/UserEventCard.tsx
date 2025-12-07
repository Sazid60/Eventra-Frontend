"use client"
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from "lucide-react";
import { IBookedEvent } from "@/types/event.interface";
import { leaveEvent } from "@/services/events/events";
import { toast } from "sonner";
import AddReviewDialog from "./AddReviewDialog";

type UserEventCardProps = {
    event: IBookedEvent;
};

const formatDate = (iso?: string) => {
    if (!iso) return { date: "", time: "" };
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
        time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    };
};

export default function UserEventCard({ event }: UserEventCardProps) {
    // Extract the nested event data
    const eventData = event.event;
    const participantStatus = event.participantStatus;
    const [isPending, setIsPending] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const isCompleted = eventData?.status === "COMPLETED";

    // Check if review was already submitted (initialize once)
    const initialReviewStatus = useMemo(() => {
        if (typeof window === 'undefined') return false;
        const reviewedEvents = localStorage.getItem('reviewedEvents');
        if (reviewedEvents) {
            const reviewed = JSON.parse(reviewedEvents);
            return reviewed.includes(event.transactionId);
        }
        return false;
    }, [event.transactionId]);

    // Set initial review status
    useEffect(() => {
        setHasReviewed(initialReviewStatus);
    }, [initialReviewStatus]);

    const title = eventData?.title || "Untitled Event";
    const image = eventData?.image || "/images/event-placeholder.jpg";
    const categories: string[] = eventData?.category || [];
    const { date, time } = formatDate(eventData?.date);
    const fee = eventData?.joiningFee ?? 0;
    const capacity = eventData?.capacity ?? null;

    // Check if event date has passed
    const isEventPast = useMemo(() => {
        if (!eventData?.date) return false;
        return new Date(eventData.date) < new Date();
    }, [eventData.date]);


    const handleLeave = async () => {
        setIsPending(true);
        try {
            const result = await leaveEvent(event.eventId);

            if (result.success) {
                toast.success("You have left the event successfully");
                setIsPending(false)

            } else {
                toast.error(result.message || "Failed to leave event");
                setIsPending(false)
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
            setIsPending(false)
        }
    }

    const handleAddReview = () => {
        setShowReviewDialog(true);
    };

    const status = useMemo(() => {
        if (eventData?.status) return eventData.status;
        const eventDate = new Date(eventData?.date ?? "");
        return eventDate < new Date() ? "Past" : "Upcoming";
    }, [eventData.status, eventData.date]);

    return (
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
                {/* Left stacked badges: status, capacity, fee, participant status */}
                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">{status}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Capacity: {capacity ?? 'N/A'}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-emerald-600 px-3 py-1 rounded-md">Fee: {fee ? `${fee} BDT` : 'Free'}</Badge>
                    <Badge className={`backdrop-blur-xs px-3 py-1 rounded-md ${participantStatus === 'CONFIRMED' ? 'bg-green-600/80 text-white' :
                        participantStatus === 'LEFT' ? 'bg-red-600/80 text-white' :
                            'bg-gray-600/80 text-white'
                        }`}>{participantStatus}</Badge>
                </div>

                {/* Right stacked small info: location, date, time */}
                <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="text-xs">{eventData?.location || 'TBD'}</span>
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
                    {eventData?.description
                        ? (eventData.description.length > 160
                            ? `${eventData.description.slice(0, 157)}...`
                            : eventData.description)
                        : ""}
                </p>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600">
                            Transaction ID: <br /><span className="mt-1 font-semibold text-foreground">{event.transactionId}</span>
                        </div>
                    </div>
                    <div className="ml-auto">
                        {isCompleted && participantStatus === "CONFIRMED" ? (
                            <Button
                                onClick={handleAddReview}
                                disabled={hasReviewed}
                                className={hasReviewed ? "text-white bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "text-white bg-blue-600 hover:bg-blue-700"}
                            >
                                {hasReviewed ? "Reviewed" : "Add Review"}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleLeave}
                                disabled={participantStatus === "LEFT" || isPending || isEventPast}
                                className={`text-white ${participantStatus === "LEFT" || isPending || isEventPast
                                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {isPending ? "Leaving..." : participantStatus === "LEFT" ? "Left" : isEventPast ? "Event Ended" : "Leave"}
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>

            <AddReviewDialog
                open={showReviewDialog}
                onClose={() => setShowReviewDialog(false)}
                transactionId={event.transactionId}
                onReviewSubmitted={() => setHasReviewed(true)}
            />
        </Card>
    );
}
