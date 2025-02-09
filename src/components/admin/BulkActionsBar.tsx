import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Trash, Star, CheckCircle, XCircle } from "lucide-react";

interface BulkActionsBarProps {
  selectedIds: string[];
  onAction: (action: string) => void;
  type: "users" | "vehicles";
}

export function BulkActionsBar({
  selectedIds,
  onAction,
  type,
}: BulkActionsBarProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-4">
      <span className="text-sm text-muted-foreground">
        {selectedIds.length} items selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {type === "vehicles" && (
            <>
              <DropdownMenuItem onClick={() => onAction("activate")}>
                <CheckCircle className="mr-2 h-4 w-4" /> Set Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("deactivate")}>
                <XCircle className="mr-2 h-4 w-4" /> Set Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("feature")}>
                <Star className="mr-2 h-4 w-4" /> Feature
              </DropdownMenuItem>
            </>
          )}
          {type === "users" && (
            <>
              <DropdownMenuItem onClick={() => onAction("verify")}>
                <CheckCircle className="mr-2 h-4 w-4" /> Verify
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction("unverify")}>
                <XCircle className="mr-2 h-4 w-4" /> Unverify
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            onClick={() => onAction("delete")}
            className="text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
