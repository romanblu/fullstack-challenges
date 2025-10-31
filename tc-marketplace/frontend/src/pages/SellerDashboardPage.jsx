import { Store } from "lucide-react";
import ActiveBar from "../components/shared/ActiveBar";
import Navbar from "../components/layout/Navbar";
import SellerInfoDashboard from "../components/dashboard/SellerInfoDashboard";
import ProductsDashboard from "../components/products/ProductsDashboard";
import { useState } from "react";
import OrdersDashboard from "../components/dashboard/OrdersDashboard";
import StatisticsDashboard from "../components/dashboard/StatisticsDashboard";
import BlogDashboard from "../components/blog/BlogDashboard";
import BlogPostEditor from "../components/blog/BlogPostEditor";
import AddProduct from "../components/products/AddProduct";
import EditProduct from "../components/products/EditProduct";

const SellerDashboardPage = () => {  
    
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPost, setCurrentPost] = useState(null);

    const tabs = [
        { id: "profile" ,label: 'Store Settings', current: true },
        { id: "products" ,label: 'Products', current: false },
        { id: "orders" ,label: 'Orders', current: false },
        { id: "statistics" ,label: 'Statistics', current: false },
        { id: "blog" ,label: 'Blog Posts', current: false }
    ];
    console.log("Selected Product:", selectedProduct);
    const renderContent = () => {
        switch(activeTab) {
            case "profile":
                return <SellerInfoDashboard />;
            case "products":
                return <ProductsDashboard setActiveTab={setActiveTab} setSelectedProduct={setSelectedProduct}/>
            case "editProduct":
                return <EditProduct setActiveTab={setActiveTab} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct}/>
            case "orders":
                return <OrdersDashboard />
            case "statistics":
                return <StatisticsDashboard />
            case "blog":
                return <BlogDashboard setActiveTab={setActiveTab} setCurrentPost={setCurrentPost}/>
            case "newProduct":
                return <AddProduct setActiveTab={setActiveTab} />
            case "newBlogPost":
                return <BlogPostEditor setActiveTab={setActiveTab} />
            case "editBlogPost":
                return <BlogPostEditor setActiveTab={setActiveTab} currentPost={currentPost}/>
            default:
                return <SellerInfoDashboard />;
        }
    }

    return (
        <div >
            <Navbar theme="light"/>
            
            <div className="p-6 bg-slate-100  text-green-950 min-h-screen  mx-auto">
                <div className=" mx-auto">
                    {/* <h1 className="text-3xl font-bold mb-4 text-center ">Seller Dashboard</h1> */}
                    <ActiveBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} header="Seller Dashboard"/>

                   { renderContent () }

                </div>
            </div>
        </div>
    );


}

export default SellerDashboardPage;