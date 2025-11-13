import * as yup from "yup";

export const registerSellerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
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
    name: yup
    .string()
    .required("Store or business name is required"),
    contactEmail: yup
    .string()
    .email("Invalid email address")
    .required("Contact email is required"),
    contactPhone: yup
    .string()
    .matches(/^[0-9]{8,15}$/, "Phone number must be 8–15 digits")
    .optional(),
    location: yup
    .string()
    .optional(),
    description: yup
    .string()
    .max(300, "Store descriptional must be under 300 characters")
});