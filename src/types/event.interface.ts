import { Client } from "./client.interface";

export type ApiEventHost = {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber?: string;
    bio: string;
    interests: string[];
    location: string;
    income: number;
    rating: number | null;
    ratingCount: number;
};

export type ApiEvent = {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    location: string;
    joiningFee: number;
    image: string;
    capacity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    hostId: string;
    host: ApiEventHost
};

export default ApiEvent;


export interface IBookedEvent {
    id: string
    transactionId: string
    eventId: string
    clientId: string
    createdAt: string
    participantStatus: string
    event: ApiEvent
    client: Client
}

export type ApiParticipantClient = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber?: string | null;
    location?: string | null;
    bio?: string | null;
    interests?: string[];
};

export type ApiParticipantInfo = {
    id: string;
    joinedAt: string;
    clientId: string;
    client: ApiParticipantClient;
};

export type ApiParticipantInfoList = ApiParticipantInfo[];