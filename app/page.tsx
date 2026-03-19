import ProfileHeader from "@/components/ProfileHeader";
import LinkButton from "@/components/LinkButton";
import SocialIcons, { socialIcons } from "@/components/SocialIcons";

// Right-side icon components for link buttons
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 opacity-80">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#d674ff]">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ShopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#81e9ff]">
    <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 14H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v10z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-400">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

// Links configuration
const links = [
  {
    href: "https://www.youtube.com/@LeonLush",
    label: "YouTube Channel",
    icon: <PlayIcon />,
    variant: "youtube" as const,
  },
  {
    href: "https://www.youtube.com/@TerriblePodcast",
    label: "Terrible Podcast",
    icon: <MicIcon />,
    variant: "default" as const,
  },
  {
    href: "https://www.patreon.com/leonlush",
    label: "Support on Patreon",
    icon: <HeartIcon />,
    variant: "featured" as const,
  },
  {
    href: "https://shop.leonlush.com",
    label: "Merch Store",
    icon: <ShopIcon />,
    variant: "default" as const,
  },
  {
    href: "mailto:business@leonlush.com",
    label: "Business Inquiries",
    icon: <MailIcon />,
    variant: "default" as const,
  },
];

// Social links configuration
const socialLinks = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@LeonLush",
    icon: <socialIcons.youtube />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/LeonLush",
    icon: <socialIcons.twitter />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@leonlush",
    icon: <socialIcons.tiktok />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/leonlush/",
    icon: <socialIcons.instagram />,
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full max-w-[390px] mx-auto flex-col bg-mesh overflow-x-hidden">
      {/* Profile Header */}
      <div className="pt-12">
        <ProfileHeader
          name="Leon Lush"
          tagline="YouTuber, Podcaster & Internet Commentator"
          avatarUrl="/images/avatar.jpg"
        />
      </div>

      {/* Link Buttons */}
      <div className="flex flex-col gap-3 px-6 pb-8">
        {links.map((link) => (
          <LinkButton
            key={link.href}
            href={link.href}
            icon={link.icon}
            variant={link.variant}
          >
            {link.label}
          </LinkButton>
        ))}
      </div>

      {/* Social Icons */}
      <SocialIcons links={socialLinks} />

      {/* Footer */}
      <footer className="mt-auto py-8 text-center px-6">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} Leon Lush. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
