import Image from "next/image";
import { readFileSync } from "fs";
import path from "path";
import { socialIcons } from "./SocialIcons";

// Keys match the JSON file
const socials = [
  { key: "youtube", name: "YouTube", href: "https://www.youtube.com/@LeonLush", Icon: socialIcons.youtube },
  { key: "twitter", name: "Twitter", href: "https://twitter.com/LeonLush", Icon: socialIcons.twitter },
  { key: "tiktok", name: "TikTok", href: "https://www.tiktok.com/@leonlush", Icon: socialIcons.tiktok },
  { key: "instagram", name: "Instagram", href: "https://www.instagram.com/leonlush/", Icon: socialIcons.instagram },
];

// Read follower counts from the JSON file at build time
function getSocialCounts(): Record<string, { count: string; raw: number }> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "social-counts.json");
    const data = JSON.parse(readFileSync(filePath, "utf8"));
    return data;
  } catch {
    return {};
  }
}

export default function HeroSection() {
  const counts = getSocialCounts();

  return (
    <section className="relative pt-24 pb-12 px-6 lg:pt-32 lg:pb-20 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-16">
        {/* Avatar — shown first on mobile (above text), on the right for desktop */}
        <div className="flex-shrink-0 mb-8 lg:mb-0 lg:order-2 flex flex-col items-center">
          <a
            href="https://www.youtube.com/@LeonLush"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block group cursor-pointer"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#d674ff]/20 to-[#81e9ff]/20 rounded-full blur-2xl group-hover:from-[#d674ff]/40 group-hover:to-[#81e9ff]/40 transition-all duration-500" />
            {/* Avatar circle */}
            <div className="relative w-40 h-40 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-[#1a1919] shadow-2xl group-hover:scale-105 group-hover:border-[#d674ff]/30 group-hover:shadow-[0_0_40px_rgba(214,116,255,0.2)] transition-all duration-300">
              <Image
                src="/images/avatar.jpg"
                alt="Leon Lush"
                width={512}
                height={512}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
          </a>

          {/* Social buttons with follower counts */}
          <div className="flex justify-center gap-3 mt-5">
            {socials.map(({ key, name, href, Icon }) => {
              const countData = counts[key];
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label={`${name}${countData ? ` — ${countData.count} followers` : ""}`}
                >
                  <span className="text-slate-400 group-hover/social:text-white transition-colors">
                    <Icon />
                  </span>
                  {countData?.count && (
                    <span className="text-[10px] font-bold text-slate-500 group-hover/social:text-white tracking-wide transition-colors">
                      {countData.count}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-6 lg:space-y-8 lg:order-1">
          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Commentary.</span>
            <br />
            <span className="bg-gradient-to-r from-[#d674ff] to-[#81e9ff] bg-clip-text text-transparent">
              Chaos.
            </span>
            <br />
            <span className="text-white">Cold Truth.</span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            High-octane commentary, couples reactions, chaos, and comedy. No nonsense, just real takes and authentic moments in an effort to have fun and entertain while society circles the drain.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <a
              href="https://www.youtube.com/@LeonLush"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-shadow text-sm uppercase tracking-wide text-center"
            >
              Watch on YouTube
            </a>
            <a
              href="https://discord.gg/SRvdfnKqEn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-colors text-sm uppercase tracking-wide text-center"
            >
              Join the Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
