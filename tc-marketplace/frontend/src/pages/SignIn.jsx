import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, loading, error} = useAuth()
   

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await login(formData)
        console.log(user)
        if(user) navigate("/")
    }
    
    return (
        <section className=" bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 px-4">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white text-green-900 rounded-xl shadow-lg p-8 w-full max-w-md ">
                        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

                        {/* {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>} */}

                        <form onSubmit={handleSubmit} className="space-y-5">
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

                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
                        >
                           {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                        </form>

                        <div className="text-sm text-center mt-6 text-gray-700">
                            <p>
                                Don’t have an account?{" "}
                                <a
                                href="/register"
                                className="text-green-700 font-semibold hover:underline"
                                >
                                Sign Up
                                </a>
                            </p>
                            <p className="mt-2">
                                <a href="/forgot-password" className="text-green-600 hover:underline">
                                Forgot Password?
                                </a>
                            </p>
                        </div>    
                    </div>
                </div>
        </section>
    );
}

export default SignIn