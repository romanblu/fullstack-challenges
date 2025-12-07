import { useState } from "react";
import Navbar from "../components/layout/Navbar"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSellerSchema } from "../features/auth/validation/registerSellerSchema.js";

const RegisterSeller = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSellerSchema),
    });
    
    const onSubmit = async (data) => {
        try {
            await registerUser({...data, role:"seller"});
            navigate("/login");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    const InputField = ({ label, name, register, type = "text", error }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
        type={type}
        {...register(name)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-600"
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
    );

    return (

<section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
        {/* TODO: add store url with slugify and an option to change with validation to check if slug already exists 
            TODO: implement image upload
            TODO: fix error messages not showing
        */}
        <Navbar />
        <div className="flex flex-col gap-[50px] min-h-screen pt-[50px]">
            <div className="mx-auto text-center">
                <h1 className="text-3xl font-bold text-white mb-4 mx-auto">Register Lab/Seller</h1>
                <p className="text-gray-200 mb-6 text-xl mx-auto">
                Registration form for sellers and Tissue Culture labs
                </p>
            </div>
                {/* {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>} */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="mx-auto  bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* right form */}
                            <div>
                                <h1 className="text-2xl font-semibold text-green-900 mb-4">Seller Personal Information</h1>
                                <InputField label="Full Name" name="fullName" register={register} errors={errors.fullName}/>
                                <InputField label="Email" name="email" register={register} type="email" error={errors.email}/>
                                <InputField label="Password" name="password" register={register} type="password" errors={errors.password}/>     
                                <InputField label="Phone" name="phone" register={register} errors={errors.phone} />
                                
                                {/* <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Select an option</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select> */}
                                <label className="block">
                                    <span className="text-gray-700">Add Profile Picture (optional)</span> 
                                    <input
                                        type="file"
                                        name="profile"
                                        className="mt-2 block  text-sm text-gray-700
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-green-600 file:text-white
                                                hover:file:bg-green-700
                                                cursor-pointer"
                                    />
                                </label>

                                <textarea {...register("description")} placeholder="Seller Bio Description" className="border rounded-md px-3 py-2 h-32 w-full mt-5" ></textarea>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                                >
                                    {isSubmitting ? "Registering..." : "Register"} 
                                </button>
                            </div>
                            {/* left form */}
                            <div className="">
                                <h2 className="text-2xl font-semibold text-green-900 mb-4">Aditional Information</h2>
                                <div className="space-y-4 flex-grow">
                                    <InputField label="Store Name" name="name" register={register} errors={errors.storeName}/>
                                    <InputField label="Store URL" name="storeUrl" register={register} errors={errors.storeUrl}/>
                                    <InputField label="Contact Email" name="contactEmail" register={register} errors={errors.contactEmail}/>
                                    <div>
                                        <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="">Category</option>
                                            <option value="option1">Plants</option>
                                            <option value="option2">TC Explants</option>
                                            <option value="option3">TC Supplies</option>
                                        </select>
                                    </div>
                                    <InputField label="ContactPhone" name="contactPhone" register={register} errors={errors.contactPhone}/>
                                    <InputField label="Location" name="location" register={register} errors={errors.location}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>  
            </div>
    </section>
)
}

export default RegisterSeller