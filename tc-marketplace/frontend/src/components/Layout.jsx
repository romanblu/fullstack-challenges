import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col text-green-50 ">
      <Navbar />
      <main className="flex-1 container mx-auto  px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}