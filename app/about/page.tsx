import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Leon Lush",
  description: "The story behind the channel — commentary, chaos, and cold truth since 2006.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e]">
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-2">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-12">
          About Me
        </h1>

        {/* Bio */}
        <div className="space-y-6 text-slate-300 text-base lg:text-lg leading-relaxed">
          <p>
            I&apos;ve been making videos on the internet since before it was a career path.
            Started with music, pivoted to commentary, and somehow ended up watching bodycam
            footage for a living. 2 million subscribers later, I&apos;m still not sure how any
            of this works — but the Wi-Fi bill&apos;s paid and I get to say what I actually
            think for a living, which is more than most people can say.
          </p>

          <p>
            When I&apos;m not reacting to the most unhinged humans on the planet, I&apos;m a
            husband, a dad, a mediocre golfer, and a guy who&apos;s way too deep into
            nootropics and peptides for someone with no medical degree.
          </p>

          <p className="text-white font-medium">
            Based in Massachusetts. Online since 2006. Still here.
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center px-6">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} Leon Lush. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
