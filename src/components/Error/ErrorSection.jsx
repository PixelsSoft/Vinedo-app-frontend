import React from 'react'
import { useRouteError } from "react-router-dom";
import css from "./ErrorSection.module.scss";

const ErrorSection = () => {
      const error = useRouteError();
      console.error(error);

  return (
    <div id="error-page" className={css.wrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorSection