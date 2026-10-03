function SectionTitle({ label, title, description }) {
  return (
    <div className="mb-14 max-w-2xl">
      <div className="mb-4 inline-block bg-black px-4 py-1 text-white neo-shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest">
          {label}
        </p>
      </div>

      <h2 className="display-font text-3xl font-black uppercase tracking-tight text-black md:text-5xl" style={{ WebkitTextStroke: '1px black' }}>
        {title}
      </h2>

      {description && (
        <div className="neo-card mt-6 bg-white p-4">
          <p className="font-bold leading-relaxed text-black">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

export default SectionTitle;
