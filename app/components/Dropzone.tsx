import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';
import FileUploadIcon from '../images/upload_file.svg';
import FileImage from '../images/file-image.svg';
import RightImage from '../images/tick.svg';
import { useStore } from '../store/courseWork';

interface DropzoneProps {
 
  resetFile: boolean;
}
interface FileData {
  name: string;
  size: number;
}

const Dropzone: React.FC<DropzoneProps> = ({ resetFile }) => {
  const [file, setFile] = useState<FileData | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const setFileData = useStore((state) => state.setFileData);
  const deleteFileData = useStore((state) => state.deleteFileData);
  const [currentFile, setCurrentFile]=useState<any>(null)

  useEffect(() => {
    if (resetFile) {
      setFile(null);
      setUploadProgress(0); 
    }
  }, [resetFile]);

  const saveFileData = (file: File) => {
    const reader = new FileReader();
    reader.onload = function (event: any) {
      const fileData = {
        name: file.name,
        size: file.size,
        content: event.target.result,
        uploadDate: new Date().toISOString(),
      };

      setFileData(fileData);
      setCurrentFile(fileData)
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const pdfFile = acceptedFiles[0];
    const fileSizeLimit = 25 * 1024 * 1024;

    if (pdfFile.type === 'application/pdf') {
      if (pdfFile.size <= fileSizeLimit) {
        setIsUploading(true);
        setUploadProgress(0); // Reset progress when starting a new upload
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = reader.result;
          saveFileData(pdfFile);
          const interval = setInterval(() => {
            setUploadProgress((prev) => {
              if (prev >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                setFile({ name: pdfFile.name, size: pdfFile.size });
                
                return 100; // Ensure progress ends at 100%
              }
              return prev + 10; // Increase progress
            });
          }, 100); // Shorten interval timing for smoother progress
        };
        reader.readAsDataURL(pdfFile);
      } else {
        toast({
          variant: "destructive",
          title: "Error: File Size Limit Exceeded",
          description: "The file size should not exceed 25MB.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error: Incorrect File Type",
        description: "Only PDF files are accepted.",
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: true,
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const removeFile = () => {
    deleteFileData(currentFile.uploadDate)
    setUploadProgress(0); // Reset progress when file is removed
    setCurrentFile(null)
    setFile(null)
  };

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-purple-300 p-3 text-center rounded-md cursor-pointer h-[200px] flex flex-col items-center justify-center"
    >
      <input {...getInputProps()} ref={fileInputRef} />
      {isDragActive ? (
        <p className="text-gray-500">Drop the file here...</p>
      ) : (
        <>
          {!isUploading && !file && (
            <>
              <Image src={FileUploadIcon} alt="Upload Icon" className="mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Drag and drop a PDF</p>
              <p className="text-sm text-gray-400">*Limit 25 MB per file.</p>
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-full text-md"
                onClick={handleButtonClick}
              >
                Upload your file
              </button>
            </>
          )}
        </>
      )}
      <div className="mt-4 w-full">
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        {file && !isUploading && uploadProgress === 100 && (
          <div className="flex justify-center mt-2">
            <div className="flex">
              <div className="text-gray-500 flex items-center gap-2 text-sm border border-slate-400 px-2 w-[fit-content] py-2 rounded-md">
                <Image src={FileImage} alt="File" />
                <Image src={RightImage} alt="File" />
                {file.name}
              </div>
              <div
                className="flex items-center justify-center text-[12px] w-5 h-5 rounded-full mr-auto relative bottom-2 left-[-10px] bg-white border border-slate-400 cursor-pointer"
                onClick={removeFile}
              >
                X
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
