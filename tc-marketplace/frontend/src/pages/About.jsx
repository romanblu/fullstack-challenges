import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const About = () => {
    return (
        <section className="bg-white text-green-950">
        {/* Hero / Intro Section */}
        <div className="bg-gradient-to-br from-green-700 via-green-800 to-green-950 text-white ">
            <Navbar />
            <div className="container mx-auto max-w-[1100px] px-6 text-center py-16">
            <h1 className="text-4xl font-bold mb-4">About PlantCellia</h1>
            <p className="text-lg text-green-100 max-w-3xl mx-auto">
                Empowering tissue culture laboratories and plant enthusiasts worldwide
                to connect, collaborate, and trade certified plant materials.
            </p>
            </div>
        </div>

        {/* Our Mission */}
        <div className="container mx-auto max-w-[1100px] px-6 py-16">
            <h2 className="text-3xl font-bold mb-4 text-green-800">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to revolutionize the global plant tissue culture industry by
            providing a trusted marketplace for labs, researchers, and growers. We make
            it simple to source and sell verified, high-quality explants, in-vitro plants,
            and acclimated specimens with full certification and traceability.
            </p>
        </div>

        {/* Image + Story */}
        <div className="bg-green-50 py-16">
            <div className="container mx-auto max-w-[1100px] px-6 grid md:grid-cols-2 gap-8 items-center">
            <img
                src="/assets/lab-plants.jpg"
                alt="Tissue culture lab"
                className="rounded-xl shadow-lg object-cover w-full h-80"
            />
            <div>
                <h2 className="text-3xl font-bold mb-4 text-green-800">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                Born from a collaboration between biotechnologists and digital innovators,
                PlantCellia bridges the gap between science and commerce. We recognized that
                tissue culture labs often lacked global exposure and efficient digital tools
                for showcasing their genetics.
                </p>
                <p className="text-gray-700 leading-relaxed">
                Today, our platform enables labs to publish their collections, manage
                certifications, and reach customers across continents—while ensuring
                transparency and biosecurity.
                </p>
            </div>
            </div>
        </div>

        {/* Global Collaboration */}
        <div className="container mx-auto max-w-[1100px] px-6 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-800">
            Connecting Labs Worldwide
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            From micropropagation startups to established research institutions, labs from
            every corner of the world use PlantCellia to share innovation, trade verified
            plant materials, and contribute to sustainable biodiversity.
            </p>
            <img
            src="/assets/world-map-green.png"
            alt="Global network of labs"
            className="rounded-xl shadow-lg mx-auto w-full max-w-3xl"
            />
        </div>

        {/* Certifications / Trust */}
        <div className="bg-green-100 py-16">
            <div className="container mx-auto max-w-[1100px] px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-800">Quality & Certification</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
                Every listing on our platform adheres to strict documentation and verification
                standards. We ensure traceable genetic origins, phytosanitary compliance, and
                transparent provenance for all plant materials.
            </p>
            <div className="flex justify-center space-x-10">
                <img src="/assets/certificate-icon.png" alt="Certificate" className="w-16" />
                <img src="/assets/lab-icon.png" alt="Lab" className="w-16" />
                <img src="/assets/leaf-icon.png" alt="Sustainability" className="w-16" />
            </div>
            </div>
        </div>
    </section>
    
    );
}

export default About;