import React, { useEffect, useMemo, useRef, useState } from "react";
import css from "./SignupForm.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../../../services/api/authApi/authApi";
import { setAuth } from "../../../services/slices/auth/authSlice";
import { toastError } from "../../Toast/Toast";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import ApiErrorDisplay from "../../../hooks/ApiErrorDisplay";
import { signupSchema } from "../../../utils/validation/AuthValidation";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = useState(false);
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const dispatch = useDispatch();
  const [registerUser, result] = useRegisterUserMutation();
  const { isLoading, error, isSuccess } = result;
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const apiErrors = useApiErrorHandling(error);

  useEffect(() => {
    if (isSuccess) {
      navigate("/getStarted");
    }
  }, [isSuccess]);

  const handleSubmit = async (values) => {
    const { data } = await registerUser({
      name: values.userName,
      email: values.email,
      password: values.password,
    });

    if (data?.token) {
      dispatch(setAuth(data?.user));
      localStorage.setItem("vineo_authToken", data?.token);
    }
    
  };

  const handleChange = (e, setFieldValue) => {
    const { value, name } = e.target;
    setFieldValue(name, value);
  };

  const togglePassVisibility = () => {
    passwordRef.current.focus();
    setIsVisiblePass(!isVisiblePass);
  };
  const toggleConfirmPassVisibility = () => {
    confirmPassRef.current.focus();
    setIsVisibleConfirmPass(!isVisibleConfirmPass);
  };

  return (
    <div className="w-screen scrollbar-hide h-screen md:max-w-sm overflow-x-hidden flex justify-center items-center flex-col md:mx-auto">
      <div className={css.container}>
        <header>
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </header>
        <div className={css.heading}>
          <p>Sign up with Email</p>
          <span>
            Start experiencing freedom today by signing up for our app!
          </span>
        </div>

        <div>
          {/* Display Errors  */}
          <ApiErrorDisplay
            apiErrors={apiErrors}
            className="max-w-xs mx-auto -mt-2"
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputContainer}>
                <Input
                  type="text"
                  label="Your Name"
                  radius="full"
                  name="userName"
                  size="lg"
                  autoComplete="off"
                  classNames={{
                    label: "text-[#A1A3A7] text-small",
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
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className={css.errorSpan}
                />
              </div>
              <div className={css.inputContainer}>
                <Input
                  type="email"
                  label="Your Email"
                  radius="full"
                  name="email"
                  size="lg"
                  autoComplete="off"
                  classNames={{
                    label: "text-[#A1A3A7] text-small",
                    input: [
                      "bg-[#292734]",
                      "text-white/90",
                      "placeholder:text-[#A1A3A7]",
                      "hover:bg-[#292734]",
                      "outline-none",
                      "border-none",
                      "group[data-has-value=true] group-data-[has-value=true]:text-white",
                    ],
                    innerWrapper:
                      "bg-[#292734] border-none outline-none text-white hover:bg-[#292734]",
                    inputWrapper: [
                      "bg-[#292734]",
                      "group-data-[focused=true]:bg-[#292734]",
                      "group-data-[hover=true]:bg-[#292734]",
                      "group-data-[focused=true]:border-none",
                      "group-data-[hover=true]:border-none",
                      "hover:bg-[#292734]",
                      "focus-within:!bg-[#292734] text-white",
                      "text-white",
                      "outline-none",
                      "group[data-has-value=true] group-data-[has-value=true]:text-white",
                      "!cursor-text",
                      errors.email &&
                        touched.email &&
                        "border border-[#FF2D1B]",
                    ],
                  }}
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorSpan}
                />
              </div>
              <div className={css.inputContainer}>
                <Input
                  ref={passwordRef}
                  type={isVisiblePass ? "text" : "password"}
                  label="Password"
                  radius="full"
                  name="password"
                  size="lg"
                  autoComplete="off"
                  classNames={{
                    label: "text-[#A1A3A7] text-small",
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
                      errors.password &&
                        touched.password &&
                        "border border-[#FF2D1B]",
                    ],
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePassVisibility}
                    >
                      {isVisiblePass ? (
                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorSpan}
                />
              </div>
              <div className={css.inputContainer}>
                <Input
                  ref={confirmPassRef}
                  type={isVisibleConfirmPass ? "text" : "password"}
                  label="Confirm Password"
                  radius="full"
                  size="lg"
                  autoComplete="off"
                  name="confirmPassword"
                  classNames={{
                    label: "text-[#A1A3A7] text-small",
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
                      errors.confirmPassword &&
                        touched.confirmPassword &&
                        "border border-[#FF2D1B]",
                    ],
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleConfirmPassVisibility}
                    >
                      {isVisibleConfirmPass ? (
                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={css.errorSpan}
                />
              </div>
              <div className={css.actionBtn}>
                <Button
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                >
                  Create an account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
