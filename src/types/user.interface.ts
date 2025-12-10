import { UserRole } from "../lib/auth-utils";
import { IAdmin } from "./admin.interface";
import { Client } from "./client.interface";
import { Host } from "./host.interface";


export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    profilePhoto: string ;
    status:   "ACTIVE" | "SUSPENDED" | "DELETED" | "PENDING";
    admin?: IAdmin;
    client?: Client,
    host?: Host,
    createdAt: string;
    updatedAt: string;
}