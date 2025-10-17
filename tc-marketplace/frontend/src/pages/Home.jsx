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
            <Banner />
            </div>
        </div>
        <Features />
        <PlantsCategories />
        <FeaturedPosts />
        <FeaturedProducts />
        <Footer />
    </>
  );
}

export default HomePage;