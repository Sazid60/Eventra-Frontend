import { Column } from "@/components/shared/ManagementTable";

interface IHostApplicationData {
    id: string;
    userId: string;
    name:string
    status: string;
    createdAt?: string;
    user: {
        id: string;
        email: string;
        status: string;
    };
}

export const hostApplicationColumns: Column<IHostApplicationData>[] = [
    {
        header: "Name",
        accessor: (row) => row.name || "N/A",
    },
    {
        header: "Email",
        accessor: (row) => row.user?.email || "N/A",
    },
    {
        header: "User Status",
        accessor: (row) => row.user?.status || "N/A",
    },
    {
        header: "Application Status",
        accessor: (row) => row.status,
    },
    {
        header: "Applied At",
        accessor: (row) => new Date(row.createdAt || '').toLocaleDateString(),
    },
];
