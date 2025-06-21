'use client';

import { FileDown } from 'lucide-react';
import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  maxFileSizeMB?: number;
  acceptedFileTypes?: string[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  maxFileSizeMB = 50,
  acceptedFileTypes = [],
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSizeMB) {
      return `File size must be less than ${maxFileSizeMB}MB`;
    }

    // Check file type if specified
    if (acceptedFileTypes.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedFileTypes.some(type => 
        type.toLowerCase() === fileExtension || 
        file.type.includes(type.replace('.', ''))
      );
      if (!isValidType) {
        return `Please upload a valid file type: ${acceptedFileTypes.join(', ')}`;
      }
    }

    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setUploadedFile(file);
    onFileSelect?.(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
     
      
      <div
        className={`
          relative border border-gray-500 rounded-2xl py-2 text-center transition-all duration-200
          
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">{uploadedFile.name}</p>
              <p className="text-gray-500 text-sm">{formatFileSize(uploadedFile.size)}</p>
            </div>
            <button
              onClick={handleRemoveFile}
              className="px-2 py-1 cursor-pointer text-sm text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-8 h-8 mx-auto   flex items-center justify-center">
              <FileDown />
            </div>
            
            <div>
              <p className=" text-xs md:text-base">
                Drag Your file or{' '}
                <button
                  onClick={handleBrowseClick}
                  className="cursor-pointer underline font-medium"
                >
                  Browse
                </button>
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Max file size {maxFileSizeMB}MB
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          className="hidden"
          accept={acceptedFileTypes.join(',')}
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;