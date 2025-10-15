import { useState } from 'react'

import plant_tc_img from './assets/images/Plant_tissue_culture_sample.jpg'
import sterile_workspace_img from './assets/images/sterile-workspace.jpg'
import phyto_cert_img from './assets/images/phyto-sample.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="bg-gradient-to-br from-green-600 via-green-800 to-green-950 text-green-50 ">
        <div class="container mx-auto max-w-[1100px] px-4">
          <nav class="flex justify-between items-center px-6 py-3  bg-opacity-25 ">
            <a class="text-2xl font-bold">PlantCellia</a>
            <div class="hidden sm:flex space-x-6 ">
              <a class="hover:text-lime-200">Products</a>
              <a class="hover:text-lime-200">About Us</a>
              <a class="hover:text-lime-200">Blog</a>
              <a class="hover:text-lime-200">Contact</a>
            </div>
            <div class="space-x-4 items-center">
                <a class="hover:text-lime-200">Login</a>
                <a class="bg-amber-400 text-green-900 px-2 py-1 rounded-xl hover:bg-amber-300 duration-200 shadow-lg hover:shadow-xl">Sign Up</a>
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
                <a href="#shop" class="bg-slate-200 text-green-700 px-5 py-2 rounded-lg  hover:bg-green-100 hover:scale-105 transition duration-200 shadow-lg hover:shadow-xl">
                  Shop Now
                </a>
                <a href="#learn" class="border border-white px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-green-700 transition duration-200 shadow-lg hover:shadow-xl">
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


      
      <section class="bg-green-950 text-white  px-10 py-16">
        <div class="max-w-[1100px] mx-auto text-center mb-10">
          <h2 class="text-3xl font-bold mb-3">Learn About Plant Tissue Culture</h2>
          <p class="text-lg text-gray-200">
            Discover the science behind plant propagation and how our partner labs
            cultivate healthy, pest-free plants using modern tissue culture techniques.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-green-900">
          <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
            <img src={plant_tc_img} alt="Micropropagation" class=" mb-3" />
            <h3 class="font-semibold text-xl mb-2 px-4">What is Tissue Culture?</h3>
            <p class="text-gray-600 text-sm px-4">
              Learn how plant tissue culture allows growers to clone healthy, disease-free plants 
              from a single explant under controlled lab conditions.
            </p>
          </div>

          <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
            <img src={sterile_workspace_img} alt="Sterile Environment" class=" mb-3" />
            <h3 class="font-semibold text-xl mb-2 px-4">Why Sterile Labs Matter</h3>
            <p class="text-gray-600 text-sm px-4">
              Understand the importance of sterilization and clean environments to prevent contamination 
              and ensure successful culture growth.
            </p>
          </div>

          <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
            <img src={phyto_cert_img} alt="Export Certification" class=" mb-3 " />
            <h3 class="font-semibold text-xl mb-2 px-4">Phytosanitary Certification</h3>
            <p class="text-gray-600 text-sm px-4">
              Explore how certified labs meet global export standards to safely ship live plants worldwide.
            </p>
          </div>
        </div>
      </section>
      
      <section class=" bg-slate-200 px-10 text-green-950 pt-8">
        <div class="container max-w-[1100px] mx-auto">
          <h1 class="text-3xl font-bold text-center">Featured Products</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 pb-16">
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl shadow hover:shadow-lg transition ">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60"
                alt="Plant"
                class="rounded-sm w-full h-56 object-cover mb-3"
              />
              <h3 class="text-lg font-semibold text-green-900 px-2">Philodendron</h3>
              <p class="text-sm text-gray-600 mb-2 px-2">Tissue culture — 3 months old</p>
              <span class="text-orange-800 font-light text-sm px-2">only 6 left</span>
              <div class="flex justify-between items-center">
                <span class="text-green-700 font-bold px-2">$15</span>
                
                <button class="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition m-3">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="bg-gradient-to-br from-green-700 via-green-800 to-green-950 text-white ">
        <div class="text-center border-b-2 border-gray-200/40 py-6 max-w-[900px] mx-auto ">
            <h2 class="text-2xl font-bold text-white mb-2 pt-3">Stay in the Loop</h2>
            <p >Get updates from tissue culture labs, new plant listings, and exclusive offers.</p>
            <form class="flex flex-col sm:flex-row items-center justify-center gap-3 px-8 my-6">
              <input
                type="email"
                placeholder="Enter your email"
                class="max-w-[400px] flex-grow sm:w-auto px-4 py-3  rounded-md border border-emerald-300/50 focus:ring-2 focus:ring-emerald-400 outline-none bg-emerald-400/30"
                required
              />
              <button
                type="submit"
                class="bg-emerald-600/50 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Subscribe
              </button>
          </form>
        </div>
        <div class="container max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-8 pt-6 gap-6 ">
            {/* { Brand identity } */}
            <div>
              <h2 class="text-xl font-bold mb-2">PlantCellia</h2>
              <p class="text-sm text-gray-300">
                Connecting tissue culture labs and plant lovers worldwide 🌱  
                Explore, trade, and grow with verified suppliers.
              </p>
            </div>
             {/* Quick links  */}
            <div>
              <h3 class="text-lg font-semibold mb-2">Quick Links</h3>
              <ul class="space-y-1 text-gray-300">
                <li><a href="#" class="hover:text-green-400 transition">Home</a></li>
                <li><a href="#" class="hover:text-green-400 transition">Shop</a></li>
                <li><a href="#" class="hover:text-green-400 transition">About</a></li>
                <li><a href="#" class="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>
             {/* Categories  */}
            <div>
              <h3 class="text-lg font-semibold mb-2">Categories</h3>
              <ul class="space-y-1 text-gray-300">
                <li><a href="#" class="hover:text-green-400 transition">House Plants</a></li>
                <li><a href="#" class="hover:text-green-400 transition">Commercial Plants</a></li>
                <li><a href="#" class="hover:text-green-400 transition">Tissue Culture Labs</a></li>
                <li><a href="#" class="hover:text-green-400 transition">Accessories</a></li>
              </ul>
            </div>
             {/* Contact  */}
            <div>
              <h3 class="text-lg font-semibold mb-3">Get in Touch</h3>
              <p class="text-gray-300 text-sm mb-2">📍 Global supplier network</p>
              <p class="text-gray-300 text-sm mb-2">✉️ info@PlantCellia.com</p>
              <p class="text-gray-300 text-sm">🌐 www.plantcellia.com</p>
            </div>
        </div>
        <div class="mt-10 border-t-2 border-gray-200/40 py-6 max-w-[900px] mx-auto text-center text-gray-300 text-sm">
          © 2025 PlantCellia All rights reserved.
        </div>
      </footer>
    </>
  )
}

export default App
