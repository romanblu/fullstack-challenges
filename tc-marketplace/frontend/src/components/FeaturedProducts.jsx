import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Philodendron",
    description: "Tissue culture — 3 months old",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=60",
    price: 15,
    stock: 6,
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    description: "Tissue culture — 2 months old",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60",
    price: 18,
    stock: 10,
  },
  {
    id: 3,
    name: "Anthurium Crystallinum",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=500&q=60",
    price: 25,
    stock: 3,
  },
  {
    id: 4,
    name: "Snake Plant (Dracaena trifasciata) ",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=500&q=60",
    price: 25,
    stock: 3,
  },
  {
    id: 5,
    name: "Spider Plant (Chlorophytum comosum)",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1611527664689-d430dd2a6774?auto=format&fit=crop&q=60&w=500",
    price: 25,
    stock: 3,
  },
  {
    id: 6,
    name: "ZZ Plant (Zamioculcas zamiifolia)",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1632900931937-f5ea0b69da81?auto=format&fit=crop&q=60&w=500",
    price: 25,
    stock: 3,
  },
  {
    id: 7,
    name: "Pothos (Epipremnum aureum)",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1605966706128-927ad2c9e2c8?auto=format&fit=crop&q=60&w=500",
    price: 25,
    stock: 3,
  },
  {
    id: 8,
    name: "Peace Lily (Spathiphyllum)",
    description: "Lab propagated — 4 months old",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&q=60&w=500",
    price: 25,
    stock: 3,
  },
];


const FeaturedProducts = () => {
    return (
        <section className=" bg-slate-200 px-10 text-green-950 pt-8">
            <div className="container max-w-[1100px] mx-auto">
                <h1 className="text-3xl font-bold text-center">Featured Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 pb-16">
                {mockProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}   
                </div>
            </div>
      </section>
    );
}

export default FeaturedProducts;