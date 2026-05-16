const axios = require("axios");

let spotifyAccessToken = null;

const getSpotifyAccessToken =
  async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",

        "grant_type=client_credentials",

        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",

            Authorization:
              "Basic " +
              Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
              ).toString("base64"),
          },
        }
      );

      spotifyAccessToken =
        response.data.access_token;

      return spotifyAccessToken;
    } catch (error) {
      console.error(
        "Spotify auth failed:",
        error.response?.data ||
          error.message
      );

      return null;
    }
  };

const searchSpotifyTrack =
  async (query) => {
    try {
      if (!spotifyAccessToken) {
        await getSpotifyAccessToken();
      }

      const response = await axios.get(
        "https://api.spotify.com/v1/search",
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },

          params: {
            q: query,
            type: "track",
            limit: 1,
          },
        }
      );

      const track =
        response.data?.tracks?.items?.[0];

      if (!track) {
        return null;
      }

      return {
        audio_name: track.name,

        artist:
          track.artists?.[0]?.name || "",

        preview_url:
          track.preview_url || "",

        spotify_url:
          track.external_urls?.spotify ||
          "",
      };
    } catch (error) {
      console.error(
        "Spotify search failed:",
        error.response?.data ||
          error.message
      );

      return null;
    }
  };

module.exports = {
  getSpotifyAccessToken,
  searchSpotifyTrack,
};