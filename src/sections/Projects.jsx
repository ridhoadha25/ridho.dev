import { useState, useRef, useEffect } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import SectionLabel from "../components/SectionLabel";

/* ── Accent colors per index ── */
const ACCENTS = ["#b9dcf6", "#bde8c8", "#f4cddd", "#ffe99a", "#a7e2d7", "#c8ddfa"];

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
      { threshold: 0.06, rootMargin: "-20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Compact grid card ── */
function GridCard({ project, index, delay }) {
  const { language } = useLanguage();
  const ref = useReveal(delay);
  const accent = ACCENTS[index % ACCENTS.length];
  const primaryLink = project.demo || project.preview;
  const label = project.demo
    ? (language === "id" ? "Demo" : "Demo")
    : (language === "id" ? "Desain" : "Design");

  return (
    <article ref={ref} className="reveal-scale pj-card">
      {/* Top accent strip */}
      <div className="pj-card__strip" style={{ background: accent }} />

      {/* Image */}
      <div className="pj-card__img-wrap">
        <img src={project.image} alt={project.name} className="pj-card__img" loading="lazy" />
        <div className="pj-card__img-overlay gap-3">
          {primaryLink && (
            <a href={primaryLink} target="_blank" rel="noreferrer" className="pj-card__overlay-btn" title="Live Demo">
              <ExternalLink size={18} strokeWidth={2.5} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="pj-card__overlay-btn" title="GitHub Repo">
              <i className="bi bi-github text-xl" />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pj-card__body">
        <p className="pj-card__cat">
          {language === "id" ? project.category_id : project.category_en}
        </p>
        <h3 className="pj-card__name">{project.name}</h3>
        <p className="pj-card__desc">
          {language === "id" ? project.desc_id : project.desc_en}
        </p>

        {/* Tags */}
        <div className="pj-card__tags">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="pj-tag pj-tag--sm">{t}</span>
          ))}
        </div>

        {/* Footer link */}
        <div className="pj-card__footer">
          {primaryLink && (
            <a href={primaryLink} target="_blank" rel="noreferrer" className="pj-card__link">
              {label} <ArrowRight size={13} strokeWidth={2.5} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="pj-card__link-ghost" aria-label="GitHub">
              <i className="bi bi-github text-sm" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ══ Main Projects Section ══ */
function Projects() {
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();
  const refLabel = useReveal(0);

  const visible = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="px-4 py-16 md:px-6 md:py-20 pj-section bg-lines">
      <div className="mx-auto max-w-5xl">

        {/* ── Section label ── */}
        <SectionLabel
          revealRef={refLabel}
          number="03"
          title={language === "id" ? "Proyek" : "Projects"}
          count={language === "id" ? `${projects.length} proyek` : `${projects.length} projects`}
          className="mb-10"
        />

        {/* ── Projects Grid ── */}
        <div className="pj-grid">
          {visible.map((project, i) => (
            <GridCard
              key={project.name}
              project={project}
              index={i}
              delay={100 + i * 90}
            />
          ))}
        </div>

        {/* ── Show more / less ── */}
        {projects.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((p) => !p)}
              className="pj-toggle-btn"
            >
              {showAll
                ? (language === "id" ? "← Tampilkan Lebih Sedikit" : "← View Less")
                : (language === "id" ? "Lihat Semua Proyek →" : "View More →")}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;
