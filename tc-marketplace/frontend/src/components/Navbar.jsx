import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ theme = "green" }) => {
  const [menuOpen, setMenuOpen] = useState(false);  
  
  const { user, setUser, logout } = useContext(AuthContext)
  
  const toggleMenu = () => setMenuOpen(prev => !prev) 

  const isLight = theme === "light";

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/shop" },
    { name: "Blog", to: "/blog" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const handleLogout = async (e) => {
    e.preventDefault()
    logout()
  }

  console.log("User: ", user)
  return (
<>
    <nav 
      className={`${
        isLight ? "bg-slate-50 text-green-900  " : ""
      } transition-colors duration-300         
        `}
      >
      <div className="flex justify-between items-center px-6 py-3  container max-w-[1100px] mx-auto ">

        {/* Logo */}
        <Link to='/' className={`text-2xl font-bold ${
          isLight ? "text-green-800" : "text-green-100"
        }`}>PlantCellia</Link>

        {/* Nav links */}
        <div className="hidden sm:flex space-x-5 ">
            { navItems.map((item) => (
              <Link  className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`} to={item.to} key={item.to}>{item.name} </Link>
            ))}
            
        </div>
        <div className="hidden sm:flex space-x-4 items-center">
            {user ? <p> Hello {user.name}</p> 
            : <Link to="/login" className={` hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>Login</Link>}
            {user ? <button to="/" onClick={handleLogout} className={`${isLight ? 'text-green-800' : 'text-slate-300'} hover:${isLight ? '' : 'text-gray-400 font-medium transition-colors'} hover:underline`}>
                      Logout
                    </button>
            :<Link to="/register" className={` ${isLight ? 'bg-lime-500 text-green-950' : 'bg-amber-400 text-green-900'} px-2.5 py-1.5 rounded-xl ${isLight ? 'hover:bg-lime-600' : 'hover:bg-lime-200 hover:text-green-950'} duration-200 shadow-lg hover:shadow-xl`}>
              Sign Up
            </Link>}
        </div>
        <button
          className=" z-55 sm:hidden p-2 rounded-lg hover:bg-green-900/30 transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
        

    </nav>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-green-900 text-white px-6 py-4 space-y-3 absolute  w-full z-50">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-green-300 transition"
            >
              {item.name}
            </Link>
        ))}
        {user ?  <Link to="/logout" className="block hover:text-green-300 transition">Logout</Link>
        :<Link to="/signin" className="block hover:text-green-300 transition">Login</Link>}
        {user ? '' :<Link to="register" className="block hover:text-green-300 transition">Register</Link>}
        </div>
      )}
    </>
  );
}

export default Navbar;