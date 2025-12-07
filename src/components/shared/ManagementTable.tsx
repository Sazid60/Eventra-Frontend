"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: string;
}

interface ManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowKey: (row: T) => string;
  emptyMessage?: string;
  isRefreshing?: boolean;
}

function ManagementTable<T>({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  getRowKey,
  emptyMessage = "No records found.",
}: ManagementTableProps<T>) {
  const hasActions = onEdit || onDelete;

  return (
    <div className="rounded-lg border relative p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns?.map((column, colIndex) => (
              <TableHead key={colIndex} className={column.className}>
                  {column.header}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead className="w-[70px]">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item) => (
              <TableRow key={getRowKey(item)}>
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={col.className}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : String(item[col.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ManagementTable;
