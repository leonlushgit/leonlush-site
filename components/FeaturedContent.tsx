interface FeaturedContentProps {
  title: string;
  embedUrl: string;
}

export default function FeaturedContent({
  title,
  embedUrl,
}: FeaturedContentProps) {
  return (
    <div className="w-full mt-8">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 text-center">
        {title}
      </h2>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
