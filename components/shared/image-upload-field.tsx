"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, Loader2, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resolveMediaUrl } from "@/lib/media-url";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
  required?: boolean;
  optional?: boolean;
  folder?: string;
}

export function ImageUploadField({ label, value, onChange, onUpload, required, optional }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const previewSrc = resolveMediaUrl(value);

  useEffect(() => {
    setPreviewError(false);
  }, [value]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange(url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="text-sm text-muted mb-2 block">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {optional && !required && <span className="text-muted/70 ml-1 text-xs">(optional)</span>}
      </label>

      {value && (
        <div className="relative mb-3 h-32 w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          {!previewError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted p-4 text-center">
              Preview unavailable — check storage link on server
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setShowUrl(!showUrl)}>
          <Link2 className="h-4 w-4" /> {showUrl ? "Hide URL" : "Paste URL"}
        </Button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {showUrl && (
        <Input
          placeholder="https://..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {!value && required && (
        <p className="text-xs text-muted mt-1">Image is required — upload or paste a URL</p>
      )}
      {!value && optional && !required && (
        <p className="text-xs text-muted mt-1">You can skip this or upload later</p>
      )}
    </div>
  );
}
