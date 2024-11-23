import React, { useRef, useState, useEffect } from "react";
import Button from "../../FormElements/Button/Button";

import "./Image.css";

const Image = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewURL] = useState();
  const [isValid, setIsValid] = useState();
  const fileRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
  }, [file]);

  const pickImageHandler = () => {
    fileRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      return;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <>
      <div className="form-control">
        <input
          type="file"
          id={props.id}
          style={{ display: "none" }}
          accept=".jpeg, .png, .jpg"
          ref={fileRef}
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          {previewUrl && (
            <div className="image-upload__preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
          <Button type="button" onClick={pickImageHandler}>
            Pick Image
          </Button>
        </div>
      </div>
    </>
  );
};

export default Image;
