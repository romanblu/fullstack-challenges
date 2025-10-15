import React from "react";

const Features = () => {
    return (
        <section className="px-10 pb-10 bg-green-950 text-white">
        <div className="pt-8 container mx-auto max-w-[1100px] ">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
                <div className="text-4xl mb-3"></div>
                <h3 className="text-xl font-semibold mb-2">Phytosanitary Certified Quality</h3>
                <p>Every plant we ship is inspected and certified by agricultural authorities to ensure it’s pest-free, healthy, and compliant with global import regulations.</p>
            </div>
            <div className="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure Shipping</h3>
              <p>We pack and dispatch your plants carefully using trusted couriers, ensuring freshness and quick, safe delivery worldwide.</p>
            </div>

            <div className="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-semibold mb-2">Wide Variety of Plants</h3>
              <p>From tropicals to succulents, we offer a diverse range of high-quality tissue culture and nursery plants for collectors and businesses.</p>
            </div>

            <div className="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div className="text-4xl mb-3"></div>
              <h3 className="text-xl font-semibold mb-2">Trusted Global Suppliers</h3>
              <p>We work with certified growers worldwide, ensuring rare species, sustainable sourcing, and top-tier plant quality.</p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Features;