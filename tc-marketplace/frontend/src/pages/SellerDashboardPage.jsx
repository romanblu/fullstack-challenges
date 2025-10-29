import { Store } from "lucide-react";
import ActiveBar from "../components/ActiveBar";
import Navbar from "../components/Navbar";
import SellerInfoDashboard from "../components/SellerInfoDashboard";
import ProductsDashboard from "../components/ProductsDashboard";
import { useState } from "react";
import OrdersDashboard from "../components/OrdersDashboard";
import StatisticsDashboard from "../components/StatisticsDashboard";
import BlogDashboard from "../components/BlogDashboard";
import CreateBlogPost from "../components/CreateBlogPost";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

const SellerDashboardPage = () => {  
    
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedProduct, setSelectedProduct] = useState(null);

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
                return <BlogDashboard setActiveTab={setActiveTab} />
            case "newProduct":
                return <AddProduct setActiveTab={setActiveTab} />
            case "newBlogPost":
                return <CreateBlogPost setActiveTab={setActiveTab} />
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