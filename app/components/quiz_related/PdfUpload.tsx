"use client";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";

interface PdfUploadProps {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  onGenerate: () => void;
}

export default function PdfUpload({ pdfFile, setPdfFile, onGenerate }: PdfUploadProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

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
      <UploadCloud className="h-10 w-10 text-primary dark:text-yellow-400" />
      <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
        Upload PDF (optional)
      </label>

      <input
        ref={fileUploadRef}
        type="file"
        accept="application/pdf"
        onChange={handleUploadPdf}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />

      {isUploadSuccessful && (
  <div className="flex items-center justify-between mt-2">
    <p className="text-sm text-green-600 dark:text-green-400">
      ✅ Uploaded: {pdfFile?.name}
    </p>

    <button
      onClick={() => {
        setPdfFile(null);
        setIsUploadSuccessful(false);
        if (fileUploadRef.current) {
          fileUploadRef.current.value = "";
        }
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-white bg-red-500 dark:bg-red-600 px-3 py-1.5 rounded-md hover:bg-red-900 dark:hover:bg-red-700 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-400 focus:ring-offset-1 cursor-pointer"
    >
      Remove
    </button>
  </div>
)}
      <button
        onClick={() => {
          if (!pdfFile) return toast.error("Upload a PDF first!");
          onGenerate();
        }}
        className="text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-800 active:scale- dark:hover:bg-blue-600 transition-all mt-3 w-full cursor-pointer"
      >
        Generate Questions
      </button>
    </div>
  );
}
