import { Store } from "lucide-react";
import ActiveBar from "../components/ActiveBar";
import Navbar from "../components/Navbar";
import SellerInfoDashboard from "../components/SellerInfoDashboard";
import ProductsDashboard from "../components/ProductsDashboard";
import { useState } from "react";
import OrdersDashboard from "../components/OrdersDashboard";
import StatisticsDashboard from "../components/StatisticsDashboard";
import BlogDashboard from "../components/BlogDashboard";
import AddBlogPost from "../components/AddBlogPost";
import AddProduct from "../components/AddProduct";

const SellerDashboardPage = () => {  
    
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile" ,label: 'Store Settings', current: true },
        { id: "products" ,label: 'Products', current: false },
        { id: "orders" ,label: 'Orders', current: false },
        { id: "statistics" ,label: 'Statistics', current: false },
        { id: "blog" ,label: 'Blog Posts', current: false }
    ];
    console.log("Active Tab:", activeTab);
    const renderContent = () => {
        switch(activeTab) {
            case "profile":
                return <SellerInfoDashboard />;
            case "products":
                return <ProductsDashboard setActiveTab={setActiveTab} />
            case "orders":
                return <OrdersDashboard />
            case "statistics":
                return <StatisticsDashboard />
            case "blog":
                return <BlogDashboard setActiveTab/>
            case "newProduct":
                return <AddProduct setActiveTab />
            case "newBlogPost":
                return <AddBlogPost setActiveTab/>
            default:
                return <StoreSettings />;
        }
    }

    return (
        <div >
            <Navbar theme="light"/>
            
            <div className="p-6 bg-slate-100  text-green-950 min-h-screen  mx-auto">
                <div className="container max-w-[1100px] mx-auto">
                    {/* <h1 className="text-3xl font-bold mb-4 text-center ">Seller Dashboard</h1> */}
                    <ActiveBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} header="Seller Dashboard"/>

                   { renderContent () }

                </div>
            </div>
        </div>
    );


}

export default SellerDashboardPage;