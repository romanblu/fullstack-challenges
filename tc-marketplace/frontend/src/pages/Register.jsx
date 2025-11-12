import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { registerUser } from "../api/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../features/auth/validation/registerSchema.js";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
    try {
        const { firstName, lastName, email, password, role, phone } = data;
        await registerUser({
            name: `${firstName} ${lastName}`,
            email,
            password,
            role: role || "buyer",
            phone,
        });
        navigate("/login");
    } catch (err) {
        console.error("Registration failed:", err);
    }
  };

    return (
        <section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-md ">
                    <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                        {...register("firstName")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.firstName && (
                            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                        {...register("lastName")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.lastName && (
                            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                        type="email"
                        {...register("email")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                        type="password"
                          {...register("password")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                         {errors.password && (
                            <p className="text-red-600 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                         {...register("phone")}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{errors.phone.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                    </form>

                    <div className="text-sm text-center mt-6 text-gray-700">
                        <p>
                            Already have an account?{" "}
                            <a
                            href="/login"
                            className="text-green-700 font-semibold hover:underline"
                            >
                            Sign In
                            </a>
                        </p>
                        <p className="mt-2">
                            <a href="/register-seller" className="text-green-600 hover:underline">
                            Register as a Lab Partner
                            </a>
                        </p>
                    </div>    
                </div>
            </div>
        </section>
    );
}

export default Register;