import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const Contact = () => {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email } = formData;   
    }


    return (
        <section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
            <Navbar />
            <div className="flex flex-col   min-h-screen">
                
                <div className="mx-auto my-auto bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-lg ">

                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
                    <h1 className="text-3xl font-bold text-green-900 mb-4">Contact Us</h1>
                    <p className="text-gray-700 mb-6">
                    Have questions or need support? Fill out the form below and we'll get back to you promptly.
                    </p>
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
                        
                        <select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <label className="block">
                            <span className="text-gray-700">Attach File (optional)</span>
                            <input
                                type="file"
                                name="attachment"
                                className="mt-2 block  text-sm text-gray-700
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-green-600 file:text-white
                                        hover:file:bg-green-700
                                        cursor-pointer"
                            />
                        </label>

                        <textarea placeholder="Your Message" className="border rounded-md px-3 py-2 h-32 w-full" required></textarea>
                        
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                        >
                            Send 
                        </button>
                    </form>    
                </div>
            </div>
        </section>
    );
}

export default Contact;