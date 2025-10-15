import React from "react";

const PlantsCategories = () => {
    return (
        <section className="px-10 pb-10 bg-slate-200 text-black">
            <h1 className="text-3xl text-center pt-8 font-bold">Explore Plants Category</h1>
            <div className="pt-8 container mx-auto max-w-[1100px] grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* House plants */}
                <div className="bg-slate-400/40 p-6 rounded-xl hover:bg-green-800/10 transition flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">House Plants</h3>
                    <p className="text-gray-700">
                    Perfect for hobbyists and home growers — beautiful, low-maintenance plants that bring freshness to any room.
                    </p>
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1598966733531-772e3b4b1d4b" 
                    alt="House Plants" 
                    className="w-40 h-40 object-cover rounded-full shadow-lg"
                />
                </div>
    
                {/* Commercial plants */}
                <div className="bg-slate-400/40 p-6 rounded-xl hover:bg-green-800/10 transition flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">Commercial Plants</h3>
                    <p className="text-gray-700">
                    Ideal for nurseries and industrial growers — bulk tissue-culture plants with up to 50% off wholesale orders.
                    </p>
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1602881917390-48e51d43c9b3"
                    alt="Commercial Plants" 
                    className="w-40 h-40 object-cover rounded-full shadow-lg"
                />
                </div>
    
            </div>
        </section>
    );
}

export default PlantsCategories;