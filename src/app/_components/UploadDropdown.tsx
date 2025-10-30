"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Upload, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useUpload } from "~/lib/upload-context";

export function UploadDropdown() {
  const { uploads, isUploading } = useUpload();

  const uploadingCount = uploads.filter((u) => u.status === "uploading").length;
  const completedCount = uploads.filter((u) => u.status === "completed").length;
  const errorCount = uploads.filter((u) => u.status === "error").length;

  if (uploads.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`relative ${isUploading ? "animate-pulse" : ""}`}
        >
          <Upload className="h-4 w-4" />
          {uploadingCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {uploadingCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>
          Upload Progress
          {completedCount > 0 && (
            <span className="ml-2 text-green-600">
              {completedCount} completed
            </span>
          )}
          {errorCount > 0 && (
            <span className="ml-2 text-red-600">{errorCount} failed</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-60 overflow-y-auto">
          {uploads.map((upload) => (
            <DropdownMenuItem
              key={upload.id}
              className="flex flex-col items-start p-3"
            >
              <div className="flex w-full items-center gap-2">
                {upload.status === "uploading" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {upload.status === "completed" && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {upload.status === "error" && (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="flex-1 truncate text-sm">{upload.name}</span>
              </div>
              {upload.status === "uploading" && (
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
