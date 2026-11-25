import { useState, useEffect, useRef } from 'react';
import { Download, FileText, Trash2, Upload, X } from 'lucide-react';
import { ProfileIdentity } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  identity: ProfileIdentity;
  onClose: () => void;
  onAttachResume: (fileName: string | null, dataUrl: string | null) => void;
}

export function ResumeModal({
  isOpen,
  identity,
  onClose,
  onAttachResume,
}: ResumeModalProps) {
  const [staticResumeExists, setStaticResumeExists] = useState(false);
  const [checkingStatic, setCheckingStatic] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setCheckingStatic(true);

    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (!cancelled) {
          setStaticResumeExists(res.ok && contentType.includes('pdf'));
          setCheckingStatic(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStaticResumeExists(false);
          setCheckingStatic(false);
        }
      });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      cancelled = true;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasUploadedResume = Boolean(identity.resumeDataUrl && identity.resumeFileName);
  const canDownload = hasUploadedResume || staticResumeExists;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Please select a PDF file (.pdf).');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setUploadError('Please keep the browser-attached resume under 3 MB (or place resume.pdf in /public).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAttachResume(file.name, reader.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Could not read the selected file.');
    };
    reader.readAsDataURL(file);
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    if (hasUploadedResume && identity.resumeDataUrl) {
      link.href = identity.resumeDataUrl;
      link.download = identity.resumeFileName || 'resume.pdf';
    } else if (staticResumeExists) {
      link.href = '/resume.pdf';
      link.download = 'resume.pdf';
    } else {
      return;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#101219] text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 sm:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-blue-400" aria-hidden="true" />
            <h2 id="resume-modal-title" className="font-display text-base font-semibold">
              Resume PDF
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume dialog"
            className="rounded-lg border border-white/[0.1] p-2 text-slate-300 hover:bg-white/[0.05] hover:text-slate-50 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {checkingStatic ? (
            <p className="text-sm text-slate-400">Checking for an available resume PDF...</p>
          ) : canDownload ? (
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 space-y-3">
              <p className="text-sm font-medium text-slate-100">
                Resume uploaded and ready:{' '}
                <span className="font-mono text-xs text-blue-300 break-all">
                  {hasUploadedResume ? identity.resumeFileName : 'public/resume.pdf'}
                </span>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clicking Download Resume in the hero section or below will download this PDF
                directly.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={triggerDownload}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer min-h-[44px]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </button>
                {hasUploadedResume && (
                  <button
                    type="button"
                    onClick={() => onAttachResume(null, null)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] px-3.5 py-2 text-xs text-slate-300 hover:text-rose-300 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Remove PDF</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-white/[0.08] bg-[#090A0F] p-4 space-y-2">
              <p className="text-sm font-medium text-slate-100">
                No resume PDF is currently available.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                A resume file has not been uploaded yet. Upload a PDF file below to enable instant
                downloading with the Download Resume button, or place a file at{' '}
                <code className="font-mono text-slate-200">public/resume.pdf</code> before
                deploying.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-[#090A0F] px-4 py-2.5 text-xs font-medium text-slate-200 hover:border-white/[0.24] hover:bg-white/[0.03] transition-colors cursor-pointer min-h-[44px]"
            >
              <Upload className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
              <span>{hasUploadedResume ? 'Replace Uploaded Resume PDF' : 'Upload Resume PDF'}</span>
            </button>

            {uploadError && <p className="text-xs text-rose-400">{uploadError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
