import * as yup from "yup";

export const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
    phone: yup
    .string()
    .matches(/^[0-9]{8,15}$/, "Phone number must be 8–15 digits")
    .optional(),
    password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});