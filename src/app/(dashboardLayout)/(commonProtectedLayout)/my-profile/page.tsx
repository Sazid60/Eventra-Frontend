
import { getMe } from "@/services/user/userProfile";
import { AdminProfileCard } from "@/components/modules/Profile/AdminProfileCard";
import { HostProfileCard } from "@/components/modules/Profile/HostProfileCard";
import { ClientProfileCard } from "@/components/modules/Profile/ClientProfileCard";
import { UserData } from "@/types/profile.interface";

const MyProfilePage = async () => {
    const response = await getMe();
    const userData = response.data as UserData;

    return (
        <div className="min-h-screen py-8 px-2">

            {userData.role === "ADMIN" && userData.admin && (
                <AdminProfileCard
                    profile={userData.admin}
                    email={userData.email}
                    status={userData.status}
                />
            )}

            {userData.role === "HOST" && userData.host && (
                <HostProfileCard
                    profile={userData.host}
                    email={userData.email}
                    status={userData.status}
                />
            )}

            {userData.role === "CLIENT" && userData.client && (
                <ClientProfileCard
                    profile={userData.client}
                    email={userData.email}
                    status={userData.status}
                />
            )}
        </div>
    );
};

export default MyProfilePage;