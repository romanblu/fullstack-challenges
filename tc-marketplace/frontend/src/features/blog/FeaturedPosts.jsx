
import PostsSelection from "./PostsSelection.jsx";

const FeaturedPosts = ({ featuredPosts }) => {
    return (
        <section className="bg-green-950 text-gray-200 ">
            <PostsSelection 
                posts={featuredPosts}
                title="Learn About Plant Tissue Culture" 
                subtitle="Discover the science behind plant propagation and how our partner labs cultivate healthy, pest-free plants using modern tissue culture techniques." />
        </section>
    );
}

export default FeaturedPosts;