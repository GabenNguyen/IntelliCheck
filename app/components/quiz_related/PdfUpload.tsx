"use client";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";

interface PdfUploadProps {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
}

export default function PdfUpload({ pdfFile, setPdfFile }: PdfUploadProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false); // false at the beginning
  const handleUploadPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("PDF file only!");
      return;
    }

    setPdfFile(file);
    setIsUploadSuccessful(!!file);
  };

  return (
    <div className="mb-4">
      <UploadCloud className="h-10 w-10 text-primary" />
      <label className="block mb-2 font-medium">Upload PDF (optional)</label>

      <input
        ref={fileUploadRef}
        type="file"
        accept="application/pdf"
        onChange={handleUploadPdf}
        className="border p-2 rounded w-full cursor-pointer"
      />

      {isUploadSuccessful && (
        <div>
          <p className="text-sm text-green-600 mt-1">
            ✅Uploaded: {pdfFile?.name}
          </p>
          <button
            onClick={() => {
              setPdfFile(null);
              setIsUploadSuccessful(false);
              if (fileUploadRef.current) {
                fileUploadRef.current.value = ""; //clear uploaded file from input field
              }
            }}
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-900 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
