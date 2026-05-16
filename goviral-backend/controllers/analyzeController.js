
const client = require("../services/aiService");
const Analysis = require("../models/Analysis");
// const {
//   searchSpotifyTrack,
// } = require("../services/spotifyService");

const analyzeContent = async (req, res) => {
  try {

    const { fileUrl, caption } = req.body;

//     const prompt = `
// You are a viral content strategist.

// Analyze this content.

// Caption:
// ${caption}

// Video URL:
// ${fileUrl}

// Return ONLY valid JSON in this format:

// {
//   "virality_score": number,
//   "hook_strength": number,
//   "hook_analysis": string,
//   "pacing_rating": number,
//   "thumbnail_rating": number,
//   "caption_feedback": string,
//   "trending_hashtags": [],
//   "edit_suggestions": []
// }
// `;

  const prompt = `
    You are an elite Facebook Reels, Instagram Reels, and YouTube Shorts growth strategist.

    Analyze this creator content for viral potential (0-100) with breakdown.

    Important constraints:
    - Do NOT suggest TikTok as a platform.
    - Do NOT generate TikTok competitor links.
    - Do NOT recommend TikTok audio or TikTok-only trends.
    - Prefer Instagram Reels, YouTube Shorts, Spotify, Facebook Reels and other supported platforms.
    - If a competitor style is inspired by short-form content, map it to non-TikTok platforms only.
    - competitor_comparison.platform must contain:
      "Instagram Reels"
      OR
      "YouTube Shorts"
      OR
      "Facebook"

    Content Caption:
    ${caption}

    Video/Image URL:
    ${fileUrl}

    Evaluate the following:

    1. Hook effectiveness
    2. Emotional engagement
    3. Viewer retention potential
    4. Curiosity gap strength
    5. Shareability
    6. Caption optimization
    7. Thumbnail effectiveness
    8. Replay potential

    Provide highly actionable creator-focused feedback.

    Return ONLY valid JSON in this exact format:

    {
      "virality_score": number,
      "viral_label": string,
      "hook_strength": number,
      "hook_analysis": string,
      "pacing_rating": number,
      "thumbnail_rating": number,
      "caption_feedback": string,
      "engagement_prediction": string,
      "target_audience": string,
      "best_platform": string,
      "trending_hashtags": [],
      "edit_suggestions": [],
      "strongest_moment": string,
      "weakest_moment": string,
      "competitor_comparison": [
        {
          "competitor_name": string,
          "competitor_score": number,
          "why_it_works": string,
          "gap_to_close": string,
          "search_keyword": string,
          "platform": string,
        }
      ],

      "trending_audio_recommendations": [
        {
          "audio_name": string,
          "artist": string,
          "platform": string,
          "why_recommended": string,
          "confidence": string,
          "youtube_search_keyword": string,
        }
      ]
    }
  `;

  const BLOCKED_PLATFORMS = ["tiktok"];

  const sanitizePlatform = (value = "") => {
    const v = String(value).toLowerCase().trim();
    if (BLOCKED_PLATFORMS.includes(v)) return "Instagram Reels";
    return value;
  };

  const completion =
    await client.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      // model: "liquid/lfm-2.5-1.2b-thinking:free",
      // model: "openrouter/owl-alpha",
      // model: "openai/gpt-oss-120b:free",
      // model: "inclusionai/ring-2.6-1t:free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      // temperature: 1,
      // top_p: 0.95,
      // max_tokens: 8192,
      // stream: true

      temperature: 0.7,
    });

    const text =
      completion.choices[0].message.content;

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // console.log(text);
    // const myObj = { message: cleanedText };

// Then you can stringify and parse it safely
// const jsonString = JSON.stringify(myObj);

//     const parsed = JSON.parse(jsonString);
    const parsed = JSON.parse(cleanedText);

    // const savedAnalysis = await Analysis.create({
    //   fileUrl,
    //   caption,
    //   ...parsed,
    // });

    if (
      Array.isArray(
        parsed?.trending_audio_recommendations
      )
    ) {
      parsed.trending_audio_recommendations =
        parsed.trending_audio_recommendations.map(
          (audio) => ({
            ...audio,

            youtube_link: `https://www.youtube.com/results?search_query=${encodeURIComponent(
              audio.youtube_search_keyword ||
                audio.audio_name
            )}`,
          })
        );
    }

    parsed.best_platform = sanitizePlatform(parsed.best_platform);

    const buildSearchLink = (platform, keyword) => {
      const q = encodeURIComponent(keyword || "");
      if (platform === "YouTube Shorts") {
        return `https://www.youtube.com/results?search_query=${q}`;
      }
      if (platform === "Instagram Reels") {
        return `https://www.instagram.com/explore/search/keyword/?q=${q}`;
      }
      if (platform === "Spotify") {
        return `https://open.spotify.com/search/${q}`;
      }
      return `https://www.google.com/search?q=${q}`;
    };

    if (Array.isArray(parsed.competitor_comparison)) {
      parsed.competitor_comparison = parsed.competitor_comparison.map((item) => ({
        ...item,
        // competitor_name: String(item?.competitor_name || "").replace(/tiktok/gi, "Instagram Reels"),
        // search_keyword: String(item?.search_keyword || "").replace(/tiktok/gi, "instagram reels"),
        platform: sanitizePlatform(item?.platform),
        competitor_link: buildSearchLink(
          sanitizePlatform(item?.platform),
          item?.search_keyword || item?.competitor_name
        ),
      }));
    }

    if (Array.isArray(parsed.trending_audio_recommendations)) {
      parsed.trending_audio_recommendations = parsed.trending_audio_recommendations.map((audio) => ({
        ...audio,
        platform: sanitizePlatform(audio?.platform),
      }));
    }

    const savedAnalysis = await Analysis.create({
      fileUrl,

      caption,

      virality_score:
        Number(parsed?.virality_score) || 0,

      viral_label:
        parsed?.viral_label || "",

      hook_strength:
        Number(parsed?.hook_strength) || 0,

      hook_analysis:
        parsed?.hook_analysis || "",

      pacing_rating:
        Number(parsed?.pacing_rating) || 0,

      thumbnail_rating:
        Number(parsed?.thumbnail_rating) || 0,

      caption_feedback:
        parsed?.caption_feedback || "",

      engagement_prediction:
        parsed?.engagement_prediction || "",

      target_audience:
        parsed?.target_audience || "",

      best_platform:
        parsed?.best_platform || "",

      strongest_moment:
        parsed?.strongest_moment || "",

      weakest_moment:
        parsed?.weakest_moment || "",

      trending_hashtags: Array.isArray(
        parsed?.trending_hashtags
      )
        ? parsed.trending_hashtags
        : [],

      edit_suggestions: Array.isArray(
        parsed?.edit_suggestions
      )
        ? parsed.edit_suggestions
        : [],

      competitor_comparison: Array.isArray(
        parsed?.competitor_comparison
      )
        ? parsed.competitor_comparison
        : [],

      trending_audio_recommendations:
        Array.isArray(
          parsed?.trending_audio_recommendations
        )
          ? parsed.trending_audio_recommendations
          : [],
      
    });

    // res.status(200).json(parsed);
    res.status(200).json(savedAnalysis);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI analysis failed",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeContent,
};