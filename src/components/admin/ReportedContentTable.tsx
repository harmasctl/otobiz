import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";
import { ReportedContent } from "@/hooks/useAdmin";

interface ReportedContentTableProps {
  content: ReportedContent[];
  onHandle: (id: string, action: "approve" | "reject", notes?: string) => void;
}

export function ReportedContentTable({
  content,
  onHandle,
}: ReportedContentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reporter</TableHead>
          <TableHead>Reported User</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {content.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.reporter?.full_name}</TableCell>
            <TableCell>{report.reported_user?.full_name}</TableCell>
            <TableCell>
              <Badge>{report.content_type}</Badge>
            </TableCell>
            <TableCell>{report.reason}</TableCell>
            <TableCell>
              <Badge
                variant={
                  report.status === "pending"
                    ? "secondary"
                    : report.status === "approved"
                      ? "destructive"
                      : "default"
                }
              >
                {report.status}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(report.created_at)}</TableCell>
            <TableCell>
              {report.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onHandle(report.id, "approve")}
                  >
                    Take Action
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onHandle(report.id, "reject")}
                  >
                    Dismiss
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
