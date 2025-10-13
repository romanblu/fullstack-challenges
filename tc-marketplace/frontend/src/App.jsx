import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-white ">
        <div class="container mx-auto max-w-[1100px] px-4">
          <nav class="flex justify-between items-center px-6 py-3  bg-opacity-25 ">
            <a class="text-2xl font-bold">PlantCellia</a>
            <div class="hidden sm:flex space-x-6 ">
              <a class="hover:text-blue-600">Products</a>
              <a class="hover:text-blue-600">About Us</a>
              <a class="hover:text-blue-600">Blog</a>
              <a class="hover:text-blue-600">Contact</a>
            </div>
            <div class="space-x-4 items-center">
                <a class="hover:text-blue-600">Login</a>
                <a class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">Sign Up</a>
              </div>
          </nav>

          <section class="h-[70vh]   
                            flex px-8">
            <div class="flex flex-col justify-center items-center mr-4 sm:w-1/2">
              <div class="text-center ">
                <h1 class="text-4xl font-bold mb-4">
                  Connecting Tissue Culture Labs Worldwide
                </h1>
                <p class="text-lg mb-6">
                  Discover, exchange, and grow verified plant cultures from trusted laboratories across the globe.
                </p>
              </div>
              <div class="space-x-6 ">
                <a href="#shop" class="bg-white text-green-700 px-5 py-2 rounded-lg shadow hover:bg-green-50 transition">
                  Shop Now
                </a>
                <a href="#learn" class="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-green-700 transition">
                  Learn More
                </a>
              </div>
            </div>
            
            <div class="hidden sm:flex sm:w-1/2 justify-center mt-8 ">
              <img 
              src="https://www.shutterstock.com/image-photo/vase-decorate-plants-flowers-rainy-600nw-1960299640.jpg" 
              alt="Plants Banner" 
              class="rounded-t-full shadow-lg object-cover 
                transition-all duration-300"
            />
            </div>
          </section>
        </div>
      </div>

      <section class="px-10 pb-10 bg-green-950 text-white">
        <div class="pt-8 container mx-auto max-w-[1100px] ">
          <h2 class="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
                <div class="text-4xl mb-3"></div>
                <h3 class="text-xl font-semibold mb-2">Phytosanitary Certified Quality</h3>
                <p>Every plant we ship is inspected and certified by agricultural authorities to ensure it’s pest-free, healthy, and compliant with global import regulations.</p>
            </div>
            <div class="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div class="text-4xl mb-3"></div>
              <h3 class="text-xl font-semibold mb-2">Fast & Secure Shipping</h3>
              <p>We pack and dispatch your plants carefully using trusted couriers, ensuring freshness and quick, safe delivery worldwide.</p>
            </div>

            <div class="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div class="text-4xl mb-3"></div>
              <h3 class="text-xl font-semibold mb-2">Wide Variety of Plants</h3>
              <p>From tropicals to succulents, we offer a diverse range of high-quality tissue culture and nursery plants for collectors and businesses.</p>
            </div>

            <div class="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
              <div class="text-4xl mb-3"></div>
              <h3 class="text-xl font-semibold mb-2">Trusted Global Suppliers</h3>
              <p>We work with certified growers worldwide, ensuring rare species, sustainable sourcing, and top-tier plant quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="px-10 pb-10 bg-slate-200 text-black">
        <h1 class="text-3xl text-center pt-8 font-bold">Explore Plants Category</h1>
        <div class="pt-8 container mx-auto max-w-[1100px] grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* House plants */}
          <div class="bg-slate-400/40 p-6 rounded-xl hover:bg-green-800/10 transition flex flex-col sm:flex-row items-center gap-6">
            <div class="flex-1">
              <h3 class="text-2xl font-semibold mb-2">House Plants</h3>
              <p class="text-gray-700">
                Perfect for hobbyists and home growers — beautiful, low-maintenance plants that bring freshness to any room.
              </p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1598966733531-772e3b4b1d4b" 
              alt="House Plants" 
              class="w-40 h-40 object-cover rounded-full shadow-lg"
            />
          </div>

          {/* Commercial plants */}
          <div class="bg-slate-400/40 p-6 rounded-xl hover:bg-green-800/10 transition flex flex-col sm:flex-row items-center gap-6">
            <div class="flex-1">
              <h3 class="text-2xl font-semibold mb-2">Commercial Plants</h3>
              <p class="text-gray-700">
                Ideal for nurseries and industrial growers — bulk tissue-culture plants with up to 50% off wholesale orders.
              </p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1602881917390-48e51d43c9b3"
              alt="Commercial Plants" 
              class="w-40 h-40 object-cover rounded-full shadow-lg"
            />
          </div>

        </div>
      </section>
    </>
  )
}

export default App
