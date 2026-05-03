import { useEffect, useRef } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useDocumentStore } from "@/modules/documents/useDocumentStore";

function formatBytes(value: number) {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default function KnowledgeVaultScreen() {
  const token = useAuthStore((state) => state.accessToken);
  const documents = useDocumentStore((state) => state.documents);
  const quota = useDocumentStore((state) => state.quota);
  const status = useDocumentStore((state) => state.status);
  const errorMessage = useDocumentStore((state) => state.errorMessage);
  const loadDocuments = useDocumentStore((state) => state.loadDocuments);
  const uploadDocument = useDocumentStore((state) => state.uploadDocument);
  const deleteDocument = useDocumentStore((state) => state.deleteDocument);
  const uploadProgress = useDocumentStore((state) => state.uploadProgress);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (token) {
      void loadDocuments(token);
    }
  }, [loadDocuments, token]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    try {
      const mimeType = file.type || 
        (file.name.toLowerCase().endsWith(".pdf") 
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

      await uploadDocument(token, {
        uri: URL.createObjectURL(file),
        name: file.name,
        file: file,
        mimeType,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
    
    // reset input to allow re-upload of same file
    event.target.value = '';
  }

  function handleUpload() {
    fileInputRef.current?.click();
  }

  async function handleDelete(documentId: string) {
    if (!token) return;
    try {
      await deleteDocument(token, documentId);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  return (
    <AppShell
      title="Knowledge Vault"
    >
      <div className="flex flex-col w-full max-w-6xl mx-auto p-6">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />

        {/* Header Section */}
        <div className="rounded-3xl bg-slate-900 p-6 mb-6">
          <h1 className="text-xl font-semibold text-white mb-2">
            Uploaded files
          </h1>
          <p className="text-sm leading-6 text-slate-300 mb-4">
            Upload PDF or DOCX files and manage them from one list.
          </p>
          {quota && (
            <p className="text-sm text-slate-200">
              {quota.usedDocuments}/{quota.maxDocuments} documents,{" "}
              {formatBytes(quota.usedBytes)}/{formatBytes(quota.maxBytes)} used
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={status === "uploading"}
          className={`mb-6 overflow-hidden rounded-2xl px-6 py-4 flex items-center justify-center transition ${
            status === "uploading" 
              ? "bg-slate-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "uploading" && (
            <div 
              className="absolute inset-0 bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          )}
          <div className="relative flex items-center">
            <Upload size={20} className="text-white" />
            <span className="ml-2 text-base font-semibold text-white">
              {status === "uploading"
                ? `Uploading ${uploadProgress}%`
                : "Upload File"}
            </span>
          </div>
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {/* Documents List */}
        <div className="flex-1">
          {documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-1">
                        {document.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">
                        {document.originalFilename}
                      </p>
                      <p className="text-xs text-slate-400">
                        {document.sourceType} - {formatBytes(document.byteSize)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        document.status === 'READY' 
                          ? 'bg-green-100 text-green-700'
                          : document.status === 'PROCESSING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {document.status}
                      </span>
                    </div>
                  </div>

                  {document.processingError && (
                    <p className="mt-3 text-sm text-red-600">
                      {document.processingError}
                    </p>
                  )}

                  <button
                    onClick={() => handleDelete(document.id)}
                    className="mt-4 flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 rounded-full transition"
                  >
                    <Trash2 size={14} className="text-red-600 mr-1" />
                    <span className="text-xs font-semibold text-red-700">
                      Delete
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-8 text-center">
              <FileText size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-sm text-slate-500">
                Your uploaded PDFs and DOCX files will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
