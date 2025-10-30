"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UploadItem {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "completed" | "error";
}

interface UploadContextType {
  uploads: UploadItem[];
  addUpload: (file: File) => string;
  updateProgress: (id: string, progress: number) => void;
  completeUpload: (id: string) => void;
  errorUpload: (id: string) => void;
  completeAllUploading: () => void;
  errorAllUploading: () => void;
  isUploading: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  const addUpload = (file: File) => {
    const id = `${file.name}-${Date.now()}-${Math.random()}`;
    setUploads((prev) => [
      ...prev,
      {
        id,
        name: file.name,
        progress: 0,
        status: "uploading",
      },
    ]);
    return id;
  };

  const updateProgress = (id: string, progress: number) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, progress } : upload,
      ),
    );
  };

  const completeUpload = (id: string) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? { ...upload, status: "completed", progress: 100 }
          : upload,
      ),
    );
  };

  const errorUpload = (id: string) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, status: "error" } : upload,
      ),
    );
  };

  const completeAllUploading = () => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.status === "uploading"
          ? { ...upload, status: "completed", progress: 100 }
          : upload,
      ),
    );
  };

  const errorAllUploading = () => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.status === "uploading" ? { ...upload, status: "error" } : upload,
      ),
    );
  };

  const isUploading = uploads.some((upload) => upload.status === "uploading");

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUploading) {
        e.preventDefault();
        e.returnValue =
          "You have uploads in progress. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isUploading]);

  return (
    <UploadContext.Provider
      value={{
        uploads,
        addUpload,
        updateProgress,
        completeUpload,
        errorUpload,
        completeAllUploading,
        errorAllUploading,
        isUploading,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
}
