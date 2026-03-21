import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-16">
        {/* Left side — text content */}
        <div className="flex-1 space-y-8">
          {/* Tagline badge */}
          <div className="inline-block">
            <span className="text-[#d674ff] text-xs font-bold uppercase tracking-[0.3em] bg-[#d674ff]/10 px-4 py-2 rounded-lg">
              Join the Lush Life
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Commentary.</span>
            <br />
            <span className="bg-gradient-to-r from-[#d674ff] to-[#81e9ff] bg-clip-text text-transparent">
              Chaos.
            </span>
            <br />
            <span className="text-white">Cold Truth.</span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            High-octane commentary, investigative deep dives, and general chaos.
            No fillers, just the cold truth delivered with a side of insanity.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.youtube.com/@LeonLush"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-shadow text-sm uppercase tracking-wide"
            >
              Watch on YouTube
            </a>
            <a
              href="https://discord.gg/SRvdfnKqEn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl border border-white/10 transition-colors text-sm uppercase tracking-wide"
            >
              Join the Discord
            </a>
          </div>
        </div>

        {/* Right side — avatar */}
        <div className="flex-shrink-0">
          <a
            href="https://www.youtube.com/@LeonLush"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block group cursor-pointer"
          >
            {/* Glow effect — intensifies on hover */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#d674ff]/20 to-[#81e9ff]/20 rounded-full blur-2xl group-hover:from-[#d674ff]/40 group-hover:to-[#81e9ff]/40 transition-all duration-500" />
            {/* Avatar circle — scales up on hover */}
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-[#1a1919] shadow-2xl group-hover:scale-105 group-hover:border-[#d674ff]/30 group-hover:shadow-[0_0_40px_rgba(214,116,255,0.2)] transition-all duration-300">
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
        </div>
      </div>
    </section>
  );
}
