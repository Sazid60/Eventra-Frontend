"use client"
import Image from "next/image";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock } from "lucide-react";
import ApiEvent, { ApiEventHost } from "@/types/event.interface";
import Link from "next/link";

type Host = ApiEventHost;
type EventCardProps = {
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

export default function EventCard({ event }: EventCardProps) {
    console.log(event)
    const host: Host = (event?.host as Host) || ({} as Host);
    const title = event?.title || "Untitled Event";
    const image = event?.image || "/images/event-placeholder.jpg";
    const categories: string[] = event?.category || [];
    const { date, time } = formatDate(event?.date);
    const fee = event?.joiningFee ?? 0;
    const capacity = event?.capacity ?? null;

    const status = useMemo(() => {
        if (event?.status) return event.status;
        const eventDate = new Date(event?.date ?? "");
        return eventDate < new Date() ? "Past" : "Upcoming";
    }, [event?.status, event?.date]);

    return (
        <Card className="overflow-hidden border rounded-lg p-0 bg-background hover:cursor-pointer hover:scale-101 transition-shadow duration 600 gap-2  ">
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
                    <Badge className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md">{status}</Badge>
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
            <CardContent className="space-y-2 mb-6 mt-3 ">


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
                    <div className="flex items-center gap-3 rounded-md">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src={host.profilePhoto || "/images/avatar-placeholder.png"}
                                alt={host.name || "Host"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-sm font-semibold ">
                                Host : {host.name || "Host"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>
                                    {typeof host.rating === "number"
                                        ? host.rating.toFixed(1)
                                        : "0.0"}{" "}
                                    ({host.ratingCount ?? 0})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* View Details */}
                    <div className="ml-auto">
                        <Link href={`/all-events/${event.id}`} >
                            <Button className="bg-[#45aaa2] text-white border hover:bg-[#3c8f88]">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>

        </Card>
    );
}
