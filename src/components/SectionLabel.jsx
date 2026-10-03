function SectionLabel({ revealRef, number, title, count, className = "mb-12" }) {
  return (
    <div
      ref={revealRef}
      className={`reveal-left flex flex-wrap items-center gap-5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="section-label__index flex h-16 w-16 shrink-0 -rotate-3 items-center justify-center border-[3px] border-black bg-accent-yellow font-mono text-2xl font-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
      >
        {number}
      </div>
      <div className="min-w-0">
        <p className="mb-1 font-mono text-[11px] font-bold uppercase text-accent-blue">
          Portfolio Section
        </p>
        <p className="display-font text-3xl font-black uppercase leading-none text-black md:text-4xl">
          {title}
        </p>
      </div>
      {count && (
        <div className="neo-card ml-auto bg-white px-4 py-2 text-xs font-black uppercase text-black">
          {count}
        </div>
      )}
    </div>
  );
}

export default SectionLabel;