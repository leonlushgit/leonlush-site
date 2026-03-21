import { socialIcons } from "./SocialIcons";

const socialLinks = [
  { name: "YouTube", href: "https://www.youtube.com/@LeonLush", Icon: socialIcons.youtube },
  { name: "Twitter", href: "https://twitter.com/LeonLush", Icon: socialIcons.twitter },
  { name: "TikTok", href: "https://www.tiktok.com/@leonlush", Icon: socialIcons.tiktok },
  { name: "Instagram", href: "https://www.instagram.com/leonlush/", Icon: socialIcons.instagram },
];

export default function DesktopFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-12 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Branding */}
        <div className="text-center lg:text-left">
          <p className="text-white font-bold text-lg tracking-tight">LEON LUSH</p>
          <p className="text-slate-600 text-xs mt-1">
            &copy; {new Date().getFullYear()} Leon Lush. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          <a href="mailto:business@leonlush.com" className="text-slate-500 hover:text-white text-sm transition-colors">
            Business Inquiries
          </a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-white transition-colors"
              aria-label={name}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
