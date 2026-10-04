import { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionLabel from "../components/SectionLabel";

/* ── Scroll reveal hook ── */
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
      { threshold: 0.05, rootMargin: "-20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

const skillsList = [
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", bg: "bg-[#cffafe]" }, // cyan-100 equivalent
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", bg: "bg-[#fef9c3]" }, // yellow-100
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", bg: "bg-[#ffedd5]" }, // orange-100
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", bg: "bg-[#dbeafe]" }, // blue-100
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", bg: "bg-[#ccfbf1]" }, // teal-100
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", bg: "bg-[#f3e8ff]" }, // purple-100
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", bg: "bg-[#e0e7ff]" }, // indigo-100
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", bg: "bg-[#ffe4e6]" }, // red-100
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", bg: "bg-[#e0f2fe]" }, // sky-100
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "bg-[#fce7f3]" }, // pink-100
];

function SkillBox({ skill, delay }) {
  const refSkill = useReveal(delay);

  return (
    <div ref={refSkill} className="reveal-scale relative group cursor-pointer mt-4 flex flex-col items-center gap-3">
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 group-hover:-translate-y-1">
        <div className="bg-black text-white text-xs font-mono font-bold py-1.5 px-3 whitespace-nowrap relative rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
          {skill.name}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black transform rotate-45"></div>
        </div>
      </div>

      {/* Box */}
      <div
        className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${skill.bg} flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
      >
        <img
          src={skill.icon}
          alt={`${skill.name} icon`}
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text Below */}
      <span className="font-mono text-xs md:text-sm font-bold text-black mt-1">
        {skill.name}
      </span>
    </div>
  );
}

function Specialization() {
  const { language } = useLanguage();
  const refLabel = useReveal(0);

  return (
    <section id="skills" className="bg-dots px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* ── Section label ── */}
        <SectionLabel
          revealRef={refLabel}
          number="02"
          title={language === "id" ? "Keahlian" : "Skills"}
          className="mb-16"
        />

        {/* ── Skills Grid ── */}
        <div className="flex flex-wrap justify-start gap-6 md:gap-8 lg:gap-10">
          {skillsList.map((skill, idx) => (
            <SkillBox key={skill.name} skill={skill} delay={idx * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialization;
