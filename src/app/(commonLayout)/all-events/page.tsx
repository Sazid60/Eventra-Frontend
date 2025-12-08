import { getAllEvents } from "@/services/events/events";


import EventCard from '@/components/modules/Events/EventCard';
import ApiEvent from "@/types/event.interface";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
import EventsFilter from "@/components/modules/Events/EventsFilters";

const allEventsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const allEvents = await getAllEvents(queryString);

    console.log(allEvents)


    const totalPages = Math.ceil(
        (allEvents?.data?.meta?.total || 1) / (allEvents?.data?.meta?.limit || 1)
    );

    console.log(totalPages)

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 mt-16 lg:mt-20">
                <h1 className="text-2xl font-semibold mb-6">All Events</h1>
                <p className="text-sm text-muted-foreground mb-6">Browse upcoming events - filter by category, date, or location to find what interests you.</p>

                <EventsFilter />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(allEvents?.data?.allEvents) && (allEvents.data.allEvents as ApiEvent[]).length > 0 ? (
                        (allEvents.data.allEvents as ApiEvent[]).map((ev) => (
                            <EventCard key={ev.id} event={ev} />
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

export default allEventsPage;