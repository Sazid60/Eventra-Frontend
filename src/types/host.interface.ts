import { UserInfo } from "./user.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Host = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  bio: string;
  interests: string[];
  location: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserInfo;
  events?: any[];     
  income: number;
  rating?: number | null;
  ratingCount: number;
};
