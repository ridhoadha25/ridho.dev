import { Heart } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer border-t-[3px] border-white/20 py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-4 px-4 text-center md:px-6">
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center justify-center text-red-500"
        >
          <Heart size={19} strokeWidth={2.5} fill="currentColor" />
        </span>
        <p className="font-mono text-sm font-bold text-white">
          © {currentYear} M. Ridho Adha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
