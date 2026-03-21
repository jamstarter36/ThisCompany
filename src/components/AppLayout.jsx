import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import ServiceCard from "./ServiceCard";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import SERVICES from "../data/Services.js";

export default function AppLayout() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <About />
      <div id="services">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
}