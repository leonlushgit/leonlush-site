const CHANNEL_ID = "UCRLvu_hUyvVQ-ADaPlLlegg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Fetch latest video from YouTube RSS feed
async function getLatestVideo() {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } }); // re-check every hour
    const xml = await res.text();

    // Parse the first <entry> from the feed
    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = xml.match(/<entry>[\s\S]*?<title>([^<]+)<\/title>/);

    if (videoIdMatch) {
      return {
        videoId: videoIdMatch[1],
        title: titleMatch ? titleMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : "Latest Video",
      };
    }
  } catch (e) {
    // Fallback if fetch fails
  }

  return null;
}

export default async function LushLifeTV() {
  const latestVideo = await getLatestVideo();

  return (
    <section className="max-w-6xl mx-auto px-8 py-20 border-t border-white/5">
      <div className="flex items-center gap-16">
        {/* Left — embedded latest video or fallback */}
        <div className="flex-shrink-0 w-[480px]">
          {latestVideo ? (
            <div className="space-y-3">
              <div className="aspect-video rounded-xl overflow-hidden bg-[#1a1919]">
                <iframe
                  src={`https://www.youtube.com/embed/${latestVideo.videoId}`}
                  title={latestVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-slate-500 text-xs font-medium truncate">
                Latest: {latestVideo.title}
              </p>
            </div>
          ) : (
            <div className="aspect-video rounded-xl overflow-hidden bg-[#1a1919] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d674ff]/15 to-[#81e9ff]/15" />
              <a
                href="https://www.youtube.com/@lushlifetv"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Right — text content */}
        <div className="flex-1 space-y-5">
          <div className="inline-block">
            <span className="text-[#81e9ff] text-xs font-bold uppercase tracking-[0.3em] bg-[#81e9ff]/10 px-4 py-2 rounded-lg">
              Separate Channel
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white tracking-tight">
            Lush Life TV
          </h2>

          <p className="text-slate-400 text-base leading-relaxed max-w-lg">
            Couples reaction content with my wife. We watch, react, and break down
            trending videos, shows, and whatever the internet throws at us — together.
          </p>

          <a
            href="https://www.youtube.com/@lushlifetv?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold px-6 py-3 rounded-xl border border-white/10 transition-colors text-sm uppercase tracking-wide"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe to Lush Life
          </a>
        </div>
      </div>
    </section>
  );
}
