import Navbar from "../components/Navbar";
import StoreSettings from "../components/StoreSettings";

const SellerDashboardPage = () => {  
    return (
        <div >
            <Navbar theme="light"/>
            <div className="p-6 bg-slate-50  text-green-950 min-h-screen">
                <h1 className="text-3xl font-bold mb-4 text-center ">Seller Dashboard</h1>
                <StoreSettings />
            </div>
        </div>
    );


}

export default SellerDashboardPage;