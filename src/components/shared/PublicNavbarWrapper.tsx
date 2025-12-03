import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import PublicNavbar from "./PublicNavbar";

export default async function PublicNavbarWrapper() {
  const accessToken = await getCookie("accessToken");

  let role: string | null = null;

  if (accessToken) {
    try {
      const user = await getUserInfo();
      const maybeRole = user?.role;
      if (typeof maybeRole === "string") {
        role = maybeRole.toUpperCase();
      }
    } catch {
      role = null;
    }
  }

  return <PublicNavbar accessToken={accessToken} role={role} />;
}
