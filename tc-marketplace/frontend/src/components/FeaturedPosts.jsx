import React from "react";

import plant_tc_img from '../assets/images/Plant_tissue_culture_sample.jpg'
import sterile_workspace_img from '../assets/images/sterile-workspace.jpg'
import phyto_cert_img from '../assets/images/phyto-sample.jpg'

const FeaturedPosts = () => {
    return (
        <section className="bg-green-950 text-white  px-10 py-16">
            <div className="container max-w-[1100px] mx-auto text-center mb-10 ">
                <h2 className="text-3xl font-bold mb-3">Learn About Plant Tissue Culture</h2>
                <p className="text-lg text-gray-200">
                    Discover the science behind plant propagation and how our partner labs
                    cultivate healthy, pest-free plants using modern tissue culture techniques.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-green-900 container max-w-[1100px] mx-auto">
                <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
                    <img src={plant_tc_img} alt="Micropropagation" className=" mb-3" />
                    <h3 className="font-semibold text-xl mb-2 px-4">What is Tissue Culture?</h3>
                    <p className="text-gray-600 text-sm px-4">
                    Learn how plant tissue culture allows growers to clone healthy, disease-free plants 
                    from a single explant under controlled lab conditions.
                    </p>
                </div>

                <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
                    <img src={sterile_workspace_img} alt="Sterile Environment" className=" mb-3" />
                    <h3 className="font-semibold text-xl mb-2 px-4">Why Sterile Labs Matter</h3>
                    <p className="text-gray-600 text-sm px-4">
                    Understand the importance of sterilization and clean environments to prevent contamination 
                    and ensure successful culture growth.
                    </p>
                </div>

                <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
                    <img src={phyto_cert_img} alt="Export Certification" className=" mb-3 " />
                    <h3 className="font-semibold text-xl mb-2 px-4">Phytosanitary Certification</h3>
                    <p className="text-gray-600 text-sm px-4">
                    Explore how certified labs meet global export standards to safely ship live plants worldwide.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default FeaturedPosts;