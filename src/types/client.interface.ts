import { UserInfo } from "./user.interface";

export type Client = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  bio: string;
  contactNumber: string;
  location: string;
  interests: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserInfo;
};
