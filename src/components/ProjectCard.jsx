import { useLanguage } from "../context/LanguageContext";
import { ExternalLink } from "lucide-react";

function ProjectCard({ project }) {
  const { language } = useLanguage();
  const primaryLink = project.demo || project.preview;
  
  const demoLabelId = "Demo Langsung";
  const demoLabelEn = "Live Demo";
  const designLabelId = "Lihat Desain";
  const designLabelEn = "View Design";

  const primaryLabelId = project.demo ? demoLabelId : designLabelId;
  const primaryLabelEn = project.demo ? demoLabelEn : designLabelEn;
  const primaryLabel = language === 'id' ? primaryLabelId : primaryLabelEn;

  return (
    <article className="neo-card flex h-full flex-col overflow-hidden bg-white">
      {/* Image */}
      <div className="border-b-4 border-black">
        <img
          src={project.image}
          alt={project.name}
          title={project.name}
          className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-block bg-accent-pink px-2 py-1 text-xs font-black uppercase tracking-widest text-black border-2 border-black neo-shadow-sm mb-2">
              {language === 'id' ? project.category_id : project.category_en}
            </p>
            <h3 className="display-font text-2xl font-black uppercase leading-tight text-black">
              {project.name}
            </h3>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm font-bold leading-relaxed text-black">
          {language === 'id' ? project.desc_id : project.desc_en}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="border-2 border-black bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black neo-shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`${primaryLabel} untuk ${project.name}`}
              className="neo-card-interactive flex items-center gap-2 bg-accent-yellow px-4 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-yellow-400"
            >
              <ExternalLink size={18} strokeWidth={2.5} />
              {primaryLabel}
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`GitHub untuk ${project.name}`}
              className="neo-card-interactive flex items-center gap-2 bg-black px-4 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-black hover:text-white"
            >
              <i className="bi bi-github text-base" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
