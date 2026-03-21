import { socialIcons } from "./SocialIcons";

const navLinks = [
  { label: "Videos", href: "https://www.youtube.com/@LeonLush" },
  { label: "Lush Life TV", href: "https://www.youtube.com/@lushlifetv" },
  { label: "About", href: "#about" },
  { label: "Merch", href: "/shop" },
  { label: "Community", href: "https://discord.gg/SRvdfnKqEn" },
];

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0e0e0e]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="/" className="text-white text-xl font-bold tracking-tight">
          LEON LUSH
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-slate-400 hover:text-white text-sm font-medium tracking-wide uppercase transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Social icons in nav */}
        <div className="flex items-center gap-4">
          <a href="https://www.youtube.com/@LeonLush" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <socialIcons.youtube />
          </a>
          <a href="https://twitter.com/LeonLush" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <socialIcons.twitter />
          </a>
          <a href="https://www.instagram.com/leonlush/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <socialIcons.instagram />
          </a>
        </div>
      </div>
    </nav>
  );
}
