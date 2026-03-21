const LEON_LUSH_CHANNEL_ID = "UCLHsZ4X7YemjxRrvq0AI4LA";
const LUSH_LIFE_CHANNEL_ID = "UCRLvu_hUyvVQ-ADaPlLlegg";

// Fetch latest video from a YouTube channel's RSS feed
async function getLatestVideo(channelId: string) {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    );
    const xml = await res.text();

    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = xml.match(/<entry>[\s\S]*?<title>([^<]+)<\/title>/);

    if (videoIdMatch) {
      return {
        videoId: videoIdMatch[1],
        title: titleMatch
          ? titleMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&")
          : "Latest Video",
      };
    }
  } catch (e) {
    // Fallback if fetch fails
  }
  return null;
}

export default async function FeaturedVideos() {
  const [leonVideo, lushLifeVideo] = await Promise.all([
    getLatestVideo(LEON_LUSH_CHANNEL_ID),
    getLatestVideo(LUSH_LIFE_CHANNEL_ID),
  ]);

  const channels = [
    {
      name: "Leon Lush",
      tag: "Commentary",
      video: leonVideo,
      channelUrl: "https://www.youtube.com/@LeonLush",
    },
    {
      name: "Lush Life TV",
      tag: "Couples Reactions",
      video: lushLifeVideo,
      channelUrl: "https://www.youtube.com/@lushlifetv",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-20">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Featured Content
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Latest uploads from both channels
        </p>
      </div>

      {/* Two-column video grid */}
      <div className="grid grid-cols-2 gap-8">
        {channels.map((channel) => (
          <div key={channel.name} className="space-y-4">
            {/* Channel label */}
            <div className="flex items-center justify-between">
              <span className="text-[#d674ff] text-xs font-bold uppercase tracking-[0.2em] bg-[#d674ff]/10 px-3 py-1 rounded-md">
                {channel.tag}
              </span>
              <a
                href={channel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 text-xs font-medium hover:text-white transition-colors"
              >
                {channel.name} →
              </a>
            </div>

            {/* Embedded video or fallback */}
            {channel.video ? (
              <>
                <div className="aspect-video rounded-xl overflow-hidden bg-[#1a1919]">
                  <iframe
                    src={`https://www.youtube.com/embed/${channel.video.videoId}`}
                    title={channel.video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-white font-bold text-base leading-snug">
                  {channel.video.title}
                </h3>
              </>
            ) : (
              <a
                href={channel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video rounded-xl overflow-hidden bg-[#1a1919] relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d674ff]/10 to-[#81e9ff]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
