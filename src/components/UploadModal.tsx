import { useEffect, useState } from 'react';
import { X, FileText, Upload, Sparkles, CheckCircle, Loader2 } from 'lucide-react';
import type { UploadedFile } from '../types';
import { fakeFileNames } from '../data/seedData';

interface UploadModalProps {
  onClose: () => void;
  onProcessingComplete: () => void;
}

const processingSteps = [
  'Uploading documents...',
  'Extracting text with OCR...',
  'Identifying invoice fields...',
  'Parsing vendor information...',
  'Calculating markup rates...',
  'Validating extracted data...',
  'Finalizing results...',
];

export function UploadModal({ onClose, onProcessingComplete }: UploadModalProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDropzone, setShowDropzone] = useState(true);

  const startUpload = () => {
    setShowDropzone(false);
    setIsProcessing(true);
    
    setFiles(fakeFileNames.map(name => ({
      name,
      status: 'uploading',
      progress: 0,
    })));
  };

  useEffect(() => {
    if (!isProcessing) return;

    const updateFiles = () => {
      setFiles(prev => prev.map((file, idx) => {
        if (file.status === 'uploading') {
          const newProgress = Math.min(file.progress + Math.random() * 30 + 10, 100);
          if (newProgress >= 100) {
            return { ...file, status: 'processing', progress: 100 };
          }
          return { ...file, progress: newProgress };
        }
        if (file.status === 'processing') {
          const processingTime = 800 + idx * 400;
          setTimeout(() => {
            setFiles(prev => prev.map((f, i) => 
              i === idx && f.status === 'processing' 
                ? { ...f, status: 'complete' } 
                : f
            ));
          }, processingTime);
        }
        return file;
      }));
    };

    const interval = setInterval(updateFiles, 200);

    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    if (!isProcessing) return;

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(stepInterval);
  }, [isProcessing]);

  useEffect(() => {
    const allComplete = files.length > 0 && files.every(f => f.status === 'complete');
    if (allComplete && currentStep >= processingSteps.length - 1) {
      setTimeout(() => {
        onProcessingComplete();
      }, 800);
    }
  }, [files, currentStep, onProcessingComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Upload Invoices</h2>
              <p className="text-sm text-slate-500">AI-powered invoice processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showDropzone ? (
            <div 
              onClick={startUpload}
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <p className="text-slate-700 font-medium mb-1">Click to upload invoices</p>
              <p className="text-sm text-slate-500">PDF, PNG, or JPG files supported</p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all">
                Select Files
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Files List */}
              <div className="space-y-3">
                {files.map((file, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-teal-600" />
                        <span className="text-sm font-medium text-slate-700 truncate max-w-[250px]">
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {file.status === 'complete' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          file.status === 'complete' 
                            ? 'bg-emerald-500' 
                            : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {file.status === 'uploading' && 'Uploading...'}
                      {file.status === 'processing' && 'Processing with AI...'}
                      {file.status === 'complete' && 'Complete'}
                    </p>
                  </div>
                ))}
              </div>

              {/* AI Processing Status */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-teal-800">AI Processing</span>
                </div>
                <div className="space-y-2">
                  {processingSteps.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center space-x-2 text-sm transition-all duration-300 ${
                        idx <= currentStep ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {idx < currentStep ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : idx === currentStep ? (
                        <Loader2 className="w-4 h-4 text-teal-600 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                      )}
                      <span className={idx <= currentStep ? 'text-slate-700' : 'text-slate-400'}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
