export interface AdminProfile {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber: string;
    income: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HostProfile {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    bio: string;
    contactNumber: string;
    location: string;
    rating: number;
    ratingCount: number;
    income: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ClientProfile {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    bio: string;
    contactNumber: string;
    location: string;
    interests: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserData {
    id: string;
    email: string;
    role: "ADMIN" | "HOST" | "CLIENT";
    needPasswordChange: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    admin?: AdminProfile;
    host?: HostProfile;
    client?: ClientProfile;
}
