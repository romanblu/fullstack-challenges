
import PostCard from "./PostCard";

const mockPosts = [
    
    {
        id:2,
        image: "/content/images/Plant_tissue_culture_sample.jpg",
        title: "What is Tissue Culture?",
        description:"Learn how plant tissue culture allows growers to clone healthy, disease-free plants from a single explant under controlled lab conditions."
    },
    {
        id:3,
        image: "/content/images/sterile-workspace.jpg",
        title: "Why Sterile Labs Matter",
        description: "Understand the importance of sterilization and clean environments to prevent contamination and ensure successful culture growth."
    },
    {
        id:4,
        image: "/content/images/phyto-sample.jpg", 
        title:"Phytosanitary Certification",
        description: "Explore how certified labs meet global export standards to safely ship live plants worldwide."
    }
]

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
                {mockPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
                
            </div>
        </section>
    );
}

export default FeaturedPosts;