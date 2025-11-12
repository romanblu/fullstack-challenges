import TextCard from "../ui/TextCard";

const Features = () => {
    return (
        <section className="px-10 pb-10 bg-green-950 text-white">
        <div className="pt-8 container mx-auto max-w-[1100px] ">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TextCard title="Phytosanitary Certified Quality" description="Every plant we ship is inspected and certified by agricultural authorities to ensure it’s pest-free, healthy, and compliant with global import regulations." />
            <TextCard title="Fast & Secure Shipping" description="We pack and dispatch your plants carefully using trusted couriers, ensuring freshness and quick, safe delivery worldwide." />
            <TextCard title="Wide Variety of Plants" description="From tropicals to succulents, we offer a diverse range of high-quality tissue culture and nursery plants for collectors and businesses." />
            <TextCard title="Trusted Global Suppliers" description="We work with certified growers worldwide, ensuring rare species, sustainable sourcing, and top-tier plant quality." />
          
          </div>
        </div>
      </section>
    );
}

export default Features;