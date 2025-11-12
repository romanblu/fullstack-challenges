import { useQuery } from '@tanstack/react-query';
import ActiveBar from "../components/ui/ActiveBar";
import Navbar from "../components/layout/Navbar";
import SellerInfoDashboard from "../features/dashboard/SellerInfoDashboard";
import ProductsDashboard from "../features/products/ProductsDashboard";
import { useState } from "react";
import OrdersDashboard from "../features/dashboard/OrdersDashboard";
import StatisticsDashboard from "../features/dashboard/StatisticsDashboard";
import BlogDashboard from "../features/blog/BlogDashboard";
import BlogPostEditor from "../features/blog/BlogPostEditor";
import AddProduct from "../features/products/AddProduct";
import EditProduct from "../features/products/EditProduct";
import { getCategoryTree } from '../api/category'

const SellerDashboardPage = () => {  
    
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPost, setCurrentPost] = useState(null);

    const { data: categoryTree, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
        getCategoryTree().then((res) => res.data),
    });

    const tabs = [
        { id: "profile" ,label: 'Store Settings', current: true },
        { id: "products" ,label: 'Products', current: false },
        { id: "orders" ,label: 'Orders', current: false },
        { id: "statistics" ,label: 'Statistics', current: false },
        { id: "blog" ,label: 'Blog Posts', current: false }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case "profile":
                return <SellerInfoDashboard />;
            case "products":
                return <ProductsDashboard setActiveTab={setActiveTab} setSelectedProduct={setSelectedProduct}/>
            case "editProduct":
                return <EditProduct categoryTree={categoryTree} setActiveTab={setActiveTab} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct}/>
            case "orders":
                return <OrdersDashboard />
            case "statistics":
                return <StatisticsDashboard />
            case "blog":
                return <BlogDashboard setActiveTab={setActiveTab} setCurrentPost={setCurrentPost}/>
            case "newProduct":
                return <AddProduct setActiveTab={setActiveTab} categoryTree={categoryTree}/>
            case "newBlogPost":
                return <BlogPostEditor setActiveTab={setActiveTab}  />
            case "editBlogPost":
                return <BlogPostEditor setActiveTab={setActiveTab}  blogPostDraft={currentPost}/>
            default:
                return <SellerInfoDashboard />;
        }
    }

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div >
            <Navbar theme="light"/>
            
            <div className="p-6 bg-slate-100  text-green-950 min-h-screen  mx-auto">
                <div className=" mx-auto">
                    <ActiveBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} header="Seller Dashboard"/>
                   { renderContent () }
                </div>
            </div>
        </div>
    );


}

export default SellerDashboardPage;