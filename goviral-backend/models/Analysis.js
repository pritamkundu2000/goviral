const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
    },

    caption: {
      type: String,
    },

    virality_score: {
      type: Number,
    },

    viral_label: {
      type: String,
    },

    hook_strength: {
      type: Number,
    },

    hook_analysis: {
      type: String,
    },

    pacing_rating: {
      type: Number,
    },

    thumbnail_rating: {
      type: Number,
    },

    caption_feedback: {
      type: String,
    },

    engagement_prediction: {
      type: String,
    },

    target_audience: {
      type: String,
    },

    best_platform: {
      type: String,
    },

    strongest_moment: {
      type: String,
    },

    weakest_moment: {
      type: String,
    },
    competitor_comparison: [
    {
        competitor_name: String,
        competitor_score: Number,
        why_it_works: String,
        gap_to_close: String,
        search_keyword: String,
        platform: String,
        competitor_link: String,
    },
    ],
    trending_audio_recommendations: [
    {
        audio_name: String,
        artist: String,
        platform: String,
        why_recommended: String,
        confidence: String,
        youtube_search_keyword: String,
        youtube_link: String,
    },
    ],

    trending_hashtags: [String],

    edit_suggestions: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);