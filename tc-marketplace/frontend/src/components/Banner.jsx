import { Link } from "react-router-dom";
import clsx from 'clsx'

const Banner = ({
    title, 
    description, 
    imageSrc, 
    imageAlt, 
    primaryCta, 
    secondaryCta, 
    theme="green" | "light",
    size="lg" | "md" | "sm"
    }) => {

      const sizeVariants = {
        lg: "h-[70vh] text-4xl sm:text-5xl p-8",
        md: "h-[50vh] text-3xl sm:text-4xl p-6",
        sm: "h-[35vh] text-2xl sm:text-3xl p-4",
      };

      const themeVariants = {
        green: "bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 ",
        light: "bg-white text-gray-800 ",
      }

    return (
        <section className={` px-8 flex flex-col sm:flex-row justify-center items-center gap-6 ${sizeVariants[size]} ${themeVariants[theme]}`  } >
          <div className="text-center flex flex-col items-center justify-center sm:w-1/2 py-8">
            <h1 className="text-4xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg mb-6">
              {description}
            </p>
            <div className="space-x-6 ">
              <Link to={primaryCta.link}  className="bg-slate-200 text-green-700 px-5 py-2 rounded-lg  hover:bg-green-100 hover:scale-105 transition duration-200 shadow-lg hover:shadow-xl">
                {primaryCta.text}
              </Link>
              <Link to={secondaryCta.link} className="border border-white px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">
                {secondaryCta.text}
              </Link>
            </div>
          </div>
            
          <div className="hidden sm:flex sm:w-1/2 justify-center mt-8 h-full">
            <img 
            src={imageSrc} 
            alt={imageAlt}
            className="rounded-t-full shadow-lg object-cover 
              transition-all duration-300"
          />
          </div>
        </section>
    );
}

export default Banner;