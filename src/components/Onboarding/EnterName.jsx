import React, { useMemo, useState } from "react";
import css from "./Onboarding.module.scss";
import logo from "../../assets/logo.svg";
import { Input } from "@nextui-org/react";
import warning from "../../assets/warning.png";
import { IoWarningOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import ApiErrorDisplay from "../../hooks/ApiErrorDisplay";

const EnterName = ({
  userNameRef,
  paginate,
  userName,
  setUserName,
  errorUserName,
  successUserName,
  storeUserName,
}) => {
  const maxLength = 30;
  const [customError, setCustomError] = useState(false);

  const apiErrors = useApiErrorHandling(errorUserName);

  useMemo(() => {
    if (errorUserName && apiErrors && apiErrors.length > 0) {
      setCustomError(true);
    }
  }, [apiErrors, errorUserName]);

  const initialValues = {
    userName: userName,
  };

  const handleChange = (e, setFieldValue) => {
    setCustomError(false);
    const { value, name } = e.target;
    if (value.length <= maxLength) {
      setUserName(value);
      setFieldValue(name, value);
    }
  };

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

  const handleSubmit = async (values) => {
    const { data } = await storeUserName({ username: values.userName });

    if (data?.success) {
      paginate(1);
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={userNameSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched, values }) => (
          <Form>
            <div className={css.input}>
              <Input
                label="Username"
                radius="full"
                name="userName"
                required
                value={userName}
                onChange={(e) => handleChange(e, setFieldValue)}
                maxLength={maxLength}
                classNames={{
                  label: "text-[#A1A3A7]",
                  input: [
                    "bg-[#292734]",
                    "text-white/90",
                    "placeholder:text-[#A1A3A7]",
                    "hover:bg-[#292734]",
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
              />
              {errors.userName && touched.userName && (
                <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                  <IoWarningOutline fontSize={14} />
                  <span>{errors.userName}</span>
                </div>
              )}

              {/* Error from Backend  */}
              {customError && (
                <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                  <IoWarningOutline fontSize={14} />
                  {apiErrors.map((error, index) => (
                    <span key={index}>{error}</span>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="hidden" ref={userNameRef}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EnterName;
