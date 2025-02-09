import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils/format";
import { ActivityLog } from "@/hooks/useAdmin";

interface ActivityLogsTableProps {
  logs: ActivityLog[];
}

export function ActivityLogsTable({ logs }: ActivityLogsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.user?.full_name || "Unknown"}</TableCell>
            <TableCell>{log.action}</TableCell>
            <TableCell>
              <pre className="text-xs">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </TableCell>
            <TableCell>{log.ip_address}</TableCell>
            <TableCell>{formatDate(log.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
