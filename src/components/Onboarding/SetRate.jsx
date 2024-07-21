import React, { useState } from "react";
import css from "./Onboarding.module.scss";
import logo from "../../assets/logo.svg";
import { Input } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useApiErrorHandling } from "../../hooks/useApiErrors";
import { useNavigate } from "react-router-dom";
import ApiErrorDisplay from "../../hooks/ApiErrorDisplay";

const SetRate = ({
  rateRef,
  paginate,
  rate,
  setRate,
  errorRate,
  successRate,
  storeRate,
}) => {
  const navigate = useNavigate();
  const initialValues = {
    rate: rate,
  };

  const apiErrors = useApiErrorHandling(errorRate);

  const handleChange = (e, setFieldValue) => {
    const { value, name } = e.target;
    setRate(value);
    setFieldValue(name, value);
  };

  const rateSchema = Yup.object({
    rate: Yup.string()
      .max(255, "Maximun characters are 255")
      .required("Rate is Required"),
  });

  const handleSubmit = async(values) => {

    const { data } = await storeRate({rate: values.rate});

    if(data?.success){
      navigate("/profile")
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

      <div className={css.rate}>
        <p>Set your rate</p>
        <Formik
          initialValues={initialValues}
          validationSchema={rateSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, setFieldValue, touched }) => (
            <Form>
              <div className={css.inputRate}>
                <Input
                  type="number"
                  label="Price"
                  radius="full"
                  required
                  name="rate"
                  value={rate}
                  onChange={(e) => handleChange(e, setFieldValue)}
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
                      errors.rate && touched.rate && "border border-[#FF2D1B]",
                    ],
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-white text-[12px]">
                        <span className="mr-2">€</span>
                      </span>
                    </div>
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-white text-tiny">/month</span>
                    </div>
                  }
                />
                {errors.rate && touched.rate && (
                  <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                    <span>{errors.rate}</span>
                  </div>
                )}

                <div
                  className={`${css.rateValue} scrollbar-hide`}
                >
                  <div className={css.inner}>€ {rate} / month</div>
                </div>
              </div>

              <button type="submit" className="hidden" ref={rateRef}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SetRate;
