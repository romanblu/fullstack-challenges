import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../api/auth";


const Register = () => {
    const [formData, setFormData] = useState({ firstName: "", lastName:"", email: "", password: "", role:"buyer", phone:"" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, role, phone } = formData;
        try{
            const data = await registerUser({name: `${firstName} ${lastName}`, email, password, role, phone})
            navigate('/login')
        }catch(err){
            console.log(err)
        }
    }


    return (
        <section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
            <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-md ">
                    <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
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
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
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
                        
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                    >
                        Register
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