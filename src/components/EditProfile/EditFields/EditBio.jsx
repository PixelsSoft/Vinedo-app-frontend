import React, { useMemo, useState } from "react";
import css from "./EditField.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { useStoreBioMutation, useStoreUserNameMutation } from "../../../services/api/authApi/authApi";
import { toastSuccess } from "../../Toast/Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoWarningOutline } from "react-icons/io5";

const EditBio = () => {
  const navigate = useNavigate();
  const { value } = useParams();
  const maxLength = 150;
  const [userName, setUserName] = useState(value);
  const [updatedBio,setBio] = useState('')

   const initialValues = {
     userName: value,
   };

  const [storeUserName, res] = useStoreBioMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(()=>{
    if(isSuccess){
      toastSuccess("Changes saved");
      navigate(`/edit/username/${userName}`,{replace: true});
    }
  },[isSuccess]);

  const apiErrors = useApiErrorHandling(error);

  const handleChange = (e,setFieldValue) => {
    localStorage.removeItem('bio')
    const { value, name } = e.target;
    if (value.length <= maxLength) {
      setUserName(value);
      setFieldValue(name, value);
    }
  };

  const handleSubmit = async () => {
    //  await storeUserName({ username: userName });
    localStorage.setItem("bio",JSON.stringify(userName))
  };
const updatedbio = localStorage.getItem("bio") || userName
   const userNameSchema = Yup.object({
     userName: Yup.string()
       .min(4, "Username must be at least 3 characters")
       .max(255, "Maximun characters are 255")
       .matches(
         /^[a-zA-Z0-9_.]+$/,
         "Only letters, numbers, underscores, or periods are allowed"
       )
       .required("Username is Required"),
   });

  return (
    <div className={css.wrapper}>
      <header>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Bio</p>
      </header>

      <Formik
        initialValues={initialValues}
        validationSchema={userNameSchema}
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
                  name="userName"
                  value={ updatedbio}
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
                      errors.userName &&
                        touched.userName &&
                        "border border-[#FF2D1B]",
                    ],
                  }}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-[#A1A3A7] text-tiny">{`${userName.length}/${maxLength}`}</span>
                    </div>
                  }
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                {errors.userName && touched.userName && (
                  <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                    <IoWarningOutline fontSize={14} />
                    <span>{errors.userName}</span>
                  </div>
                )}
                <div className={css.note}>
                  Bio can contain only letters, numbers, underscores, and
                  periods. Changing you Bio will also change your profile
                  link.
                </div>
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
