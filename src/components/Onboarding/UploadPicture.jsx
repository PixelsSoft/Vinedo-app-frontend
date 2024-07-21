import React, { useRef, useState } from 'react'
import css from "./Onboarding.module.scss";
import logo from "../../assets/logo.svg";
import camera from "../../assets/camera.svg";
import { toastError } from '../Toast/Toast';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useApiErrorHandling } from '../../hooks/useApiErrors';
import ApiErrorDisplay from '../../hooks/ApiErrorDisplay';

const UploadPicture = ({
  image,
  setImage,
  imageRef,
  paginate,
  imagePreview,
  setImagePreview,
  errorProfile,
  successProfile,
  storeProfilePic,
}) => {
  const profileRef = useRef();

  const initialValues = {
    image: image,
  };

  const apiErrors = useApiErrorHandling(errorProfile);

  const handleImageChange = (event, setFieldValue) => {
    const files = event.target.files[0];
    const { name } = event.target;
    if (files) {
      if (files.size <= 2 * 1024 * 1024) {
        setImage(files);
        setFieldValue(name, files);

        const reader = new FileReader();

        reader.onloadend = () => {
          // Set the image preview URL
          setImagePreview(reader.result);
        };

        reader.readAsDataURL(files);
      } else {
        // Invalid image size
        toastError("Please select an image smaller than 2 MB.");
        return;
      }
    } else {
    }
  };

  const handleSubmit = async(values) => {

    if(image){
      let formData = new FormData();
      formData.append("profilePicture", values.image);

      const { data } = await storeProfilePic(formData);

      if (data?.success) {
        paginate(1);
      }
    }else{
      paginate(1);
    }

  };

  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>

      <div>
        {/* Display Errors  */}
        <ApiErrorDisplay apiErrors={apiErrors} className="max-w-xs mx-auto" />
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, setFieldValue, touched, values }) => (
          <Form>
            <input
              ref={profileRef}
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e, setFieldValue)}
              style={{ display: "none" }}
              accept="image/*"
            />

            <div className={css.upload}>
              <p>Upload profile picture</p>
              <div
                className={css.uploadBox}
                onClick={() => profileRef.current.click()}
              >
                {imagePreview ? (
                  <img
                    className="h-full w-full object-cover align-middle rounded-full"
                    src={imagePreview}
                    alt=""
                  />
                ) : (
                  <img src={camera} alt="" />
                )}
              </div>
            </div>

            <button type="submit" className="hidden" ref={imageRef}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadPicture