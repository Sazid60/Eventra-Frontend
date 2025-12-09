
import { getMyHostedEvents } from "@/services/events/events";
import ApiEvent from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import HostEventCardFilter from "@/components/modules/Events/HostEventCardFilter";
import CreatedEventCard from "@/components/modules/Events/CreatedEventCard";
import AddEventButton from "@/components/modules/Events/AddEventButton";

import { Metadata } from "next";


export const metadata: Metadata = {
    title: "My Created Events - Manage Your Hosted Events | Eventra",
    description: "Manage your hosted events on Eventra. Filter by status, category, or date to organize your events and connect with participants.",
    keywords: ["my created events", "hosted events", "event management", "event organization", "event participation", "community events"],
    authors: [{ name: "Eventra Team" }],
};

const MyCreatedEventsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const hostedEvents = await getMyHostedEvents(queryString);

    const totalPages = Math.ceil(
        (hostedEvents?.data?.meta?.total || 1) / (hostedEvents?.data?.meta?.limit || 1)
    );

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 mt-16 lg:mt-20 ">
                <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
                    {/* flex and justify between */}
                    <div>
                        <h1 className="text-2xl font-semibold mb-6">My Created Events</h1>
                        <p className="text-sm text-muted-foreground mb-6">Manage your hosted events - filter by status, category, or date to organize your events.</p>
                    </div>
                    <AddEventButton />
                </div>
                <HostEventCardFilter />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(hostedEvents?.data?.eventRequests) && (hostedEvents.data.eventRequests as ApiEvent[]).length > 0 ? (
                        (hostedEvents.data.eventRequests as ApiEvent[]).map((ev) => (
                            <CreatedEventCard key={ev.id} event={ev} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-sm text-muted-foreground py-12">No events found.</div>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={hostedEvents?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </>
    );
};

export default MyCreatedEventsPage;