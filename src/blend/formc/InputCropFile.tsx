import React, { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import type { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { fm } from "./fm";
import sta from "../../bootstrap/st/sta";
import { getCroppedImage } from "../../helpers/cssm/getCroppedImage";

interface InputCropFileProps {
  name: string;
  formValues: Record<string, any>;
  onChangeForm: (name: string, value: any) => void;
  errors: Record<string, string>;
  label?: string | null;
  id?: string | null;
}

const InputCropFile: React.FC<InputCropFileProps> = ({
  name,
  formValues,
  onChangeForm,
  errors,
  label = null,
  id = null,
}) => {
  const newId = id ?? name;
  const newLabel = label ?? fm.getLabel(name);
  const cropSize = sta.crop[name] ?? sta.crop.default;

  const aspect = cropSize.width / cropSize.height;

  const [crop, setCrop] = useState<Crop>(cropSize);
  const [changedUrl, setChangedUrl] = useState<string>("#");
  const [prevUrl, setPrevUrl] = useState<string>("#");
  const [showModal, setShowModal] = useState(false);
  const [croppedUrl, setCroppedUrl] = useState<string>("");

  const error = errors[name] ?? "";

  useEffect(() => {
    formValues[`${name}_x`] = crop.x;
    formValues[`${name}_y`] = crop.y;
    formValues[`${name}_w`] = crop.width;
    formValues[`${name}_h`] = crop.height;
    setChangedUrl(formValues[`${name}_url`] ?? "#");
    setPrevUrl(formValues[name] ? formValues[name] : "#");
  }, [formValues, crop, name]);

  const handleOnComplete = async (c: Crop, percentCrop: Crop) => {
    formValues[`${name}_x`] = percentCrop.x;
    formValues[`${name}_y`] = percentCrop.y;
    formValues[`${name}_w`] = percentCrop.width;
    formValues[`${name}_h`] = percentCrop.height;

    if (changedUrl !== "#" && percentCrop.width && percentCrop.height) {
      const cropped = await getCroppedImage(changedUrl, percentCrop);
      setCroppedUrl(cropped);
    }
  };

  const onChangeInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeForm(name, e.target.files);
    setShowModal(true);
  };

  return (
    <div className="form-group">
      <label htmlFor={newId}>{newLabel}</label>
      <input
        type="file"
        id={newId}
        name={name}
        accept="image/*"
        onChange={onChangeInputField}
        className="file-input-hidden"
      />
      {
        croppedUrl ?
          <div className="image-preview">
            <label htmlFor={newId}>
              <img src={croppedUrl} alt={`${newLabel} cropped preview`} />
            </label>
          </div>
          :
          <div className="holder">
            <label htmlFor={newId}>Click here to upload an image</label>
          </div>
      }

      {error && <div className="color-red">{error}</div>}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing on content click
          >
            <h3>Crop Image</h3>
            {changedUrl !== "#" && (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={aspect}
                onComplete={handleOnComplete}
              >
                <img src={changedUrl} alt={`${newLabel} preview`} />
              </ReactCrop>
            )}
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputCropFile;
