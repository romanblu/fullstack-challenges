import Navbar from "../components/layout/Navbar";
import Banner from "../components/ui/Banner";
import Features from "../components/shared/Features";
import PlantsCategories from "../components/shared/PlantsCategories";
import FeaturedPosts from "../features/blog/FeaturedPosts";
import FeaturedProducts from "../features/products/FeaturedProducts";
import { useHomeData } from "../hooks/useHomeData";
import Loader from "../components/ui/Loader"
import ErrorMessage from "../components/ui/ErrorMessage"


const HomePage = () => {

  const {featuredPosts, featuredProducts, loading, error} = useHomeData()


  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage />
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
        <FeaturedPosts featuredPosts={featuredPosts}/>
        <FeaturedProducts featuredProducts={featuredProducts}/>
    </>
  );
}

export default HomePage;