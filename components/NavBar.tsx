"use client";

import { useState } from "react";
import { socialIcons } from "./SocialIcons";

const navLinks = [
  { label: "Videos", href: "https://www.youtube.com/@LeonLush" },
  { label: "Lush Life TV", href: "https://www.youtube.com/@lushlifetv" },
  { label: "About", href: "/about" },
  { label: "Merch", href: "/shop" },
  { label: "Community", href: "https://discord.gg/SRvdfnKqEn" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0e0e0e]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-white text-xl font-bold tracking-tight">
          LEON LUSH
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
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

        {/* Desktop social icons */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile: social icons + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/@LeonLush" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <socialIcons.youtube />
            </a>
            <a href="https://twitter.com/LeonLush" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <socialIcons.twitter />
            </a>
            <a href="https://www.tiktok.com/@leonlush" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <socialIcons.tiktok />
            </a>
            <a href="https://www.instagram.com/leonlush/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <socialIcons.instagram />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0e0e0e]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white text-base font-medium tracking-wide uppercase transition-colors py-2"
                >
                  {link.label}
                </a>
              );
            })}

          </div>
        </div>
      )}
    </nav>
  );
}
