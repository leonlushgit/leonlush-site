import Image from "next/image";

interface ProfileHeaderProps {
  name: string;
  tagline: string;
  avatarUrl?: string;
}

export default function ProfileHeader({
  name,
  tagline,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-2 pb-8">
      {/* Avatar with purple/cyan glow */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#d674ff] to-[#81e9ff] rounded-full opacity-30 blur-sm" />
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0F0F0F] shadow-2xl">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#d674ff] to-[#9900cf] flex items-center justify-center text-4xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Name & Tagline */}
      <div className="flex flex-col items-center mt-6 text-center">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-1">
          {name}
        </h1>
        <p className="text-slate-400 text-sm font-medium px-4 leading-relaxed">
          {tagline}
        </p>
      </div>
    </div>
  );
}
