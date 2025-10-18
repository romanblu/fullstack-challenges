import { Link } from "react-router-dom";

const Navbar = ({ theme = "green" }) => {
  const isLight = theme === "light";
  
  return (
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
        <div className="hidden sm:flex space-x-6 ">
            <Link to="/shop" className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>Products</Link>
            <Link to="/about" className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>About Us</Link>
            <Link to="/blog" className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>Blog</Link>
            <Link to="/contact" className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>Contact</Link>
        </div>
        <div className="space-x-4 items-center">
            <Link to="/login" className={`hover:${isLight ? 'text-green-600' : 'text-lime-200'}`}>Login</Link>
            <Link to="/signup" className={`${isLight ? 'bg-lime-500 text-green-950' : 'bg-amber-400 text-green-900'} px-2.5 py-1.5 rounded-xl ${isLight ? 'hover:bg-lime-600' : 'hover:bg-lime-200 hover:text-green-950'} duration-200 shadow-lg hover:shadow-xl`}>
              Sign Up
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;