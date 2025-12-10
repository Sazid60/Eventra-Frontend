
import { getRecentEvents } from "@/services/events/events";
import EventCard from "@/components/modules/Events/EventCard";
import ApiEvent from "@/types/event.interface";

const HomeEvents = async () => {
    const recentEventsData = await getRecentEvents();
    const events: ApiEvent[] = recentEventsData?.data || [];

    if (!recentEventsData?.success || events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No recent events available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default HomeEvents;