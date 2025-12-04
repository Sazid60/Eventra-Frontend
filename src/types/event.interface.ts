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
