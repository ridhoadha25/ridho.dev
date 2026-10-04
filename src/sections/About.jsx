import { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Code, MapPin, GraduationCap } from "lucide-react";
import SectionLabel from "../components/SectionLabel";

function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function About() {
  const { language } = useLanguage();

  const refLabel = useReveal(0);
  const refText  = useReveal(150);
  const refRole = useReveal(300);
  const refEdu = useReveal(450);
  const refLoc = useReveal(600);

  return (
    <section id="about" className="px-4 py-16 md:px-6 md:py-24 bg-lines">
      <div className="mx-auto max-w-5xl">
        {/* ── Section Label ── */}
        <SectionLabel
          revealRef={refLabel}
          number="01"
          title={language === "id" ? "Tentang Saya" : "About Me"}
        />

        {/* ── Main Layout: Text Left, Cards Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
         <div ref={refText} className="reveal-left flex flex-col gap-6 text-black font-medium leading-relaxed">
            <p className="text-lg md:text-xl">
              {language === "id" ? (
                <>
                  Halo! Saya <span className="about-highlight">M. Ridho Adha</span>, seorang Web Developer sekaligus mahasiswa program studi <span className="about-highlight">Sistem Informasi</span> di <span className="about-highlight">Institut Teknologi Rokan Hilir</span>. Saya memiliki minat besar dalam menerjemahkan logika bisnis yang kompleks menjadi produk digital yang nyaman digunakan.
                </>
              ) : (
                <>
                  Hi! I'm <span className="about-highlight">M. Ridho Adha</span>, a Web Developer and an <span className="about-highlight">Information Systems</span> student at <span className="about-highlight">Institut Teknologi Rokan Hilir</span>. I have a strong passion for translating complex business logic into seamless digital products.
                </>
              )}
            </p>
            
            <p className="text-lg md:text-xl">
              {language === "id" ? (
                <>
                  Latar belakang tersebut melatih saya untuk memadukan analisis kebutuhan sistem dengan pengembangan web—menciptakan aplikasi yang terstruktur, andal, dan solutif.
                </>
              ) : (
                <>
                  This background drives me to blend system requirements analysis with web development—creating applications that are structured, reliable, and solution-driven.
                </>
              )}
            </p>
          </div>

          {/* ── Right Side: 3 Stacked Cards (Role, Education, Location) ── */}
          <div className="flex flex-col gap-5">
            
            {/* Card 1: Role */}
            <div ref={refRole} className="reveal-up group neo-card bg-white p-5 md:p-6 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-row items-center gap-5 cursor-default">
              <div className="border-[3px] border-black bg-[#bfdbfe] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                <Code size={26} strokeWidth={2.5} className="about-contact-icon text-black" />
              </div>
              <article className="flex flex-col border-none">
                <h3 className="font-sans text-xl font-black text-black mb-1">
                  {language === "id" ? "Peran" : "Role"}
                </h3>
                <p className="font-mono text-sm text-gray-700 font-medium">
                  {language === "id"
                    ? "Web Developer (Frontend & UI/UX)"
                    : "Web Developer (Frontend & UI/UX)"}
                </p>
              </article>
            </div>

            {/* Card 2: Education */}
            <div ref={refEdu} className="reveal-up reveal-delay-150 group neo-card bg-white p-5 md:p-6 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-row items-center gap-5 cursor-default">
              <div className="border-[3px] border-black bg-[#bbf7d0] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={26} strokeWidth={2.5} className="about-contact-icon text-black" />
              </div>
              <article className="flex flex-col border-none">
                <h3 className="font-sans text-xl font-black text-black mb-1">
                  {language === "id" ? "Pendidikan" : "Education"}
                </h3>
                <p className="font-mono text-sm text-gray-700 font-medium">
                  {language === "id"
                    ? "Sistem Informasi, Institut Teknologi Rokan Hilir"
                    : "Information Systems, Institute of Technology Rokan Hilir"}
                </p>
              </article>
            </div>

            {/* Card 3: Location */}
            <div ref={refLoc} className="reveal-up reveal-delay-300 group neo-card bg-white p-5 md:p-6 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-row items-center gap-5 cursor-default">
              <div className="border-[3px] border-black bg-[#fef08a] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={26} strokeWidth={2.5} className="about-contact-icon text-black" />
              </div>
              <article className="flex flex-col border-none">
                <h3 className="font-sans text-xl font-black text-black mb-1">
                  {language === "id" ? "Lokasi" : "Location"}
                </h3>
                <p className="font-mono text-sm text-gray-700 font-medium">
                  Rokan Hilir, Riau, Indonesia
                </p>
              </article>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
