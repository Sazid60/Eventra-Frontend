/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import Logo from "@/assets/icon/Logo";
import { usePathname, useRouter } from "next/navigation";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import BecomeHostConfirmationDialog from "./BecomeHostConfirmationDialog";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { becomeHost } from "@/services/user/becomeHost";
import { logoutUser } from "@/services/auth/logoutUser";



interface NavbarProps {
  accessToken: string | null;
  role: string | null;
}

const PublicNavbar = ({ accessToken, role }: NavbarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/all-events", role: "COMMON", label: "View All Events" },
    { href: "/created-events", role: "HOST", label: "My Created Events" },
    { href: "/my-booked-events", role: "CLIENT", label: "My Booked Events" },
  ];

  const dashboardRoute =
    accessToken && role ? getDefaultDashboardRoute(role as any) : null;

  // Filter role based routes + append dashboard
  const filteredNav = [
    ...navItems.filter((item) => {
      if (item.role === "COMMON") return true;
      if (!accessToken) return false;
      return item.role === role;
    }),
    ...(accessToken && dashboardRoute
      ? [{ href: dashboardRoute, label: "Dashboard", role }]
      : []),
  ];

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmHost = async () => {
    try {
      setIsRequesting(true);
      const result = await becomeHost();

      console.log(result)

      if (result.success) {
        toast.success(result.message || "Your Host Request has Been Successful! Please Wait For The Approval of the of Admin!");

      } else {
        toast.error(result.message || "Failed to Apply Host!");
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setIsRequesting(false);
      logoutUser()
      handleRefresh();
      setOpen(false);
    }
  }

  const activeClass = (href: string) =>
    pathname.startsWith(href)
      ? "text-[#45aaa2] font-semibold"
      : "text-foreground hover:text-[#45aaa2]";

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between  max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <h1>EVENTRA</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-6 ">
          <nav className="flex items-center space-x-6 text-sm">
            {filteredNav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${activeClass(link.href)} transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            {accessToken && role === "CLIENT" && (
              <Button onClick={() => setOpen(true)} style={{ background: "#45aaa2", color: "#fff" }} className="ml-2 hover:border">
                Become a Host
              </Button>
            )}

            {accessToken ? (
              <LogoutButton />
            ) : (
              <div className="flex space-x-0">
                <Link href="/login">
                  <Button variant="ghost" className="text-[#45aaa2]">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="ghost" className="text-[#45aaa2]">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* become host dialog */}
        <BecomeHostConfirmationDialog
          open={open}
          onOpenChange={(v) => setOpen(v)}
          isRequesting={isRequesting}
          title="Confirm Become Host"
          description="This will delete your client data and convert your account to a Host. This action cannot be undone."
          onConfirm={async () => confirmHost()}
        />

        {/* Mobile Menu */}
        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">

                {filteredNav.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link href={link.href} className={`${activeClass(link.href)} text-sm`}>
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                {accessToken && role === "CLIENT" && (
                  <SheetClose asChild>
                    <Link href="/become-host">
                      <Button style={{ background: "#45aaa2", color: "#fff" }} className="mt-1 w-full xl:w-auto">
                        Become a Host
                      </Button>
                    </Link>
                  </SheetClose>
                )}

                {accessToken ? (
                  <SheetClose asChild>
                    <LogoutButton />
                  </SheetClose>
                ) : (
                  <div className="border-t pt-4 flex space-y-4 space-x-4">
                    <SheetClose asChild>
                      <Link href="/login" className="text-lg font-medium text-[#45aaa2]">
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/register" className="text-lg font-medium text-[#45aaa2]">
                        Register
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
