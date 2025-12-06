import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { getSingleEvent, getEventParticipants } from "@/services/events/events";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { ApiParticipantInfo } from "@/types/event.interface";
import EventDetailsCard from "@/components/modules/Events/EventDetailsCard";

const formatDate = (iso?: string) => {
    if (!iso) return { date: "", time: "" };
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
        time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    };
};

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    console.log(params)

    const result = await getSingleEvent(id);
    const participantsResult = await getEventParticipants(id);
    const event = result?.data || result || null;
    const participantsList: ApiParticipantInfo[] = participantsResult?.data?.data || [];

    const userInfo = await getUserInfo();
    const userRole = userInfo?.role ?? null;

    console.log(result)

    if (!event) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <h2 className="text-xl font-semibold">Event not found</h2>
            </div>
        );
    }

    const { date, time } = formatDate(event?.date);

    // participantsList is an array of ApiParticipantInfo

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Main Column */}
                <div className="xl:col-span-3">
                    <EventDetailsCard event={event} date={date} time={time} userRole={userRole} />
                </div>

                {/* Right Column - Participants */}
                <aside className="xl:col-span-1">
                    <div className="sticky top-24">
                        <h3 className="text-lg font-semibold mb-3">Participants ({participantsList?.length || 0})</h3>
                        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                            {Array.isArray(participantsList) && participantsList.length > 0 ? (
                                participantsList.map((p: ApiParticipantInfo) => (
                                    <Card key={p.id} className="p-2 bg-background">
                                        <CardContent className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-full">
                                                <Image src={p.client?.profilePhoto || '/images/avatar-placeholder.png'} alt={p.client?.name || 'Client'} width={48} height={48} className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xs font-semibold">{p.client?.name || 'Participant'}</div>
                                                </div>
                                                <div className="mt-2 text-xs text-muted-foreground lowercase">
                                                    {(p.client?.interests || []).slice(0, 6).map((t: string) => <span key={t} className="mr-2 text-orange-700">#{t}</span>)}
                                                </div>
                                            </div>
                                            {p.client?.contactNumber ? (
                                                <a href={`tel:${p.client.contactNumber}`} className="text-sm text-[#45aaa2] flex items-center gap-1" aria-label={`Call ${p.client?.name || 'participant'}`}>
                                                    <Phone className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <button disabled className="text-sm text-muted-foreground flex items-center gap-1" aria-hidden="true">
                                                    <Phone className="w-4 h-4" />
                                                </button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground">No participants yet.</div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default EventDetailsPage;