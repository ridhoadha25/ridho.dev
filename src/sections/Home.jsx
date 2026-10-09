import { useRef, useEffect } from "react";
import { ArrowRight, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import heroImage from "../assets/images/Hero.jpeg";

const locationInfo = [
  { id: "📍 Indonesia", en: "📍 Indonesia" },
  { id: "Tersedia Remote", en: "Remote Available" },
  { id: "WIB (UTC+7)", en: "WIB (UTC+7)" }
];

function useMountReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => ref.current?.classList.add("visible"), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
}

function Home() {
  const { language } = useLanguage();

  const r0 = useMountReveal(80);
  const r1 = useMountReveal(180);
  const r2 = useMountReveal(320);
  const r3 = useMountReveal(430);
  const r4 = useMountReveal(540);
  const r5 = useMountReveal(640);
  const rCard = useMountReveal(260);
  const rIcons = useMountReveal(460);

  return (
    <section id="home" className="home2-root bg-dots">
      <div className="home2-grid">

        {/* ══ LEFT ══ */}
        <div className="home2-left">

          <div ref={r0} className="reveal-up home2-avail-badge">
            <span className="home2-avail-dot" />
            {language === "id" ? "TERBUKA UNTUK PELUANG" : "OPEN TO OPPORTUNITIES"}
          </div>

          <h1 ref={r1} className="reveal-up home2-h1">
            <span className="home2-h1__line home2-h1__intro">
              {language === "id" ? "Hai, saya" : "Hi, I'm"}
            </span>
            <span className="home2-h1__line home2-h1__name-highlight">
              M. Ridho
            </span>
            <span className="home2-h1__line home2-h1__last">
              Adha
            </span>
          </h1>

          <div ref={r2} className="reveal-up home2-role-line">
            <span aria-hidden="true">&gt;_</span>
            Frontend Developer
            <span className="home2-role-cursor" aria-hidden="true" />
          </div>

          <div ref={r3} className="reveal-up home2-desc-card">
            <p className="home2-desc-card__text">
              {language === "id"
                ? "Membangun produk digital yang menarik dan responsif, menjembatani konsep desain menjadi kode siap pakai."
                : "Bridging design and development — converting visual concepts into seamless, high-performance web products."}
            </p>
          </div>

          <div ref={r4} className="reveal-up home2-cta-row">
            <a href="#projects" className="home2-btn home2-btn--primary">
              {language === "id" ? "Lihat Proyek" : "View Projects"}
              <ArrowRight size={14} strokeWidth={2.5} className="home2-btn__icon" />
            </a>
            <a href="#contact" className="home2-btn home2-btn--secondary">
              <Send size={13} strokeWidth={2.5} />
              {language === "id" ? "Hubungi Saya" : "Contact Me"}
            </a>
          </div>

          <div ref={r5} className="reveal-up home2-stack" aria-label="Location Info">
            {locationInfo.map((info, idx) => (
              <span key={idx} className="home2-stack__item">
                {language === "id" ? info.id : info.en}
              </span>
            ))}
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="home2-right">
          <div className="flex flex-col items-center gap-8 md:mt-0">
            <div ref={rCard} className="reveal-right home2-card-wrap relative">
              <div className="home2-card-layer home2-card-layer--yellow" />
              <div className="home2-card home2-card--portrait">
                <img
                  className="home2-card__image"
                  src={heroImage}
                  alt="M. Ridho Adha"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -left-4 z-20 neo-card bg-white px-4 py-2 font-mono text-sm font-semibold uppercase -rotate-6 animate-float hover:rotate-0 hover:scale-105 transition-transform duration-300">
                {language === "id" ? "🌐 Halo Dunia" : "🌐 Hello World"}
              </div>
            </div>

            {/* Social Icons */}
            <div ref={rIcons} className="reveal-up flex items-center justify-center gap-5">
              <a
                href="https://www.linkedin.com/in/m-ridho-adha-06b0502b1/"
                target="_blank"
                rel="noreferrer"
                className="neo-card-interactive flex h-12 w-12 items-center justify-center bg-white text-black hover:-translate-y-1 hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin text-xl" />
              </a>
              <a
                href="https://github.com/ridhoadha25"
                target="_blank"
                rel="noreferrer"
                className="neo-card-interactive flex h-12 w-12 items-center justify-center bg-white text-black hover:-translate-y-1 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <i className="bi bi-github text-xl" />
              </a>
              <a
                href="mailto:mridhoadha25@gmail.com"
                className="neo-card-interactive flex h-12 w-12 items-center justify-center bg-white text-black hover:-translate-y-1 hover:bg-accent-pink hover:text-black transition-all duration-300"
                aria-label="Email"
              >
                <i className="bi bi-envelope-fill text-xl" />
              </a>
            </div>
          </div>
        </div>

      </div>


    </section>
  );
}

export default Home;
