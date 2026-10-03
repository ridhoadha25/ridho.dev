import { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { MessageCircle, Mail, MapPin } from "lucide-react";
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
      { threshold: 0.08, rootMargin: "-20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function Contact() {
  const { language } = useLanguage();

  const refHeading = useReveal(0);
  const refText = useReveal(150);
  const refCard0 = useReveal(300);
  const refCard1 = useReveal(450);
  const refCard2 = useReveal(600);

  const contactLinks = [
    {
      name: "WhatsApp",
      value: "+62 823-6192-2285",
      Icon: MessageCircle,
      href: "https://wa.me/qr/R4OEZRTCQGJXE1",
      bg: "bg-[#bbf7d0]",
      ref: refCard0,
    },
    {
      name: "Email",
      value: "mridhoadha25@gmail.com",
      Icon: Mail,
      href: "mailto:mridhoadha25@gmail.com",
      bg: "bg-[#bfdbfe]",
      ref: refCard1,
    },
    {
      name: language === "id" ? "Lokasi" : "Location",
      value: "Tanah Putih, Rokan Hilir",
      Icon: MapPin,
      href: "https://maps.google.com/?q=Tanah+Putih+Rokan+Hilir+Riau",
      bg: "bg-[#fef08a]",
      ref: refCard2,
    },
  ];

  return (
    <section id="contact" className="bg-dots px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">

        {/* ── Section label ── */}
        <SectionLabel
          revealRef={refHeading}
          number="04"
          title={language === "id" ? "Kontak" : "Contact"}
          className="mb-16"
        />

        {/* ── Main Layout: Text Left, Cards Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left Side: Heading Text ── */}
          <div ref={refText} className="reveal-left flex flex-col gap-6 text-black font-medium leading-relaxed">
            <h2 className="display-font text-4xl font-black uppercase leading-[1.05] tracking-tighter text-black md:text-5xl lg:text-6xl">
              {language === "id" ? (
                <>
                  Mari <span className="text-outline">Berkolaborasi</span>.
                </>
              ) : (
                <>
                  Let's <span className="text-outline">Collaborate</span>.
                </>
              )}
            </h2>
            <p className="font-mono text-base md:text-lg font-bold leading-relaxed text-black max-w-xl">
              {language === "id"
                ? "Mari ciptakan inovasi bersama. Saya selalu terbuka untuk mendiskusikan peluang baru, proyek menarik, atau sekadar berbagi ide seputar pengembangan web."
                : "Let's build something innovative together. I am always open to discussing new opportunities, exciting projects, or simply sharing ideas about web development."}
            </p>
          </div>

          {/* ── Right Side: 3 Stacked Contact Cards ── */}
          <div className="flex flex-col gap-5">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                ref={contact.ref}
                target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="reveal-up group neo-card bg-white p-5 md:p-6 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-row items-center gap-5 cursor-pointer"
              >
                <div className={`border-[3px] border-black ${contact.bg} p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                  <contact.Icon size={26} strokeWidth={2.5} className="about-contact-icon text-black" />
                </div>
                <article className="flex flex-col border-none min-w-0">
                  <h3 className="font-sans text-xl font-black text-black mb-1">
                    {contact.name}
                  </h3>
                  <p className="font-mono text-sm text-gray-700 font-medium wrap-break-word">
                    {contact.value}
                  </p>
                </article>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
