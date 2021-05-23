import React from "react";
import DropzoneComponent from "react-dropzone-component";

import { required } from "../helpers/validations";

const Dropzone = ({ children, setImage, checkForErrors }) => {
  const djsConfig = {
    dictDefaultMessage: "",
    addRemoveLinks: false,
    uploadMultiple: false,
    maxFileSize: 5000,
    acceptedFiles: "image/jpeg,image/png,image/xml+svg,image/jpg",
    dictMaxFilesExceeded: "Remove the existing image and try again",
    previewsContainer: false,
    timeout: 300000,
  };

  const componentConfig = {
    iconFiletypes: [".jpg", ".png", ".svg"],
    multiple: false,
    showFiletypeIcon: true,
    postUrl: "no-url",
  };
  const handleFileAdded = (file) => {
    checkForErrors(file);
    setImage(file);
  };
  const eventHandlers = {
    addedfile: handleFileAdded,
  };
  return (
    <div>
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      >
        {children}
      </DropzoneComponent>
    </div>
  );
};

export default Dropzone;
