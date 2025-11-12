import Navbar from "../components/layout/Navbar";
import Banner from "../components/ui/Banner";
import Features from "../components/shared/Features";
import PlantsCategories from "../components/shared/PlantsCategories";
import FeaturedPosts from "../features/blog/FeaturedPosts";
import FeaturedProducts from "../features/products/FeaturedProducts";
import { useEffect, useState } from "react";
import { getFeaturedPosts } from "../api/blog";
import { getFeaturedProducts } from "../api/product";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [postRes, productRes] = await Promise.all([
          getFeaturedPosts(),
          getFeaturedProducts(),
        ]);

        setPosts(postRes.data);
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error loading homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

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
        <FeaturedPosts featuredPosts={posts}/>
        <FeaturedProducts featuredProducts={products}/>
    </>
  );
}

export default HomePage;