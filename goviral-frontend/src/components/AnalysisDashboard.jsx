import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PauseIcon from "@mui/icons-material/Pause";
import ScoreCard from "./ScoreCard";
import { useRef, useState } from "react";

function MetricCard({ title, value, height }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        height: height,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>
          {value ?? "-"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function AnalysisDashboard({ analysis }) {
  // const audioRefs = useRef({});
  // const [playingIndex, setPlayingIndex] = useState(null);
  if (!analysis) return null;
  console.log('pppp',{analysis});

  // const {
  //   virality_score = 0,
  //   hook_strength = 0,
  //   hook_analysis = "",
  //   pacing_rating = 0,
  //   thumbnail_rating = 0,
  //   caption_feedback = "",
  //   trending_hashtags = [],
  //   edit_suggestions = [],
  // } = analysis;

  const {
    virality_score = 0,
    viral_label = "",
    hook_strength = 0,
    hook_analysis = "",
    pacing_rating = 0,
    thumbnail_rating = 0,
    caption_feedback = "",
    engagement_prediction = "",
    target_audience = "",
    best_platform = "",
    strongest_moment = "",
    weakest_moment = "",
    trending_hashtags = [],
    edit_suggestions = [],
    competitor_comparison = [],
    trending_audio_recommendations = [],
  } = analysis;

  // const toggleAudio = async (index, url) => {
  //   const currentAudio = audioRefs.current[index];
  //   if (!currentAudio || !url) return;

  //   // If this same audio is already playing, pause it
  //   if (playingIndex === index) {
  //     currentAudio.pause();
  //     setPlayingIndex(null);
  //     return;
  //   }

  //   // Pause any other audio
  //   Object.entries(audioRefs.current).forEach(([key, audioEl]) => {
  //     if (audioEl && Number(key) !== index) {
  //       audioEl.pause();
  //       audioEl.currentTime = 0;
  //     }
  //   });

  //   try {
  //     currentAudio.currentTime = 0;
  //     await currentAudio.play();
  //     setPlayingIndex(index);
  //   } catch (error) {
  //     console.error("Audio play failed:", error);
  //   }
  // };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
        Viral Analysis
      </Typography>

      <Alert
        severity="success"
        sx={{
          mb: 3,
          borderRadius: 3,
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        AI predicts this content has
        <strong>
          {" "}
          {viral_label || "Strong Viral Potential"}
        </strong>
        {" "}with strongest performance on
        <strong>
          {" "}
          {best_platform || "Instagram Reels"}
        </strong>.
      </Alert>

      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={5}>
          <ScoreCard score={virality_score} />
        </Grid> */}
        <Grid item xs={12} md={4}>
          <ScoreCard score={virality_score} />
        </Grid>
        <Grid 
          item 
          spacing={3}
          xs={12} 
          md={8} 
          sx={{ 
            display: 'flex', 
            gap: 2,
            alignItems: 'center' // This forces the internal grid to the middle
          }}
        >
          <Grid item xs={6} sm={3} md={2}>
            <MetricCard title="Hook Strength" value={hook_strength} height="100px" />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <MetricCard title="Pacing Rating" value={pacing_rating} height="100px"/>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <MetricCard title="Thumbnail Rating" value={thumbnail_rating} height="100px"/>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <MetricCard title="Best Platform" value={best_platform} height="100px"/>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={4}>
              <MetricCard title="Hook Strength" value={hook_strength} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MetricCard title="Pacing Rating" value={pacing_rating} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MetricCard title="Thumbnail Rating" value={thumbnail_rating} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Best Platform"
                value={best_platform}
              />
            </Grid> */}

            <Grid item xs={12} md={4}>
              <MetricCard
                title="Target Audience"
                value={target_audience}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <MetricCard
                title="Engagement Prediction"
                value={engagement_prediction}
              />
            </Grid>
          </Grid>

          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              mt: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Hook Analysis
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                {hook_analysis || "No hook analysis returned."}
              </Typography>

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }} />

              <Typography variant="h6" fontWeight={800}>
                Caption Optimization
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary" }}>
                {caption_feedback || "No caption feedback returned."}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              mt: 3,
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                fontWeight={800}
              >
                Strongest Moment
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "text.secondary",
                }}
              >
                {strongest_moment || "No data"}
              </Typography>

              <Divider
                sx={{
                  my: 2,
                  borderColor:
                    "rgba(255,255,255,0.08)",
                }}
              />

              <Typography
                variant="h6"
                fontWeight={800}
              >
                Weakest Moment
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "text.secondary",
                }}
              >
                {weakest_moment || "No data"}
              </Typography>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
                Trending Hashtags
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {trending_hashtags.length > 0 ? (
                  trending_hashtags.map((tag, idx) => (
                    <Chip key={`${tag}-${idx}`} label={tag} color="primary" />
                  ))
                ) : (
                  <Typography color="text.secondary">No hashtags returned.</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
                Edit Suggestions
              </Typography>

              {edit_suggestions.length > 0 ? (
                <List dense>
                  {edit_suggestions.map((item, idx) => (
                    <ListItem key={`${item}-${idx}`} disableGutters>
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <LightbulbOutlinedIcon color="warning" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">No suggestions returned.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {competitor_comparison.length > 0 && (
          <Card
            sx={{
              mt: 1,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                }}
              >
                <CompareArrowsIcon />

                <Typography
                  variant="h5"
                  fontWeight={800}
                >
                  Competitor Comparison
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {competitor_comparison.map(
                  (item, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      key={index}
                    >
                      <Card
                        sx={{
                          borderRadius: 3,
                          bgcolor:
                            "rgba(255,255,255,0.03)",
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            fontWeight={800}
                          >
                            {item?.competitor_name}
                          </Typography>

                          <Chip
                            label={`Score: ${item?.competitor_score}`}
                            color="primary"
                            sx={{ mt: 1 }}
                          />

                          <Typography
                            sx={{
                              mt: 2,
                              color:
                                "text.secondary",
                            }}
                          >
                            <strong>
                              Why it works:
                            </strong>{" "}
                            {item?.why_it_works}
                          </Typography>

                          <Typography
                            sx={{
                              mt: 2,
                              color:
                                "text.secondary",
                            }}
                          >
                            <strong>
                              Gap to close:
                            </strong>{" "}
                            {item?.gap_to_close}
                          </Typography>
                          <Button
                            style={{marginTop: '10px'}}
                            variant="contained"
                            href={item.competitor_link}
                            target="_blank"
                          >
                            View Similar Content
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        )}

        {trending_audio_recommendations.length > 0 && (
          <Card
            sx={{
              mt: 1,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                }}
              >
                <TrendingUpIcon />
                <Typography variant="h5" fontWeight={800}>
                  Trending Audio
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {trending_audio_recommendations.map((audio, index) => {
                  // const isPlaying = playingIndex === index;
                  // const hasPreview = Boolean(audio?.preview_url);

                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" fontWeight={800}>
                            {audio?.audio_name || "Recommended Audio"}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {audio?.artist || "Unknown Artist"}
                          </Typography>

                          <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
                            <Chip label={audio?.platform || "Platform"} color="primary" />
                            <Chip label={audio?.confidence || "low"} color="success" />
                          </Stack>

                          <Typography sx={{ mt: 2, color: "text.secondary" }}>
                            {audio?.why_recommended || "No recommendation text available."}
                          </Typography>

                          {/* {hasPreview ? (
                            <>
                              <Button
                                variant="contained"
                                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                onClick={() => toggleAudio(index, audio.preview_url)}
                                sx={{ mt: 3 }}
                              >
                                {isPlaying ? "Pause Preview" : "Play Preview"}
                              </Button>

                              <audio
                                ref={(el) => {
                                  audioRefs.current[index] = el;
                                }}
                                src={audio.preview_url}
                                preload="none"
                                onEnded={() => setPlayingIndex(null)}
                                onPause={() => {
                                  if (playingIndex === index) setPlayingIndex(null);
                                }}
                              />
                            </>
                          ) : (
                            <Button variant="outlined" startIcon={<PlayArrowIcon />} sx={{ mt: 3 }} disabled>
                              Preview Coming Soon
                            </Button>
                          )} */}
                          <Button
                            variant="contained"
                            href={audio.youtube_link}
                            target="_blank"
                            startIcon={<PlayArrowIcon />}
                            sx={{ mt: 3 }}
                          >
                            Listen on YouTube
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        )}

        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                What the AI thinks you should improve
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Shorten weak intro sections and show the payoff earlier." />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 34 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Use clearer on-screen text and stronger caption framing." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}