
import { getMyBookedEvents } from "@/services/events/events";


import  { IBookedEvent } from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import UserEventCard from "@/components/modules/Events/UserEventCard";
import UserEventsFilter from "@/components/modules/Events/UserEventFilters";


import { Metadata } from "next";


export const metadata: Metadata = {
    title: "My Booked Events - Browse Your Booked Events | Eventra",
    description: "Browse your booked events on Eventra. Filter by category, date, or location to find events that interest you and connect with other attendees.",
    keywords: ["my booked events", "booked events", "event participation", "event browsing", "community events"],
    authors: [{ name: "Eventra Team" }],
};

const MyBookedEventsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const allEvents = await getMyBookedEvents(queryString);

    console.log(allEvents)

    console.log(allEvents)


    const totalPages = Math.ceil(
        (allEvents?.data?.meta?.total || 1) / (allEvents?.data?.meta?.limit || 1)
    );

    console.log(totalPages)

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 mt-16 lg:mt-20">
                <h1 className="text-2xl font-semibold mb-6">My Booked Events</h1>
                <p className="text-sm text-muted-foreground mb-6">Browse your booked events - filter by category, date, or location to find what interests you.</p>

                <UserEventsFilter />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(allEvents?.data?.data) && (allEvents.data.data as IBookedEvent[]).length > 0 ? (
                        (allEvents.data.data as IBookedEvent[]).map((ev) => (
                            <UserEventCard key={ev.id} event={ev} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-sm text-muted-foreground py-12">No events found.</div>
                    )}
                </div>
            </div>
            <Pagination
                currentPage={allEvents?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </>
    );
};

export default MyBookedEventsPage;