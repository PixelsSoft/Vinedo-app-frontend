import React, { useMemo, useState } from "react";
import css from "./EditField.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { useStoreBioMutation } from "../../../services/api/authApi/authApi";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoWarningOutline } from "react-icons/io5";

const EditBio = () => {
  const navigate = useNavigate();
  const { value } = useParams();
  const maxLength = 150;
  const [tempBio, settempBio] = useState("");
  const initialValues = {
    bio: value || "",
  };

  const [storeBio, res] = useStoreBioMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(() => {
    if (isSuccess) {
      console.log("fdsfsdfsdfds", isSuccess);

      toastSuccess("Changes saved");
      navigate(`/edit/bio/${tempBio}`, { replace: true });
    } else if (error) {
      toastError("cannot save changes");
    }
  }, [isSuccess, error]);

  const apiErrors = useApiErrorHandling(error);

  const handleChange = (e, setFieldValue) => {
    localStorage.removeItem("bio");
    const { value, name } = e.target;
    settempBio(value);
    if (value.length <= maxLength) {
      setFieldValue(name, value);
    }
  };

  const handleSubmit = async (values) => {
    await storeBio({ description: values.bio });
    localStorage.setItem("bio", JSON.stringify(values.bio));
  };

  const bioSchema = Yup.object({
    bio: Yup.string()
      .min(3, "Bio must be at least 3 characters")
      .max(255, "Maximum characters are 255")
      .required("Bio is Required"),
  });

  return (
    <div className={css.wrapper}>
      <header>
        <div className={css.backButton}>
          <IoIosArrowBack onClick={() => navigate(-1)} />
        </div>
        <p>bio</p>
      </header>

      <Formik
        initialValues={initialValues}
        validationSchema={bioSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched, values }) => (
          <Form>
            <div className={css.field}>
              <div className={css.inputContainer}>
                <Input
                  type="text"
                  label="Bio"
                  radius="full"
                  name="bio"
                  value={values.bio}
                  size="lg"
                  autoComplete="off"
                  classNames={{
                    label:
                      "text-[#A1A3A7] text-small group[data-has-value=true] group-data-[has-value=true]:text-[#A1A3A7]",
                    input: [
                      "bg-[#292734]",
                      "text-white/85",
                      "placeholder:text-[#A1A3A7]",
                      "hover:bg-[#292734]",
                      "text-small",
                      "group[data-has-value=true] group-data-[has-value=true]:text-white",
                    ],
                    innerWrapper: "bg-[#292734] text-white hover:bg-[#292734]",
                    inputWrapper: [
                      "bg-[#292734]",
                      "group-data-[focused=true]:bg-[#292734]",
                      "group-data-[hover=true]:bg-[#292734]",
                      "hover:bg-[#292734]",
                      "focus-within:!bg-[#292734] text-white",
                      "text-white",
                      "group[data-has-value=true] group-data-[has-value=true]:text-white",
                      "!cursor-text",
                      errors.bio && touched.bio && "border border-[#FF2D1B]",
                    ],
                  }}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-[#A1A3A7] text-tiny">{`${values.bio.length}/${maxLength}`}</span>
                    </div>
                  }
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                {errors.bio && touched.bio && (
                  <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                    <IoWarningOutline fontSize={14} />
                    <span>{errors.bio}</span>
                  </div>
                )}
                {/* <div className={css.note}>
                  Bio can contain only letters, numbers, underscores, and
                  periods. Changing your Bio will also change your profile link.
                </div> */}
              </div>
            </div>

            <div className={css.button}>
              <Button
                size="sm"
                type="submit"
                className="bg-transparent"
                isLoading={isLoading}
              >
                Save the Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditBio;
