import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastError } from "../components/Toast/Toast";
import { extractErrors } from "../utils/helpers/helpers";

export const useApiErrorHandling = (error) => {
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState(null);

  useEffect(() => {
    if (error) {

      switch (error.status) {
        case 401:
          navigate("/login");
          break;
        case 422:
          const errors =
            error?.data?.errors && extractErrors(error?.data?.errors);
          errors && setApiErrors(errors);
          break;
        case 403:
          toastError("Action not allowed");
          break;
        case 404:
          navigate("/requestNotFound");
          break;
        case 400:
          toastError("Cannot perform this action");
          break;
        case 500:
          toastError("Could not perform the request. Try later");
          break;

        default:
          toastError("Could not perform the request. Try later");
      }
    }
  }, [error, extractErrors]);

  return apiErrors;
};
