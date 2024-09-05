import * as Yup from "yup";

export const signupSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Maximun characters are 255")
    .required("Name is Required"),
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6)
    .max(255, "Maximun characters are 255")
    .required("Password is Required"),
  confirmPassword: Yup.string().required("Confirm Password is required").oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .max(255, "Maximun characters are 255")
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6)
    .max(255, "Maximun characters are 255")
    .required("Password is Required"),
});

export const bankDetailsSchema = Yup.object({
  accountHolder: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please fill in this field."),
  swift: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please fill in this field."),
  iban: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please fill in this field."),
  address: Yup.string()
    .max(255, "Maximun characters are 255")
    .required("Please fill in this field."),
});
