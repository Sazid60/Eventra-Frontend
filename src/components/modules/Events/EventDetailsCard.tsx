"use client"
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock, RefreshCcw } from "lucide-react";
import ApiEvent from "@/types/event.interface";
import { joinEvent, leaveEvent } from "@/services/events/events";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddReviewDialog from "./AddReviewDialog";
import { revalidateAllData } from "@/services/revalidate";

type Props = {
    event: ApiEvent | null;
    date?: string;
    time?: string;
    userRole?: string | null;
    currentParticipantStatus?: string | null;
    transactionId?: string | null;
};

export default function EventDetailsCard({ event, date, time, userRole, currentParticipantStatus, transactionId }: Props) {
    const [isPending, setIsPending] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter();

    // Check if review was already submitted (initialize once)
    const initialReviewStatus = useMemo(() => {
        if (typeof window === 'undefined' || !transactionId) return false;
        const reviewedEvents = localStorage.getItem('reviewedEvents');
        if (reviewedEvents) {
            const reviewed = JSON.parse(reviewedEvents);
            return reviewed.includes(transactionId);
        }
        return false;
    }, [transactionId]);

    // Set initial review status
    useEffect(() => {
        setHasReviewed(initialReviewStatus);
    }, [initialReviewStatus]);

    // Check if event date has passed
    const isEventPast = useMemo(() => {
        if (!event?.date) return false;
        return new Date(event.date) < new Date();
    }, [event?.date]);

    if (!event) return null;
    const isAdminOrHost = userRole === 'ADMIN' || userRole === 'HOST';
    const isParticipantActive = currentParticipantStatus === 'PENDING' || currentParticipantStatus === 'CONFIRMED';
    const canJoin = !currentParticipantStatus || currentParticipantStatus === 'LEFT';
    const isCompleted = event.status === 'COMPLETED';

    const joinDisabled = isPending || isAdminOrHost || event.status !== 'OPEN' || (typeof event.capacity === 'number' && event.capacity <= 0) || !canJoin;
    const leaveDisabled = isPending || isAdminOrHost || isEventPast;
    const isLeaveAction = !canJoin && isParticipantActive;
    const isActionDisabled = isLeaveAction ? leaveDisabled : joinDisabled;

    const activeClass = isLeaveAction ? 'text-white bg-red-500 hover:bg-red-600' : 'text-white bg-[#45aaa2] hover:bg-[#3c8f88]';
    const buttonClass = isActionDisabled ? 'text-white bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : activeClass;

    let buttonLabel = 'Book Event';
    if (isPending) {
        buttonLabel = isLeaveAction ? 'Leaving...' : 'Booking...';
    } else if (isLeaveAction) {
        buttonLabel = isEventPast ? 'Event Ended' : 'Leave Event';
    } else if (event.status !== 'OPEN') {
        buttonLabel = 'Not Available';
    }

    const handleBook = async () => {
        if (!event?.id) return;
        setIsPending(true);
        try {
            const result = await joinEvent(event.id);
            if (result?.success) {
                const payload = result.data ?? result;
                const paymentUrl = payload?.paymentUrl;

                if (paymentUrl) {
                    router.push(paymentUrl);
                }
            } else {
                toast.error(result?.message || "Failed to join event");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    const handleLeave = async () => {
        if (!event?.id) return;
        setIsPending(true);
        try {
            const result = await leaveEvent(event.id);

            if (result.success) {
                toast.success("You have left the event successfully");
                try { router.refresh(); } catch { /* ignore */ }
            } else {
                toast.error(result.message || "Failed to leave event");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="relative w-full rounded-lg overflow-hidden border">
                <div className="relative w-full h-64 md:h-80 ">
                    <Image src={event.image || '/images/event-placeholder.jpg'} alt={event.title || 'Event'} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>

                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">{event.status || 'Upcoming'}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Capacity: {event.capacity ?? 'N/A'}</Badge>
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">Fee: {event.joiningFee ? `${event.joiningFee} BDT` : 'Free'}</Badge>
                </div>

                <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md"><MapPin className="w-4 h-4 text-orange-400" /> <span className="text-xs">{event.location || 'TBD'}</span></div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md"><Calendar className="w-4 h-4 text-orange-400" /> <span className="text-xs">{date}</span></div>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md"><Clock className="w-4 h-4 text-orange-400" /> <span className="text-xs">{time}</span></div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[85%] md:w-2/3">
                    <div className="bg-black/60 backdrop-blur-xs px-4 py-2 rounded-full text-center">
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            {(event.category || []).slice(0, 6).map((c: string) => (
                                <span key={c} className="text-sm text-[#45aaa2] font-semibold">#{c.toLowerCase()}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-[#45aaa2] mb-3">{event.title}</h1>
                <div className="mb-4">
                    <div className=" border rounded-lg p-4 text-sm text-muted-foreground">{event.description || 'No description provided.'}</div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={event.host?.profilePhoto || '/images/avatar-placeholder.png'} alt={event.host?.name || 'Host'} width={40} height={40} className="object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-semibold">Host: {event.host?.name || 'Host'}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1"><Star className="w-4 h-4 text-yellow-400" />{typeof event.host?.rating === 'number' ? event.host.rating.toFixed(1) : '0.0'} ({event.host?.ratingCount ?? 0})</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isCompleted && transactionId && currentParticipantStatus === 'CONFIRMED' ? (
                        <Button
                            onClick={() => setShowReviewDialog(true)}
                            disabled={hasReviewed}
                            className={hasReviewed ? "text-white bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "text-white bg-blue-600 hover:bg-blue-700"}
                        >
                            {hasReviewed ? "Reviewed" : "Add Review"}
                        </Button>
                    ) : (
                        <Button
                            onClick={isLeaveAction ? handleLeave : handleBook}
                            disabled={isActionDisabled}
                            className={buttonClass}
                        >
                            {buttonLabel}
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                            setIsRefreshing(true);
                            await revalidateAllData();
                            const url = new URL(window.location.href);
                            url.searchParams.set('_t', Date.now().toString());
                            window.location.href = url.toString();
                        }}
                        disabled={isRefreshing}
                        className="text-muted-foreground"
                    >
                        <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {transactionId && (
                <AddReviewDialog
                    open={showReviewDialog}
                    onClose={() => setShowReviewDialog(false)}
                    transactionId={transactionId}
                    onReviewSubmitted={() => setHasReviewed(true)}
                />
            )}
        </div>
    );
}
