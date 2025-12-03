/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"


import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { UserInfo } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";


export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.client?.name || result.data.host?.name || result.data.name || "Unknown User",
            profilePhoto: result.data.admin?.profilePhoto || result.data.client?.profilePhoto || result.data.host?.profilePhoto || result.data.profilePhoto,
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "CLIENT",
        };
    }

}