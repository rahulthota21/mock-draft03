"use client";

import { useState, useRef } from "react";
import { FileIcon, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileChange: (file: File | null) => void;
  className?: string;
}

export function FileUploader({
  accept = "application/pdf",
  maxSize = 5, // Default max size is 5MB
  onFileChange,
  className,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }
    
    // Check file type
    if (accept && !selectedFile.type.match(accept)) {
      setError(`Invalid file type. Please upload ${accept.split('/')[1].toUpperCase()} files only.`);
      return;
    }
    
    // Check file size
    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit.`);
      return;
    }
    
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-6 text-center transition-colors",
            isDragging && "border-primary bg-primary/5",
            error && "border-destructive",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="hidden"
            ref={inputRef}
          />
          <div className="flex flex-col items-center gap-2">
            <UploadCloud 
              className={cn(
                "h-10 w-10 text-muted-foreground",
                isDragging && "text-primary"
              )}
            />
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">
                Drag & drop or{" "}
                <span 
                  className="text-primary cursor-pointer"
                  onClick={() => inputRef.current?.click()}
                >
                  browse
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {accept.split('/')[1].toUpperCase()} files only, {maxSize}MB max
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
            <FileIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)}MB
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}