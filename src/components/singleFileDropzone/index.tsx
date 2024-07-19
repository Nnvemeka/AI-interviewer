"use client";

import { UploadCloudIcon, X } from "lucide-react";
import * as React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type InputProps = {
  width: number;
  height: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: string) => void;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "150px",
  minWidth: "200px",
  borderWidth: "2px",
  borderRadius: "8px",
  borderColor: "#9ca3af",
  borderStyle: "dashed",
  backgroundColor: "#000",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  position: "relative",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
  backgroundColor: "rgba(0, 230, 118, 0.1)",
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "rgba(255, 23, 68, 0.1)",
};

const disabledStyle = {
  backgroundColor: "rgba(55, 65, 81, 0.3)",
  cursor: "default",
  pointerEvents: "none",
};

const activeStyle = {
  borderColor: "#2d3748", // border-2
};

const SingleFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  ({ dropzoneOptions, disabled, onChange }, ref) => {
    const [previewFiles, setPreviewFiles] = React.useState<any[]>();

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        // FileReader
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          if (typeof reader.result === "string") {
            console.log(reader.result);
            onChange && onChange(reader.result!);
          }
        };

        reader.onerror = (error) => {
          console.log("error: " + error);
        };

        setPreviewFiles(
          acceptedFiles?.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
      ...dropzoneOptions,
    });

    const thumbs = previewFiles?.map((file, index) => (
      <div className="fileText" key={index}>
        {file.name}
      </div>
    ));

    // styling
    const dropZoneStyle = React.useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(disabled ? disabledStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isFocused ? activeStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div>
        <div
          {...getRootProps({
            //   @ts-ignore
            style: dropZoneStyle,
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />

          {/* Upload Icon */}
          <div className="container">
            <UploadCloudIcon className="uploadIcon" />
            <div className="text">Drag & drop to upload</div>
            <div className="buttonContainer">
              <button disabled={disabled} className="select">
                select resume
              </button>
            </div>
          </div>
        </div>
        {/* Preview file name */}
        {thumbs}

        {/* Error Text */}
        <div className="errorMessage">{errorMessage}</div>
      </div>
    );
  }
);
SingleFileDropzone.displayName = "SingleFileDropzone";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return <button className="select" ref={ref} {...props} />;
});
Button.displayName = "Button";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default SingleFileDropzone;
