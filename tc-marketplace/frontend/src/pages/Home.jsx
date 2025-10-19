import React from "react";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Features from "../components/Features";
import PlantsCategories from "../components/PlantsCategories";
import Footer from "../components/Footer";
import FeaturedPosts from "../components/FeaturedPosts";
import FeaturedProducts from "../components/FeaturedProducts";

const HomePage = () => {
  return (
    <>
        <div className="bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 ">
            <Navbar />
            <div className="container mx-auto max-w-[1100px] px-4">
            <Banner 
              title={"Connecting Tissue Culture Labs Worldwide"} 
              description={"Discover, exchange, and grow verified plant cultures from trusted laboratories across the globe."}
              primaryCta={{text: "Shop Now", link: "/shop"}}
              secondaryCta={{text: "Learn More", link: "/blog"}}
              imageSrc={"https://www.shutterstock.com/image-photo/vase-decorate-plants-flowers-rainy-600nw-1960299640.jpg"}
              imageAlt={"Plants Banner"}
              />
            </div>
        </div>
        <Features />
        <PlantsCategories />
        <FeaturedPosts />
        <FeaturedProducts />
    </>
  );
}

export default HomePage;