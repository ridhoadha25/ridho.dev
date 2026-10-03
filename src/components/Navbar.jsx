import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "ABOUT", nameId: "TENTANG", href: "#about", accent: "#ffe500" },
  { name: "SKILLS", nameId: "KEAHLIAN", href: "#skills", accent: "#ffe500" },
  { name: "PROJECTS", nameId: "PROYEK", href: "#projects", accent: "#ffe500" },
  { name: "CONTACT", nameId: "KONTAK", href: "#contact", accent: "#ffe500" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  /* ── Scroll: hide/show + shrink ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowNav(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active link via IntersectionObserver ── */
  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleClick = (id) => {
    setActiveLink(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <header
        className="navbar-root"
        style={{
          transform: showNav ? "translateY(0)" : "translateY(-120%)",
        }}
      >
        <div
          className={`navbar-inner ${scrolled ? "navbar-inner--scrolled" : ""}`}
        >
          {/* ── Logo ── */}
          <a
            href="#home"
            className="navbar-logo flex items-center gap-2"
            onClick={() => setActiveLink("")}
            aria-label="Go to top"
          >
            <span className="navbar-logo__icon flex items-center justify-center shrink-0">MR</span>
            <span className="navbar-logo__text hidden sm:inline-block">RIDHO</span>
          </a>

          {/* ── Desktop links ── */}
          <nav className="navbar-links" aria-label="Main navigation">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeLink === id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(id)}
                  className={`navbar-link ${isActive ? "navbar-link--active" : ""}`}
                  style={isActive ? { "--link-accent": link.accent } : {}}
                  aria-current={isActive ? "page" : undefined}
                >
                  {language === "id" ? link.nameId : link.name}
                  {isActive && <span className="navbar-link__dot" />}
                </a>
              );
            })}
          </nav>

          {/* ── Right side ── */}
          <div className="navbar-right flex items-center gap-2 md:gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="navbar-lang-btn flex items-center justify-center h-[36px] sm:h-[40px] w-[36px] sm:w-[40px]"
              aria-label="Toggle dark mode"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark
                ? <Sun size={16} strokeWidth={2.5} />
                : <Moon size={16} strokeWidth={2.5} />}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="navbar-lang-btn flex items-center justify-center h-[36px] sm:h-[40px] px-2 sm:px-3"
              aria-label="Toggle language"
            >
              <Globe size={14} strokeWidth={2.5} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{language === "id" ? "ID" : "EN"}</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-hamburger flex sm:hidden items-center justify-center h-[36px] w-[36px]"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen
                ? <X size={20} strokeWidth={2.5} />
                : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* ══ MOBILE DRAWER ══ */}
        <div className={`navbar-drawer ${isOpen ? "navbar-drawer--open" : ""}`}>
          <div className="navbar-drawer__inner">
            {navLinks.map((link, i) => {
              const id = link.href.replace("#", "");
              const isActive = activeLink === id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(id)}
                  className={`navbar-drawer__link ${isActive ? "navbar-drawer__link--active" : ""}`}
                  style={{
                    "--link-accent": link.accent,
                    transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                  }}
                >
                  <span className="navbar-drawer__num">0{i + 1}</span>
                  {language === "id" ? link.nameId : link.name}
                </a>
              );
            })}

          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
