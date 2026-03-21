#!/usr/bin/env node

// Scrapes follower counts from social media profiles using a real browser.
// Run manually or via cron: node scripts/update-social-counts.js
// Nigel can run this weekly to keep counts fresh.

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const OUTPUT_PATH = path.join(__dirname, "..", "public", "data", "social-counts.json");

// Format raw number into display string (e.g., 2070000 → "2.07M")
function formatCount(num) {
  if (num >= 1_000_000) {
    const m = num / 1_000_000;
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(m >= 10 ? 1 : 2)}M`;
  }
  if (num >= 1_000) {
    const k = num / 1_000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(k >= 100 ? 0 : 1)}K`;
  }
  return String(num);
}

// Parse strings like "2.07M", "245K", "1,234,567" into raw numbers
function parseCountText(text) {
  if (!text) return null;
  text = text.trim().replace(/,/g, "").replace(/\s+/g, "");

  // Handle "2.07M subscribers" style
  const mMatch = text.match(/([\d.]+)\s*M/i);
  if (mMatch) return Math.round(parseFloat(mMatch[1]) * 1_000_000);

  const kMatch = text.match(/([\d.]+)\s*K/i);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1_000);

  const numMatch = text.match(/([\d]+)/);
  if (numMatch) return parseInt(numMatch[1], 10);

  return null;
}

// Scrape YouTube subscriber count
async function scrapeYouTube(page) {
  console.log("  Scraping YouTube...");
  try {
    await page.goto("https://www.youtube.com/@LeonLush", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // YouTube puts subscriber count in a meta tag or in the page content
    const count = await page.evaluate(() => {
      // Try the subscriber count element
      const el = document.querySelector("#subscriber-count");
      if (el) return el.textContent;

      // Try meta description which often contains sub count
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        const match = meta.content.match(/([\d.]+[MK]?)\s*subscribers/i);
        if (match) return match[1];
      }

      // Try the channel header
      const spans = document.querySelectorAll("span");
      for (const span of spans) {
        if (span.textContent && span.textContent.includes("subscribers")) {
          return span.textContent;
        }
      }
      return null;
    });

    const raw = parseCountText(count);
    if (raw) {
      console.log(`  ✓ YouTube: ${formatCount(raw)} (${raw})`);
      return raw;
    }
    console.log(`  ✗ YouTube: could not parse "${count}"`);
  } catch (e) {
    console.log(`  ✗ YouTube error: ${e.message}`);
  }
  return null;
}

// Scrape Twitter/X follower count
async function scrapeTwitter(page) {
  console.log("  Scraping Twitter/X...");
  try {
    await page.goto("https://x.com/LeonLush", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for the page to render follower info
    await page.waitForSelector('a[href$="/verified_followers"]', { timeout: 10000 }).catch(() => {});

    const count = await page.evaluate(() => {
      // Look for the followers link which contains the count
      const followersLink =
        document.querySelector('a[href$="/verified_followers"]') ||
        document.querySelector('a[href$="/followers"]');
      if (followersLink) {
        const span = followersLink.querySelector("span span");
        if (span) return span.textContent;
        return followersLink.textContent;
      }
      return null;
    });

    const raw = parseCountText(count);
    if (raw) {
      console.log(`  ✓ Twitter: ${formatCount(raw)} (${raw})`);
      return raw;
    }
    console.log(`  ✗ Twitter: could not parse "${count}"`);
  } catch (e) {
    console.log(`  ✗ Twitter error: ${e.message}`);
  }
  return null;
}

// Scrape TikTok follower count
async function scrapeTikTok(page) {
  console.log("  Scraping TikTok...");
  try {
    // TikTok aggressively blocks bots — add extra evasion
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    await page.goto("https://www.tiktok.com/@leonlush", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait a bit for client-side rendering
    await new Promise((r) => setTimeout(r, 3000));

    const count = await page.evaluate(() => {
      // TikTok puts follower count in a strong tag with a specific data attribute
      const strong = document.querySelector('[data-e2e="followers-count"]');
      if (strong) return strong.textContent;

      // Try the JSON-LD or embedded data
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent);
          if (data.interactionStatistic) {
            for (const stat of data.interactionStatistic) {
              if (stat.name === "Follows" || stat.interactionType?.includes("Follow")) {
                return String(stat.userInteractionCount);
              }
            }
          }
        } catch {}
      }

      // Fallback: look for the followers text pattern in any element
      const allEls = document.querySelectorAll("strong, span, h2, h3");
      for (const el of allEls) {
        const next = el.nextSibling || el.nextElementSibling;
        if (next && next.textContent && next.textContent.trim().match(/^Follower/i)) {
          return el.textContent;
        }
      }
      return null;
    });

    const raw = parseCountText(count);
    if (raw) {
      console.log(`  ✓ TikTok: ${formatCount(raw)} (${raw})`);
      return raw;
    }
    console.log(`  ✗ TikTok: could not parse "${count}"`);
  } catch (e) {
    console.log(`  ✗ TikTok error: ${e.message}`);
  }
  return null;
}

// Scrape Instagram follower count
async function scrapeInstagram(page) {
  console.log("  Scraping Instagram...");
  try {
    await page.goto("https://www.instagram.com/leonlush/", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    const count = await page.evaluate(() => {
      // Instagram puts follower count in meta tags
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        const match = meta.content.match(/([\d,.]+[MK]?)\s*Followers/i);
        if (match) return match[1];
      }

      // Try the actual follower count element
      const links = document.querySelectorAll("a");
      for (const link of links) {
        if (link.href && link.href.includes("/followers")) {
          const span = link.querySelector("span span") || link.querySelector("span");
          if (span) return span.textContent;
        }
      }
      return null;
    });

    const raw = parseCountText(count);
    if (raw) {
      console.log(`  ✓ Instagram: ${formatCount(raw)} (${raw})`);
      return raw;
    }
    console.log(`  ✗ Instagram: could not parse "${count}"`);
  } catch (e) {
    console.log(`  ✗ Instagram error: ${e.message}`);
  }
  return null;
}

async function main() {
  console.log("🔄 Updating social follower counts...\n");

  // Load existing counts so we can keep old values if a scrape fails
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"));
  } catch {
    // No existing file, start fresh
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Use a real-looking user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  );

  // Scrape each platform — keep old value if scrape fails
  const youtube = await scrapeYouTube(page);
  const twitter = await scrapeTwitter(page);
  const tiktok = await scrapeTikTok(page);
  const instagram = await scrapeInstagram(page);

  await browser.close();

  // Build the output, preserving old values for failed scrapes
  const result = {
    youtube: {
      count: youtube ? formatCount(youtube) : (existing.youtube?.count || "—"),
      raw: youtube || (existing.youtube?.raw || 0),
    },
    twitter: {
      count: twitter ? formatCount(twitter) : (existing.twitter?.count || "—"),
      raw: twitter || (existing.twitter?.raw || 0),
    },
    tiktok: {
      count: tiktok ? formatCount(tiktok) : (existing.tiktok?.count || "—"),
      raw: tiktok || (existing.tiktok?.raw || 0),
    },
    instagram: {
      count: instagram ? formatCount(instagram) : (existing.instagram?.count || "—"),
      raw: instagram || (existing.instagram?.raw || 0),
    },
    lastUpdated: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + "\n");

  console.log("\n✅ Saved to public/data/social-counts.json");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
