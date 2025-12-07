import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["ADMIN", "CLIENT", "HOST"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["ADMIN", "CLIENT", "HOST"],
                },
            ]
        },
    ]
}

export const hostNavItems: NavSection[] = [
    {
        title: "Host",
        items: [
            {
                title: "My Created Events",
                href: "/host/dashboard/manage-events",
                icon: "Calendar",
                roles: ["HOST"],
            },
            {
                title: "All Payments",
                href: `/host/dashboard/payment-history`,
                icon: "File",
                roles: ["HOST"],
            },
        ],
    }
]

export const clientNavItems: NavSection[] = [
    {
        title: "Events",
        items: [
            {
                title: "My Booked Events",
                href: "/dashboard/my-events",
                icon: "Bookmark",
                roles: ["CLIENT"],
            },
        ],
    },
]
export const clientDashboardItems: NavSection[] = [
    {
        title: "Client Dashboard",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "List",
                roles: ["CLIENT"],
            }
        ],
    },
]

export const adminNavItems: NavSection[] = [
    {
        title: "Administration",
        items: [
            // {
            //     title: "Manage Events",
            //     href: "/admin/dashboard/event-application-management",
            //     icon: "List",
            //     roles: ["ADMIN"],
            // },
            {
                title: "Manage Users",
                href: "/admin/dashboard/user-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Manage Hosts",
                href: "/admin/dashboard/host-management",
                icon: "Users",
                roles: ["ADMIN"],
            }
        ],
    }
]
export const adminDashboardItems: NavSection[] = [
    {
        title: "Admin Dashboard",
        items: [
            {
                title: "Host Applications",
                href: "/admin/dashboard/host-application-management",
                icon: "FileText",
                roles: ["ADMIN"],
            },
            {
                title: "Event Applications",
                href: "/admin/dashboard/event-application-management",
                icon: "File",
                roles: ["ADMIN"],
            },
            {
                title: "All Payments",
                href: `/admin/dashboard/payment-history`,
                icon: "File",
                roles: ["ADMIN"],
            },
        ],
    },
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems, ...adminDashboardItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "CLIENT":
            return [...commonNavItems, ...clientNavItems];
        default:
            return [...commonNavItems];
    }
}