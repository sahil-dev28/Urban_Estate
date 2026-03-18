import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export function PropertyImageUploader({
  value = [],
  onChange = () => {},
  maxFileSize = "MB",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"],
  disabled = false,
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!value) return;
  }, [value]);
  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems);

          if (fileItems.length === 0) {
            onChange(null);
            return;
          }

          const file = fileItems[0]?.file ?? null;
          onChange(file);
        }}
        allowReorder={false}
        acceptedFileTypes={acceptedFileTypes}
        maxFileSize={maxFileSize}
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
        disabled={disabled}
        credits={false}
      />
    </div>
  );
}
