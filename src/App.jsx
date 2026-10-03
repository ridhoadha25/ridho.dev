import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./sections/Home";
import About from "./sections/About";
import Specialization from "./sections/Specialization";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");
    // Select all reveal items (both regular string and attribute with value like "scale")
    const items = document.querySelectorAll("[data-reveal-item]");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Number(delay));
            itemObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    sections.forEach((el) => sectionObserver.observe(el));
    items.forEach((el) => itemObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden text-text-primary">
      <Navbar />

      <main className="pt-20">
        <Home />
        <About />
        <Specialization />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
