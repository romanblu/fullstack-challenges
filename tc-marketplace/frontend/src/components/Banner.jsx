import { Link } from "react-router-dom";


const Banner = ({title, description, imageSrc, imageAlt, primaryCta, secondaryCta}) => {
    return (
        <section className="h-[70vh] flex px-8 ">
            <div className="flex flex-col justify-center items-center mr-4 sm:w-1/2">
              <div className="text-center ">
                <h1 className="text-4xl font-bold mb-4">
                  {title}
                </h1>
                <p className="text-lg mb-6">
                  {description}
                </p>
              </div>
              <div className="space-x-6 ">
                <Link to={primaryCta.link}  className="bg-slate-200 text-green-700 px-5 py-2 rounded-lg  hover:bg-green-100 hover:scale-105 transition duration-200 shadow-lg hover:shadow-xl">
                  {primaryCta.text}
                </Link>
                <Link to={secondaryCta.link} className="border border-white px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">
                  {secondaryCta.text}
                </Link>
              </div>
            </div>
            
            <div className="hidden sm:flex sm:w-1/2 justify-center mt-8 ">
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