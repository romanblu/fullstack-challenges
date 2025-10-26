import { useState } from "react";
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const RegisterSeller = () => {
    const [formData, setFormData] = useState({ 
        role: "seller"
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await registerUser(formData)
        }catch(err){
            console.log(err)
        }

    }

return (


<section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
        <Navbar />
        <div className="flex flex-col   min-h-screen">
            
            <div className="mx-auto my-auto bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-5xl flex flex-col">

                {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
                <h1 className="text-3xl font-bold text-green-900 mb-4">Register Lab/Seller</h1>
                <p className="text-gray-700 mb-6">
                Registration form for sellers and Tissue Culture labs
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Contact form */}
                    <div className="">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            
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

                            <textarea placeholder="Seller Bio Description" className="border rounded-md px-3 py-2 h-32 w-full" ></textarea>
                            
                            <button
                                type="submit"
                                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                            >
                                Send 
                            </button>
                        </form>  
                    </div>  
                    {/* FAQ list */}
                    <div className="bg-white px-6 h-full flex flex-col border-l border-gray-300">
                        <h2 className="text-2xl font-semibold text-green-900 mb-4">Aditional Information</h2>
                        <div className="space-y-4 flex-grow">
                            <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">Store Name</label>
                                <input
                                type="text"
                                name="storeName"
                                value={formData.storeName}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Store URL</label>
                                <input
                                type="text"
                                name="slug"
                                value={formData.storeSlug}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Email</label>
                                <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Category</option>
                                    <option value="option1">Plants</option>
                                    <option value="option2">TC Explants</option>
                                    <option value="option3">TC Supplies</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Phone</label>
                                <input
                                type="text"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>
                            
                            
                        </form>  
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}

export default RegisterSeller