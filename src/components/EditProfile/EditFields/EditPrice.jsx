import React, { useMemo, useState } from "react";
import css from "./EditField.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { toastSuccess } from "../../Toast/Toast";
import { useApiErrorHandling } from "../../../hooks/useApiErrors";
import { useStoreRateMutation } from "../../../services/api/authApi/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoWarningOutline } from "react-icons/io5";

const EditPrice = () => {
  const navigate = useNavigate();
  const { value } = useParams();
  const [price, setPrice] = useState(value);

  const initialValues = {
    price: value,
  };

  const [storeRate, res] = useStoreRateMutation();
  const { isLoading, error, isSuccess } = res;

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Changes saved");
      navigate(`/edit/price/${price}`, { replace: true });
    }
  }, [isSuccess]);

  const apiErrors = useApiErrorHandling(error);

  const handleChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setPrice(value);
    setFieldValue(name, value);
  };

  const handleSubmit = async () => {
    await storeRate({ rate: price });
  };

  const priceSchema = Yup.object({
    price: Yup.number("Price must be a number").required("Price is Required"),
  });

  return (
    <div className={css.wrapper}>
      <header style={{ maxWidth: "69%" }}>
        <IoIosArrowBack onClick={() => navigate(-1)} />
        <p>Set Your Price</p>
      </header>

      <Formik
        initialValues={initialValues}
        validationSchema={priceSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, touched, values }) => (
          <Form>
            <div className={css.field}>
              <div className={css.inputContainer}>
                <Input
                  type="text"
                  label="Price"
                  radius="full"
                  name="price"
                  value={price}
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
                      errors.price &&
                        touched.price &&
                        "border border-[#FF2D1B]",
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
                  onChange={(e) => handleChange(e, setFieldValue)}
                />
                {errors.price && touched.price && (
                  <div className="error space-x-1 text-[10px] mt-2 flex justify-end text-[#FF0000]">
                    <IoWarningOutline fontSize={14} />
                    <span>{errors.price}</span>
                  </div>
                )}
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

export default EditPrice;
